'use strict';
const { Order } = require('../models/index');
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

    const orders = await Order.findAll();
    const cities = ['bogota', 'ibague', 'cali'];

    const billingDetails = [];
    for (let i = 0; i < orders.length; i++) {
      const randomIndex = Math.round(Math.random() * 2);
      billingDetails.push({
        order_id: orders[i].id,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        city: cities[randomIndex],
        postcode: faker.address.zipCode(),
        phone: faker.phone.phoneNumber(),
        email: 'customertest@gmail.com',
        additional_information: faker.commerce.productDescription(),
      });
    }

    return await queryInterface.bulkInsert('billing_details', billingDetails);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('billing_details', null, {});
  },
};
