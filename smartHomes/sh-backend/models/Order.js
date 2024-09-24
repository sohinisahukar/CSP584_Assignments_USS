const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // assuming your Sequelize connection is setup in config/database.js
// const OrderItem = require('./OrderItem'); // Import related models
// const User = require('./User'); // Import related models

// const Order = sequelize.define('Order', {
class Order extends Model {}

Order.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id',
        },
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditCard: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    shipDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        get() {
            // Convert price from string to number
            const totalSales = this.getDataValue('totalSales');
            return parseFloat(totalSales);
          },
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable for home delivery
        references: {
            model: 'stores',
            key: 'storeId',
        },
    }
}, {
    sequelize,
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
