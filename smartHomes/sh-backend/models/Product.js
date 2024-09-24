const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Product model
const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    get() {
      // Convert price from string to number
      const price = this.getDataValue('price');
      return parseFloat(price);
    },
  },
  category: {
    type: DataTypes.STRING,
  },
  retailer_discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    get() {
      const retailer_discount = this.getDataValue('retailer_discount');
      return parseFloat(retailer_discount);
    },
  },
  manufacturer_rebate: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    get() {
      const manufacturer_rebate = this.getDataValue('manufacturer_rebate');
      return parseFloat(manufacturer_rebate);
    },
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'products', // Match the MySQL table name
  timestamps: false, // Disable createdAt and updatedAt columns
});

module.exports = Product;
