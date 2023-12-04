'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_education_credentials_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      school_university_name: {
        type: Sequelize.STRING
      },
      primary_major: {
        type: Sequelize.STRING
      },
      secondary_major: {
        type: Sequelize.STRING
      },
      degree_type: {
        type: Sequelize.STRING
      },
      degree_year: {
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
    await queryInterface.dropTable('user_education_credentials_data');
  }
};