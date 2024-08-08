const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Order = require('./Order');
// const Product = require('./Product');

class OrderItem extends Model {}

OrderItem.init({
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'orderItem'
});

// OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
// OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = OrderItem;