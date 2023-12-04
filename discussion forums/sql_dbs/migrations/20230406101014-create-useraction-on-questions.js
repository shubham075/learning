'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('useraction_on_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          }, key: 'id'
        }
      },
      questionID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'questions'
          }, key: 'id'
        }
      },
      action: {
        type: Sequelize.ENUM,
        values: ['like', 'dislike'],
        defaultValue:'like'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('useraction_on_questions');
  }
};