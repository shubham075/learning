'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productTable.init({
    productCategory: DataTypes.STRING,
    productName: DataTypes.STRING,
    productDescription: DataTypes.TEXT,
    productPrice: DataTypes.INTEGER,
    productSize: DataTypes.STRING
  },{
    timestamps:false
  }, {
    sequelize,
    modelName: 'productTable',
  });
  return productTable;
};