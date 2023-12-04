'use strict';

const faker = require('phaker.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const items = generateFakeItems(100);
    
    await queryInterface.bulkInsert('productTables', items, {});
  },

  async down(queryInterface, Sequelize) { }
};

function generateFakeItems(rowCount) {
  let data = [];
  for (let val = 0; val <= rowCount; val++) {
    const newItems = {
      productCategory: faker.random.arrayElement(["dairy", "stationary", "grains", "meats"]),
      productName: faker.commerce.productName(),
      productDescription: 'This is simple description of product ' + (val + 1),
      productPrice: faker.commerce.price(),
      productSize: faker.random.number()
    }
    data.push(newItems);
  }
  return data;
}
