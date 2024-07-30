const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Order = require('./Order');

class Payment extends Model {}

Payment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Order,
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

Payment.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Payment;