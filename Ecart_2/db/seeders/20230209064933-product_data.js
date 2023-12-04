'use strict';

const faker = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let items = generateFakeItems(20);
    await queryInterface.bulkInsert('product_data', items, {});
  },


  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('product_data', null, {});
  }
};

function generateFakeItems(rowCount) {
  let data = [];

  for (let i = 0; i < rowCount; i++) {
    let item = {
      size: faker.faker.helpers.arrayElement(['250 gm', '500 gm', '1000 gm', '1500 gm', '2000 gm']),
      price: faker.faker.commerce.price(),
      stock: faker.faker.helpers.arrayElement([20, 30, 40, 50]),
      productID: faker.faker.mersenne.rand(134, 154)
    }
    data.push(item);
  }
  return data;
}