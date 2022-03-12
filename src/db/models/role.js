'use strict';
const { Model } = require('sequelize');
const { ROLES_VALUES } = require('../../services/roles');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ****** N:1 *******
      Role.belongsTo(models.User, {
        as: 'user',
      });
      // ******************
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM(ROLES_VALUES),
        allowNull: false,
        validate: {
          len: {
            msg: [4, 255],
            msg: 'Allowed name length 2 to 255 characters',
          },
          // notRoles(name) {
          //   if (!ROLES_VALUES.includes(name))
          //     throw new Error(
          //       `Role didn't allow, Only allowed ${ROLES_VALUES.join(', ')}`
          //     );
          // },
        },
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Role',
      underscored: true,
    }
  );
  return Role;
};
