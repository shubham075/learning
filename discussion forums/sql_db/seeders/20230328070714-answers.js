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
    let items = generate_fake_items(125);
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


function generate_fake_items(rowsCount) {
  let data = [];
  for (let i = 0; i < rowsCount; i++) {
    let item = {
      answer: faker.lorem.paragraphs(5),
      question_id: faker.helpers.arrayElement([
        101, 102, 103, 104, 105, 106, 107, 108,
        109, 110, 111, 112, 113, 114, 115, 116,
        117, 118, 119, 120, 121, 122, 123, 124,
        125, 126, 127, 128, 129, 130, 131, 132,
        133, 134, 135, 136, 137, 138, 139, 140,
        141, 142, 143, 144, 145, 146, 147, 148,
        149, 150
      ]),
      user_id: faker.helpers.arrayElement([4, 5, 6]),
      upvote: faker.random.numeric(),
      downvote: faker.random.numeric(),
    }
    data.push(item);
  }
  return data;
}