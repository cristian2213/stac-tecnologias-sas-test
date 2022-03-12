'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ****** 1:1 *******
      Order.hasOne(models.BillingDetail, {
        foreignKey: 'orderId',
        as: 'billingDetail', // NOTE - IF I WANT TO USE A MAGIC METHOD, I'LL NEED MAKING IT LIKE THIS: "order.createBillingDetail()" THIS NAME IS RELATED WITH THE "as" KEY WITH THE VALUE: "billingDetail".
      });

      Order.hasOne(models.PackagingProcesse, {
        foreignKey: 'orderId',
        as: 'packagingProcesse',
      });
      // ******************

      // ****** N:1 *******
      Order.belongsTo(models.User, {
        as: 'user',
      });
      // ******************

      // ****** N:N *******
      Order.belongsToMany(models.Product, {
        through: 'OrdersProducts',
        foreignKey: 'orderId',
        as: 'products',
      });
      // ******************
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('paid', 'unpaid'),
        allowNull: true,
        defaultValue: 'unpaid',
        validate: {
          isIn: {
            args: [['paid', 'unpaid']],
            msg: 'Only paid and unpaid allowed.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
      underscored: true,
    }
  );
  return Order;
};
