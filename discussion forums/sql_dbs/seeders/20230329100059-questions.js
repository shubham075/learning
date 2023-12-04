'use strict';
const { faker } = require('@faker-js/faker');


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
    let items = generate_fake_items(50);
    await queryInterface.bulkInsert('questions', items, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('questions', null, {});

  }
};


function generate_fake_items(rowsCount) {
  let data = [];
  for (let i = 0; i < rowsCount; i++) {
    let item = {
      question: faker.lorem.sentences(2, '\n'),
      upvote: faker.random.numeric(),
      downvote: faker.random.numeric(),
      categoryID: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7]),
      userID: faker.helpers.arrayElement([1, 2, 3])
    }
    data.push(item);
  }
  return data;
}