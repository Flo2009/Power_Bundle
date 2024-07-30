const sequelize = require('../config/connection');
const { Customer, Product, Order, OrderItem, Payment } = require('../models');

const customerData = require('./customerData.json');
const productData = require('./productData.json');
const orderData = require('./orderData.json');
const orderItemData = require('./orderItemData.json');
const paymentData = require('./paymentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const customers = await Customer.bulkCreate(customerData, {
    individualHooks: true,
    returning: true,
  });
 
  const products = await Product.bulkCreate(productData, {
    returning: true,
  })
  
  const orders = await Order.bulkCreate(orderData, {
    individualHooks: true,
    returning: true,
  });

  const orderItems = await OrderItem.bulkCreate(orderItemData, {
    returning: true,
  });

  const payments = await Comment.bulkCreate(paymentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
