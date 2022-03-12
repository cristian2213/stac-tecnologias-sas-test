'use strict';
const { Order, Product } = require('../models/index');
const { sequelize } = require('../models/index');

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

    const orders = await Order.findAll({
      limit: 4,
    });

    const products = await Product.findAll({
      order: sequelize.random(),
      limit: 10,
    });

    const orderProducts = [];
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < products.length; j++) {
        orderProducts.push({
          order_id: orders[i].id,
          product_id: products[j].id,
          quantity: Math.ceil(Math.random() * 20),
        });
      }
    }

    return await queryInterface.bulkInsert('orders_products', orderProducts);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('orders_products', null, {});
  },
};
