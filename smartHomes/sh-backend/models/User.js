const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Customer', 'StoreManager', 'Salesman'),
        defaultValue: 'Customer'  // Default role is Customer
    }
}, {
    tableName: 'user',
    timestamps: false, // Add timestamps if your table has createdAt and updatedAt fields
});

// Associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

module.exports = User;
