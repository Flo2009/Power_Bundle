const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./Customer');

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
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

Order.belongsTo(User, { foreignKey: 'userId' });

function generateTrackingNumber() {
    return 'TN' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

module.exports = Order;