'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PackagingProcesse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ******** 1:1 ********
      PackagingProcesse.belongsTo(models.Order, {
        as: 'order',
      });
      // *********************
    }
  }
  PackagingProcesse.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM(
          'packing-up',
          'dispatched',
          'traveling',
          'delivered'
        ),
        allowNull: true,
        defaultValue: 'packing-up',
        validate: {
          isIn: {
            args: [['packing-up', 'dispatched', 'traveling', 'delivered']],
            msg: 'Only packing-up, dispatched, traveling and delivered are allowed.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'PackagingProcesse',
      underscored: true,
    }
  );
  return PackagingProcesse;
};
