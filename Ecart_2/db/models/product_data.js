'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_data.belongsTo(models.products);
      product_data.hasMany(models.cart_data);
    }
  }
  product_data.init({
    size: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    productID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'product_data',
  });
  return product_data;
};