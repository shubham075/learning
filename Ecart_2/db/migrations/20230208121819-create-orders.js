'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_date: {
        type: Sequelize.DATEONLY
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      payment_method: {
        type: Sequelize.STRING
      },
      shipping_address: {
        type: Sequelize.STRING
      },
      shipping_state: {
        type: Sequelize.STRING
      },
      shipping_city: {
        type: Sequelize.STRING
      },
      shipping_zip: {
        type: Sequelize.INTEGER
      },
      shipping_phone: {
        type: Sequelize.BIGINT
      },
      customerID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customers'
          }, key: 'id'
        }
      },
      productID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'products'
          }, key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};