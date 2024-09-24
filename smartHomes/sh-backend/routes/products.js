// routes/products.js
const express = require('express');
const { authMiddleware, storeManagerOnly } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

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

module.exports = router;
