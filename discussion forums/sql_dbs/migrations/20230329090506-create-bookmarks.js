'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'questions'
          }, key: 'id'
        }
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          }, key: 'id'
        }
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
    await queryInterface.dropTable('bookmarks');
  }
};