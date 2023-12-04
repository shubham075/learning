'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class useraction_on_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      useraction_on_questions.belongsTo(models.users);
      useraction_on_questions.belongsTo(models.questions);
    }
  }
  useraction_on_questions.init({
    userID: DataTypes.INTEGER,
    questionID: DataTypes.INTEGER,
    action: DataTypes.ENUM('like','dislike')
  }, {
    sequelize,
    modelName: 'useraction_on_questions',
  });
  return useraction_on_questions;
};