const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const CustomerAddress = require('../models/CustomerAddress');
const User = require('../models/User');
const Store = require('../models/Store');
const { v4: uuidv4 } = require('uuid');
const { authMiddleware } = require('../middleware/authMiddleware');
const sequelize = require('../config/database');

// Utility function to calculate business days difference
const isWithinFiveBusinessDays = (shipDate) => {
  const today = new Date();
  const businessDays = 5;
  let dayCount = 0;

  while (dayCount < businessDays) {
    today.setDate(today.getDate() + 1);
    if (today.getDay() !== 0 && today.getDay() !== 6) { // Skip weekends (0: Sunday, 6: Saturday)
      dayCount++;
    }
  }
  return today <= new Date(shipDate);
};

// POST: Place an order
router.post('/checkout', [
  check('addressId', 'Address is required').not().isEmpty(),
  check('creditCard', 'Valid Credit Card is required').isCreditCard(),
  check('cartItems', 'Cart items cannot be empty').isArray({ min: 1 }),
  check('deliveryOption', 'Delivery option is required').not().isEmpty(),
  body('storeId').if(body('deliveryOption').equals('pickup')).notEmpty().withMessage('Store ID is required for pickup').isInt(),
  check('totalSales', 'Total sales cannot be empty.').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { userId, addressId, creditCard, deliveryOption, storeId, cartItems, totalSales, shippingCost } = req.body;
  
  const orderId = uuidv4(); // Generate unique order ID
  const purchaseDate = new Date();
  const shipDate = new Date(purchaseDate);
  shipDate.setDate(shipDate.getDate() + 14); // 2 weeks after purchase

  try {
    // Verify if the address exists
    const customerAddress = await CustomerAddress.findOne({ where: { addressId, userId } });
    if (!customerAddress) {
      return res.status(400).json({ error: 'Address not found for this user' });
    }

    // Start a transaction to ensure all updates are atomic
    const transaction = await sequelize.transaction();

    // Create order record
    const newOrder = await Order.create({
      orderId,
      userId,
      addressId,
      creditCard,
      purchaseDate,
      shipDate,
      totalSales,
      shippingCost,
      storeId: deliveryOption === 'pickup' ? storeId : null,
    }, { transaction });

    // Add items to the order_items table
    for (let item of cartItems) {

      // Find the product to update stock
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }

      // Check if there is enough stock available
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Deduct the quantity from the product's stock
      product.stock -= item.quantity;
      await product.save({ transaction });

      await OrderItem.create({
        orderId: newOrder.orderId,
        productId: item.product_id,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        discount: item.retailer_discount || 0
      }, { transaction });
    }

    // Commit the transaction
    await transaction.commit();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId,
      shipDate: shipDate.toLocaleDateString()
    });
  } catch (error) {
    console.error('Error placing order:', error); // Improved logging
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get all orders for the logged-in user
router.get('/userOrders', authMiddleware, async (req, res) => {
  const userId = req.user.id; // Assuming req.user is populated by the authentication middleware

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: 'items', // Specify the alias you used in the association
          include: [
            {
              model: Product,
              as: 'product', // Alias for the product association
              attributes: ['name', 'retailer_discount', 'manufacturer_rebate'], // Fetch only the name of the product
            }
          ]
        },
        {
          model: CustomerAddress,
          as: 'shippingAddress', // Alias for the address association
          attributes: ['name', 'street', 'city', 'state', 'zipCode'] // Fetch only the necessary address fields
        },
        {
          model: User,
          as: 'user',
        },
        {
          model: Store, // Include store details if it's a store pickup
          as: 'store',
          attributes: ['street', 'city', 'state', 'zipCode']
        }
      ]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Cancel an order (only if more than 5 business days before shipDate)
router.delete('/cancel/:orderId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({
      where: { orderId, userId }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or does not belong to this user' });
    }

    const canCancel = isWithinFiveBusinessDays(order.shipDate);

    if (!canCancel) {
      return res.status(400).json({ message: 'Cannot cancel the order within 5 business days of the ship date' });
    }

    // Delete associated order items first before deleting the order
    await OrderItem.destroy({
      where: { orderId }
    });

    // Delete the order
    await Order.destroy({
      where: { orderId }
    });

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ error: 'Error canceling order' });
  }
});

// Check if user has purchased the product
router.get('/hasPurchased/:userId/:productId', authMiddleware, async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if there's an order for the user that includes this product
    const orderItem = await OrderItem.findOne({
      where: {
        productId: productId
      },
      include: [
        {
          model: Order,
          as: 'order',
          where: { userId }
        }
      ]
    });

    if (orderItem) {
      return res.status(200).json({ purchased: true });
    } else {
      return res.status(200).json({ purchased: false });
    }
  } catch (error) {
    console.error('Error checking purchase status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
