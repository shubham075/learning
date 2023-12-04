'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      answers.belongsTo(models.users);
      answers.belongsTo(models.questions);
    }
  }
  answers.init({
    answer: DataTypes.TEXT,
    question_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'answers',
  });
  return answers;
};