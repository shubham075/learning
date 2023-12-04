'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductCategories', [{
      categoryName: "dairy",
    },
    {
      categoryName: "grains",
    },
    {
      categoryName: "stationary",
    },
    {
      categoryName: "meats",
    }], {});

  },

  async down(queryInterface, Sequelize) { }
};
