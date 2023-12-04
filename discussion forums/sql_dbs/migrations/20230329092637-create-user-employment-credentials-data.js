'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_employment_credentials_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      start_year: {
        type: Sequelize.INTEGER
      },
      end_year: {
        type: Sequelize.INTEGER
      },
      isWorking_here: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('user_employment_credentials_data');
  }
};