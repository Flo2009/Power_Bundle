const Customer = require('./Customer');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');

Customer.hasOne(Cart, { foreignKey: 'customerId' });
Cart.belongsTo(Customer, { foreignKey: 'customerId' });

Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

Order.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });



module.exports = { Customer, Product, Cart, CartItem, Order, OrderItem, Payment };