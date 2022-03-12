'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ****** N:1 (THIS is required to use M:M relationship) *******
      ProductsCategories.belongsTo(models.Product, {
        foreignKey: 'productId',
      });

      ProductsCategories.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      // ******************
    }
  }
  ProductsCategories.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'ProductsCategories',
      underscored: true,
    }
  );
  return ProductsCategories;
};
