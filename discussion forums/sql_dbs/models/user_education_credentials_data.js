'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_education_credentials_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_education_credentials_data.belongsTo(models.users);
    }
  }
  user_education_credentials_data.init({
    school_university_name: DataTypes.STRING,
    primary_major: DataTypes.STRING,
    secondary_major: DataTypes.STRING,
    degree_type: DataTypes.STRING,
    degree_year: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_education_credentials_data',
  });
  return user_education_credentials_data;
};