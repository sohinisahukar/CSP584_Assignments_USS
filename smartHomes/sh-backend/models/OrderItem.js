const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
// const Order = require('./Order'); // Import related models
// const Product = require('./Product'); // Import related models

class OrderItem extends Model {}

OrderItem.init({
    orderItemId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'orderId'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'product_id'
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'order_items',
    timestamps: false
});

module.exports = OrderItem;
