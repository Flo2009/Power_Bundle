const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Customer = require('./Customer');

class Cart extends Model {}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'customer',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'cart'
});

// Cart.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Cart;