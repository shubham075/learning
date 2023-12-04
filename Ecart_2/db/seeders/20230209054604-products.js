'use strict';
const faker = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let items = generateFakeProductItems(20);
    // console.log('items', items);
    await queryInterface.bulkInsert('products', items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};

function generateFakeProductItems(rowCount) {
  let data = [];

  for (let i = 0; i < rowCount; i++) {
    let item = {
      name: faker.faker.commerce.product(),
      description: faker.faker.commerce.productDescription(),
      image: faker.faker.image.imageUrl(),
      categoryID: faker.faker.helpers.arrayElements(['1', '2', '3', '4'], 1)
    }
    data.push(item)
  }
  return data;
}
