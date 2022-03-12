'use strict';
const { Op } = require('sequelize');
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

    const users = await User.findAll({
      where: {
        email: ['admin@admin.com', 'customer@gmail.com'],
      },
      order: [['id', 'ASC']],
    });

    const roles = users.map((user, index) => {
      if (index === 0)
        return {
          name: 'admin',
          user_id: user.id,
        };

      return {
        name: 'customer',
        user_id: user.id,
      };
    });

    try {
      return await queryInterface.bulkInsert('roles', roles);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('roles', null, {});
  },
};
