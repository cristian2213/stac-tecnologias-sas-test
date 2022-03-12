'use strict';
const { User, Product, Category } = require('../models/index');

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

    const products = await Product.findAll({
      where: {
        user_id: user.id,
      },
      limit: 30,
    });

    const categories = await Category.findAll({
      limit: 30,
      order: [['id', 'ASC']],
    });

    let productsCategories = [];
    for (let i = 0; i < 30; i++) {
      productsCategories.push({
        product_id: products[i].id,
        category_id: categories[i].id,
      });
    }

    return await queryInterface.bulkInsert('products_categories', productsCategories);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('products_categories', null, {});
  },
};
