'use strict';
const { Model } = require('sequelize');
const argon2 = require('argon2');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 255],
            msg: 'Allowed name length 2 to 255 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please, add a valid email',
          },
          max: {
            args: [80],
            msg: 'Only allow 80 characters',
          },

          async isUnique(email) {
            const userExists = await User.findOne({
              where: { email },
            });
            if (userExists) throw new Error('The email exists already.');
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 150],
            msg: 'Allowed password length 8 to 60 characters',
          },
        },
      },
      emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tokenExpiration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,

      hooks: {
        async beforeCreate(user) {
          const hash = await argon2.hash(user.password);
          user.password = hash;
        },
      },
    }
  );
  return User;
};
