'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('billing_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders', // IN DB
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      first_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      city: {
        type: Sequelize.ENUM('bogota', 'ibague', 'cali'),
        allowNull: false,
      },
      postcode: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      additional_information: {
        type: Sequelize.TEXT(),
        allowNull: true,
        defaultValue: '',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('billing_details');
  },
};
