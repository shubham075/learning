'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.questions, { as: 'userQuestion' });
      users.hasMany(models.answers, { as: 'userAnswer' });
      users.hasMany(models.user_education_credentials_data, { as: 'userEducationCr' });
      users.hasMany(models.user_employment_credentials_data, { as: 'userEmploymentCr' });
      users.hasMany(models.user_address_credentials_data, { as: 'userAddressCr' });
      users.hasMany(models.user_bookmark, { as: 'userBookmark' });
    }
  }
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avtarImage: DataTypes.STRING,
    // isPremium: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};