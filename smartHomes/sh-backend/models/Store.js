const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
    storeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    storeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipCode: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'stores',
    timestamps: false
});

module.exports = Store;
