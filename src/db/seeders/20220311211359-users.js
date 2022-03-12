'use strict';
const argon2 = require('argon2');

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

    const adminUser = {
      name: 'admin',
      email: 'admin@admin.com',
      password: await argon2.hash('admin123A@'),
    };
    const customerUser = {
      name: 'customer',
      email: 'customer@gmail.com',
      password: await argon2.hash('customer123A@'),
    };

    const users = [adminUser, customerUser];
    return await queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('users', null, {});
  },
};
