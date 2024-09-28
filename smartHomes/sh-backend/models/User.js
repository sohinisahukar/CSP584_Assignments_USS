const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}
User.init({

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
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps: false, // Add timestamps if your table has createdAt and updatedAt fields
});

module.exports = User;
