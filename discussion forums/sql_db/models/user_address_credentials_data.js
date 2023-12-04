'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address_credentials_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_address_credentials_data.belongsTo(models.users);
    }
  }
  user_address_credentials_data.init({
    address: DataTypes.STRING,
    start_date: DataTypes.INTEGER,
    end_date: DataTypes.INTEGER,
    currently_live_here: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_address_credentials_data',
  });
  return user_address_credentials_data;
};