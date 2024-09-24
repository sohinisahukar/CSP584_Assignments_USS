const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have your database configuration in a config file

const Accessory = sequelize.define('Accessory', {
  accessory_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Description is optional
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
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'accessories',
  timestamps: false, // Add timestamps if your table has createdAt and updatedAt fields
});

module.exports = Accessory;
