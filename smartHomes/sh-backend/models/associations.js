const Order = require('./Order');
const OrderItem = require('./OrderItem');
const User = require('./User');
const Product = require('./Product'); // If you have a Product model

// Define associations
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Order, { foreignKey: 'userId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Export models with associations
module.exports = { Order, OrderItem, User, Product };
