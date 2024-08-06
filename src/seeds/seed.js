const sequelize = require('../config/connection');
const { Customer, Product, Cart, CartItem, Order, OrderItem, Payment } = require('../models');

const customerData = require('./customerData.json');
const productData = require('./productData.json');
const orderData = require('./orderData.json');
const orderItemData = require('./orderItemsData.json');
const paymentData = require('./paymentData.json');
const cartData = require('./cart.json');
const cartItemData = require('./cartItems.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  
 
  const products = await Product.bulkCreate(productData, {
    returning: true,
  });

  const customers = await Customer.bulkCreate(customerData,{
    individualHooks: true,
    returning: true,
  });

  const cart =  await Cart.bulkCreate(cartData, {
    returning: true,
  });

  const cartItem = await CartItem.bulkCreate(cartItemData, {
    returning: true,
  });
  
  const orders = await Order.bulkCreate(orderData, {
    individualHooks: true,
    returning: true,
  });

  const orderItems = await OrderItem.bulkCreate(orderItemData, {
    returning: true,
  });

  const payments = await Payment.bulkCreate(paymentData, {
    returning: true,
  });

  

  process.exit(0);
};

seedDatabase();
