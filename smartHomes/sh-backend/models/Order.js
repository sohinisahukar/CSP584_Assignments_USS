const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

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
    },
    shippingCost: { // Add this line
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.99,
        get() {
            // Convert price from string to number
            const shippingCost = this.getDataValue('shippingCost');
            return parseFloat(shippingCost);
        },
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customer_addresses',
            key: 'addressId'
        },
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
