'use strict';
const { Model } = require('sequelize');
const { getSlug } = require('../../helpers/slugs');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ****** N:1 *******
      Product.belongsTo(models.User, {
        as: 'user',
      });
      // ******************

      // ****** N:N *******
      Product.belongsToMany(models.Category, {
        through: 'ProductsCategories',
        foreignKey: 'productId',
        as: 'categories',
      });

      Product.belongsToMany(models.Order, {
        through: 'OrdersProducts',
        foreignKey: 'productId',
        as: 'orders',
      });
      // ******************
    }
  }
  Product.init(
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [5, 255],
            msg: 'Allowed length minimum 5 and maximum 255 characters.',
          },
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [5, 255],
            msg: 'Allowed length minimum 5 and maximum 255 characters.',
          },
        },
      },
      description: {
        type: DataTypes.TEXT(5000),
        allowNull: false,
        validate: {
          len: {
            args: [20, 5000],
            msg: 'Allowed length minimum 20 and maximum 5000 characters',
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [5, 255],
            msg: 'Allowed length minimum 5 and maximum 255 characters.',
          },
          async isUnique(slug) {
            const product = await Product.findOne({
              where: {
                slug: slug,
              },
            });

            if (product) throw new Error('The slug field exists already.');
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
        validate: {
          isIn: {
            args: [[true, false]],
            msg: 'Only true or false.',
          },
        },
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
      hooks: {
        beforeCreate: (product) => {
          const slug = getSlug(product.slug);
          product.slug = slug;
        },
      },
    }
  );
  return Product;
};
