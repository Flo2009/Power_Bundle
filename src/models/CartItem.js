const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Cart = require('./Cart');
// const Product = require('./Product');

class CartItem extends Model {}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cart',
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
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'cartItem'
});

// CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
// CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;