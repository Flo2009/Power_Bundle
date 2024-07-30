const User = require('./Customer');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Order.hasMany(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = { User, Product, Order, OrderItem, Payment };