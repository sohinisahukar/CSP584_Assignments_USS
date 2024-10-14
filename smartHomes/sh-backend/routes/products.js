// routes/products.js
const express = require('express');
const { authMiddleware, storeManagerOnly } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const router = express.Router();


module.exports = (productHashMap) => {

// Add a new product (Only StoreManagers can do this)
router.post('/', authMiddleware, storeManagerOnly, async (req, res) => {
  const { name, description, price, category, image_path, retailer_discount, manufacturer_rebate, manufacturer_name, stock } = req.body;
  
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      image_path,
      retailer_discount,
      manufacturer_rebate,
      manufacturer_name,
      stock,
  });

  // Add the new product to the hashmap
  productHashMap.set(newProduct.product_id, {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      retailer_discount: newProduct.retailer_discount,
      manufacturer_rebate: newProduct.manufacturer_rebate,
      image_path: newProduct.image_path,
      manufacturer_name: newProduct.manufacturer_name,
      stock: newProduct.stock,
  });

  // Log the updated HashMap
  console.log('Updated productHashMap after adding a new product:', Array.from(productHashMap.entries()));

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update an existing product (Only StoreManagers can do this)
router.put('/:id', authMiddleware, storeManagerOnly, async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, image_path, retailer_discount, manufacturer_rebate, manufacturer_name, stock } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image_path = image_path || product.image_path;
    product.retailer_discount = retailer_discount || product.retailer_discount;
    product.manufacturer_rebate = manufacturer_rebate || product.manufacturer_rebate;
    product.manufacturer_name = manufacturer_name || product.manufacturer_name;
    product.stock = stock || product.stock;

    await product.save();

    // Update the hashmap with the new details
    productHashMap.set(product.product_id, {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      retailer_discount: product.retailer_discount,
      manufacturer_rebate: product.manufacturer_rebate,
      image_path: product.image_path,
      manufacturer_name: product.manufacturer_name,
      stock: product.stock,
  });

  // Log the updated HashMap
  console.log('Updated productHashMap after updating the product:', Array.from(productHashMap.entries()));

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a product (Only StoreManagers can do this)
router.delete('/:id', authMiddleware, storeManagerOnly, async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.destroy();

    // Remove the product from the HashMap
    if (productHashMap.has(productId)) {
      productHashMap.delete(productId);
      console.log(`Product with ID ${productId} removed from productHashMap.`);
    } else {
      console.log(`Product with ID ${productId} was not found in productHashMap.`);
    }

    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch all products with relevant details for the inventory (Only accessible to StoreManagers)
router.get('/inventory', authMiddleware, storeManagerOnly, async (req, res) => {
  try {
      const products = await Product.findAll({
          attributes: ['name', 'price', 'stock', 'retailer_discount', 'manufacturer_rebate']
      });
      res.json(products);
  } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Fetch products currently on sale (Only accessible to StoreManagers)
router.get('/onSale', authMiddleware, storeManagerOnly, async (req, res) => {
  try {
      const productsOnSale = await Product.findAll({
          where: { retailer_discount: { [Op.gt]: 0 } },
          attributes: ['name', 'price', 'stock', 'retailer_discount']
      });
      res.json(productsOnSale);
  } catch (error) {
      console.error('Error fetching products on sale:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Fetch products with manufacturer rebates (Only accessible to StoreManagers)
router.get('/manufacturerRebates', authMiddleware, storeManagerOnly, async (req, res) => {
  try {
      const productsWithRebates = await Product.findAll({
          where: { manufacturer_rebate: { [Op.gt]: 0 } },
          attributes: ['name', 'price', 'stock', 'manufacturer_rebate']
      });
      res.json(productsWithRebates);
  } catch (error) {
      console.error('Error fetching products with manufacturer rebates:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all products sold and their sales details
router.get('/salesReport/products', authMiddleware, storeManagerOnly, async (req, res) => {
  try {
    const salesReport = await sequelize.query(`
      SELECT p.name AS productName, p.price AS productPrice, 
             SUM(oi.quantity) AS itemsSold, 
             SUM(oi.quantity * p.price) AS totalSales
      FROM order_items oi
      JOIN products p ON oi.productId = p.product_id
      GROUP BY p.product_id, p.name, p.price
      ORDER BY totalSales DESC;
    `, { type: sequelize.QueryTypes.SELECT });

    res.json(salesReport);
  } catch (error) {
    console.error('Error fetching sales report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get daily sales report
router.get('/salesReport/daily', authMiddleware, storeManagerOnly, async (req, res) => {
  try {
    const dailySales = await sequelize.query(`
      SELECT DATE(o.purchaseDate) AS saleDate, 
             SUM(oi.quantity * p.price) AS totalSales
      FROM orders o
      JOIN order_items oi ON o.orderId = oi.orderId
      JOIN products p ON oi.productId = p.product_id
      GROUP BY saleDate
      ORDER BY saleDate DESC;
    `, { type: sequelize.QueryTypes.SELECT });

    res.json(dailySales);
  } catch (error) {
    console.error('Error fetching daily sales report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.q;

  // If no query is provided, return an empty array
  if (!query) {
    return res.json([]);
  }

  // Convert query to lowercase for case-insensitive search
  const searchQuery = query.toLowerCase();

  // Filter products that match the query using the hashmap
  const matchingProducts = Array.from(productHashMap.values()).filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  // Return the filtered products (limit to top 10 matches for performance)
  res.json(matchingProducts.slice(0, 10));
});


return router;
};