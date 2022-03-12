'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ****** N:N *******
      Category.belongsToMany(models.Category, {
        through: 'ProductsCategories',
        foreignKey: 'categoryId',
        as: 'products',
      });
      // ******************
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Allowed name length 2 to 50 characters.',
          },

          async isUnique(name) {
            const nameExists = await Category.findOne({
              where: { name },
            });

            if (nameExists) throw new Error('The category exists already.');
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      underscored: true,
    }
  );
  return Category;
};
