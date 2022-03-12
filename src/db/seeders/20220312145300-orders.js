'use strict';
const { User } = require('../models/index');

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
      where: {
        email: 'admin@admin.com',
      },
    });

    const orders = [];
    const status = ['paid', 'unpaid'];

    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.round(Math.random());
      orders.push({
        user_id: user.id,
        status: status[randomIndex],
      });
    }

    return await queryInterface.bulkInsert('orders', orders);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('orders', null, {});
  },
};
