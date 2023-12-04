'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories);
      products.hasMany(models.product_data, {as:'productData'});
      products.hasMany(models.orders);
      products.hasMany(models.cart_data);
    }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'products',
  });
  return products;
};