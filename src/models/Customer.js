const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {

    hooks: {
        beforeCreate: async (newCustomerData) => {
          newCustomerData.password = await bcrypt.hash(newCustomerData.password, 10);
          return newCustomerData;
        },
        beforeUpdate: async (updatedCustomerData) => {
          updatedCustomerData.password = await bcrypt.hash(updatedCustomerData.password, 10);
          return updatedCustomerData;
        },
      },


  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'customer'
});

module.exports = Customer;