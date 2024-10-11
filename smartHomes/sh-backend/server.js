const express = require('express');
const sequelize = require('./config/database');
const mongoose = require('mongoose');

const Product = require('./models/Product');
const Accessory = require('./models/Accessory');
const Store = require('./models/Store');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const addressRoutes = require('./routes/addresses');

const reviewRoutes = require('./routes/review');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Initialize the database models and associations
require('./models/associations');

// Initialize the hashmap
const productsMap = new Map();

const loadProductsIntoMap = async () => {
  try {
    const products = await Product.findAll();
    products.forEach((product) => {
      productsMap.set(product.product_id, {
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
    });
    console.log('Products loaded into hashmap.');
  } catch (error) {
    console.error('Error loading products into hashmap:', error);
  }
};

// Call this function when the server starts
loadProductsIntoMap();

// Middleware to inject the productsMap into req object
app.use((req, res, next) => {
  req.productsMap = productsMap;
  next();
});

// Use auth routes for login and signup
app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes(productsMap));

app.use('/api/orders', orderRoutes);

app.use('/api/addresses', addressRoutes);

app.use('/api/reviews', reviewRoutes);

// Export the productsMap so it can be used in other files if necessary
module.exports = { productsMap };

// Function to initialize MySQL and MongoDB connections
const initializeDatabases = async () => {
  try {
    // Connect to MySQL and sync models
    await sequelize.authenticate();
    console.log('Connected to MySQL');
    await sequelize.sync();
    console.log('MySQL Database synchronized');

    // Connect to MongoDB
    const mongoURI = 'mongodb+srv://ssahukar:ssahukar@cluster0.4oegw.mongodb.net/smarthomes?retryWrites=true&w=majority'; // Add your database name
    await mongoose.connect(mongoURI)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log('Error connecting to MongoDB:', err));
  } catch (error) {
    console.error('Error connecting to databases:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Start server after databases are initialized
initializeDatabases().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Create a route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = Array.from(productsMap.values());
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a route to get products by category
app.get('/products/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    // Fetch products with the specified category from MySQL
    const products = await Product.findAll({
      where: { category }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a route to get a product by its ID
app.get('/products/productId/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Fetch product by primary key (id) from MySQL
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch all accessories
app.get('/accessories', async (req, res) => {
  try {
    const accessories = await Accessory.findAll();
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch accessories based on category
app.get('/accessories/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const accessories = await Accessory.findAll({ where: { category } });
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a route to get all stores
app.get('/stores', async (req, res) => {
  try {
    const stores = await Store.findAll(); // Fetch all stores from MySQL
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


app.get('/topProducts/zipcode', async (req, res) => {
  try {
    const topProducts = await sequelize.query(`
      SELECT a.zipCode, COUNT(oi.productId) AS total_products_sold
      FROM orders o
      JOIN customer_addresses a ON o.addressId = a.addressId
      JOIN order_items oi ON o.orderId = oi.orderId
      GROUP BY a.zipCode
      ORDER BY total_products_sold DESC
      LIMIT 5;
    `, { type: sequelize.QueryTypes.SELECT });

    res.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/topProducts/mostSold', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT p.name, SUM(oi.quantity) AS total_sold
      FROM order_items oi
      JOIN products p ON oi.productId = p.product_id
      GROUP BY p.name
      ORDER BY total_sold DESC
      LIMIT 5;
    `);
    res.json(results);
  } catch (error) {
    console.error('Error fetching top sold products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
