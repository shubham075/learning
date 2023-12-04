'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productCategory: {
        type: Sequelize.STRING
      },
      productName: {
        type: Sequelize.STRING
      },
      productDescription: {
        type: Sequelize.TEXT
      },
      productPrice: {
        type: Sequelize.INTEGER
      },
      productSize: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.ENUM("active","inactive"),
        defaultValue:"active"
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productTables');
  }
};