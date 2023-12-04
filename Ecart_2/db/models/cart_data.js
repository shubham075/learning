'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart_data.belongsTo(models.products);
      cart_data.belongsTo(models.product_data);
      cart_data.belongsTo(models.customers);
    }
  }
  cart_data.init({
    quantity:DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    product_dataID: DataTypes.INTEGER,
    customerID: DataTypes.INTEGER
  }, {
    timestamps:false,
    sequelize,
    modelName: 'cart_data',
  });
  return cart_data;
};