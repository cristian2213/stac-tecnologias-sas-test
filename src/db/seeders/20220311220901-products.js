'use strict';
const { User } = require('../models/index');
const { faker } = require('@faker-js/faker');

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

    const user = await User.findOne({
      where: { email: 'admin@admin.com' },
    });

    const products = [];
    for (let i = 0; i < 30; i++) {
      const name = faker.commerce.productName();
      products.push({
        name,
        description: faker.commerce.productDescription(),
        title: `${name} #${i}`,
        price: faker.finance.amount(10000, 1000000, 2),
        slug: faker.random.uuid(),
        stock: Math.round(Math.random() * 100),
        likes: Math.round(Math.random() * 10),
        status: true,
        user_id: user.id, // ADMIN BY DEFAULT
      });
    }

    return await queryInterface.bulkInsert('products', products);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('products', null, {});
  },
};
