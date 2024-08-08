const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Order = require('./Order');

class Payment extends Model {}

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'order',
      key: 'id'
    }
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'payment'
});

// Payment.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Payment;