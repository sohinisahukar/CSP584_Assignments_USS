const express = require('express');
const sequelize = require('./config/database');
const Product = require('./models/Product');
const Accessory = require('./models/Accessory');
const Store = require('./models/Store');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
// const Order = require('./models/Order');
// const OrderItem = require('./models/OrderItem');
// const User = require('./models/User');
const { Order, OrderItem, User } = require('./models/associations');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Use auth routes for login and signup
app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);


// Connect to the MySQL database and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
    return sequelize.sync(); // Sync models with the database
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Unable to connect to MySQL:', error);
  });

// Create a route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll(); // Fetch all products from MySQL
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

// // Syncing models and database
// sequelize.sync({ alter: true }) // Sync models with DB
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch(err => console.error('Error syncing database:', err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Sync and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced and tables created/updated!');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('Error syncing database:', err));
