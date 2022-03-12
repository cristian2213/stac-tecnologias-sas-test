'use strict';
const { Order } = require('../models/index');

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
    const orders = await Order.findAll();
    const status = ['packing-up', 'dispatched', 'traveling', 'delivered'];
    const packagingProcesses = [];

    for (let i = 0; i < orders.length; i++) {
      const randomIndex = Math.round(Math.random() * 3);
      packagingProcesses.push({
        order_id: orders[i].id,
        status: status[randomIndex],
      });
    }

    return await queryInterface.bulkInsert(
      'packaging_processes',
      packagingProcesses
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('packaging_processes', null, {});
  },
};
