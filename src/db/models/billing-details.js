'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillingDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ******** 1:1 ********
      BillingDetail.belongsTo(models.Order, {
        as: 'order',
      });
      // *********************
    }
  }
  BillingDetail.init(
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
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Allowed firstName length 2 to 255 characters.',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Allowed lastName length 2 to 255 characters.',
          },
        },
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          len: {
            args: [2, 500],
            msg: 'Allowed address length 2 to 500 characters.',
          },
        },
      },
      city: {
        type: DataTypes.ENUM('bogota', 'ibague', 'cali'),
        allowNull: false,
        validate: {
          isIn: {
            args: ['bogota', 'ibague', 'cali'],
            msg: 'Only bogota,ibague,cali allowed',
          },
        },
      },
      postcode: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Allowed postcode length 2 to 255 characters.',
          },
        },
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: 'Allowed phone length 2 to 255 characters.',
          },
        },
      },
      email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please, add a valid email.',
          },
          len: {
            args: [2, 80],
            msg: 'Allowed phone length 2 to 80 characters.',
          },
        },
      },
      additionalInformation: {
        type: DataTypes.TEXT(),
        allowNull: true,
        defaultValue: null,
        validate: {
          len: {
            args: [5, 5000],
            msg: 'Allowed additionalInformation length 5 to 3000 characters.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'BillingDetail',
      underscored: true,
    }
  );
  return BillingDetail;
};
