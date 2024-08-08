const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Customer = require('./Customer');

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'order',
  hooks: {
    beforeCreate: (order) => {
      order.trackingNumber = generateTrackingNumber();
    }
  }
});

Order.belongsTo(Customer, { foreignKey: 'customerId' });

function generateTrackingNumber() {
    return 'TN' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

module.exports = Order;


