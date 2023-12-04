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
      questions.belongsTo(models.topic_categories);
      questions.hasMany(models.answers, { as: 'questionKaAnswer' });
      questions.hasMany(models.user_bookmark, { as: 'userBookmarkQuestion' });
    }
  }
  questions.init({
    questions: DataTypes.TEXT,
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};