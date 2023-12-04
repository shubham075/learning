'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_employment_credentials_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_employment_credentials_data.belongsTo(models.users);
    }
  }
  user_employment_credentials_data.init({
    position: DataTypes.STRING,
    company: DataTypes.STRING,
    start_year: DataTypes.INTEGER,
    end_year: DataTypes.INTEGER,
    isWorking_here: DataTypes.BOOLEAN,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_employment_credentials_data',
  });
  return user_employment_credentials_data;
};