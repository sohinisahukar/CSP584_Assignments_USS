const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { v4: uuidv4 } = require('uuid');
const { authMiddleware } = require('../middleware/authMiddleware');

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
  check('customerName', 'Customer Name is required').not().isEmpty(),
  check('customerAddress', 'Customer Address is required').not().isEmpty(),
  check('creditCard', 'Valid Credit Card is required').isCreditCard(),
  check('cartItems', 'Cart items cannot be empty').isArray({ min: 1 }),
  check('deliveryOption', 'Delivery option is required').not().isEmpty(),
  body('storeId').if(body('deliveryOption').equals('pickup')).notEmpty().withMessage('Store ID is required for pickup').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { userId, customerName, customerAddress, creditCard, deliveryOption, storeId, cartItems, totalSales } = req.body;
  
  const orderId = uuidv4(); // Generate unique order ID
  const purchaseDate = new Date();
  const shipDate = new Date(purchaseDate);
  shipDate.setDate(shipDate.getDate() + 14); // 2 weeks after purchase

  try {
    // Create order record
    const newOrder = await Order.create({
      orderId,
      userId,
      customerName,
      customerAddress,
      creditCard,
      purchaseDate,
      shipDate,
      totalSales: 0,
      storeId: deliveryOption === 'pickup' ? storeId : null,
    });

    // Add items to the order_items table
    for (let item of cartItems) {
      await OrderItem.create({
        orderId: newOrder.orderId,
        productId: item.product_id,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        discount: item.retailer_discount || 0
      });
    }

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
router.delete('/orders/:orderId/cancel', authMiddleware, async (req, res) => {
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

    // Delete the order
    await Order.destroy({
      where: { orderId }
    });

    // Delete associated order items
    await OrderItem.destroy({
      where: { orderId }
    });

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ error: 'Error canceling order' });
  }
});

module.exports = router;
