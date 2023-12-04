'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      productID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'products'
          }, key: 'id'
        }
      },
      product_dataID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_data'
          }, key: 'id'
        }
      },
      customerID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customers'
          }, key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_data');
  }
};