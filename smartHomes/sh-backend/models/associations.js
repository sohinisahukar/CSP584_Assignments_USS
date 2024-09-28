const Order = require('./Order');
const OrderItem = require('./OrderItem');
const User = require('./User');
const Product = require('./Product');
const CustomerAddress = require('./CustomerAddress');
const Store = require('./Store');

// Define associations

// Order <-> OrderItem (One-to-Many relationship)
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' }); // One order has many order items
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' }); // Each order item belongs to an order

// Order <-> User (Many-to-One relationship)
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Each order belongs to a user
User.hasMany(Order, { foreignKey: 'userId', as: 'userOrders' }); // One user can have many orders

// OrderItem <-> Product (Many-to-One relationship)
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); // Each order item is associated with a product
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' }); // One product can be in many order items

// User <-> CustomerAddress (One-to-Many relationship)
User.hasMany(CustomerAddress, { foreignKey: 'userId', as: 'addresses' }); // One user can have many addresses
CustomerAddress.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Each address belongs to one user

// Order <-> CustomerAddress (Many-to-One relationship)
Order.belongsTo(CustomerAddress, { foreignKey: 'addressId', as: 'shippingAddress' }); // Each order has a shipping address
CustomerAddress.hasMany(Order, { foreignKey: 'addressId', as: 'orders' }); // One address can be used in multiple orders

Order.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Export models with associations
module.exports = { Order, OrderItem, User, Product, CustomerAddress };
