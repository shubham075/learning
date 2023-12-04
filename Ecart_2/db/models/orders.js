'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.customers);
      orders.belongsTo(models.products);
    }
  }
  orders.init({
    order_date: DataTypes.DATEONLY,
    total_amount: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    shipping_address: DataTypes.STRING,
    shipping_state: DataTypes.STRING,
    shipping_city: DataTypes.STRING,
    shipping_zip: DataTypes.INTEGER,
    shipping_phone: DataTypes.BIGINT,
    customerID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'orders',
  });
  return orders;
};