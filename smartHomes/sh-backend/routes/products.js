// routes/products.js
const express = require('express');
const { authMiddleware, storeManagerOnly } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const router = express.Router();

// Add a new product (Only StoreManagers can do this)
router.post('/', authMiddleware, storeManagerOnly, async (req, res) => {
  const { name, description, price, category, image_path } = req.body;

  try {
    const newProduct = await Product.create({ name, description, price, category, image_path });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update an existing product (Only StoreManagers can do this)
router.put('/:id', authMiddleware, storeManagerOnly, async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, image_path, retailer_discount, manufacturer_rebate } = req.body;

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

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a product (Only StoreManagers can do this)
router.delete('/:id', authMiddleware, storeManagerOnly, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.destroy();
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

module.exports = router;
