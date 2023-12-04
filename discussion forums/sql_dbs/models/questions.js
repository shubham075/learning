'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questions.belongsTo(models.users);
      questions.belongsTo(models.categories);
      questions.hasMany(models.answers, { as: 'questionAnswer' });
      questions.hasMany(models.bookmarks, {as:'bookmarkQuestion'});
      questions.hasMany(models.useraction_on_questions, {as:'action_on_question'});
    }
  }
  questions.init({
    question: DataTypes.TEXT,
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER,
    categoryID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};