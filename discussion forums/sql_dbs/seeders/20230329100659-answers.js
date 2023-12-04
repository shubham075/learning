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
    let items = generate_fake_items(150);
    await queryInterface.bulkInsert('answers', items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('answers', null, {});
  }
};


function generate_fake_items(rowCount) {
  let data = []
  for (let i = 0; i < rowCount; i++) {
    let item = {
      answer: faker.lorem.paragraphs(4),
      questionID: faker.helpers.arrayElement([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
        34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
        45, 46, 47, 48, 49, 50
      ]),
      userID: faker.helpers.arrayElement([1, 2, 3]),
      upvote: faker.random.numeric(),
      downvote: faker.random.numeric(),
    }
    data.push(item);
  }
  return data;
}