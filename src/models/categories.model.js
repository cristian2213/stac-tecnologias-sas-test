const { Category } = require('../db/models/index');

async function getAllCategories(filter = null) {
  const categories = await Category.findAll(filter);
  return categories;
}
async function getOneCategory(filter) {
  const category = await Category.findOne(filter);
  return category;
}
async function addNewCategory(data) {
  const newCategory = await Category.create(data);
  return newCategory;
}

async function destroyCategory(filter) {
  return await Category.destroy(filter);
}

module.exports = {
  getAllCategories,
  getOneCategory,
  addNewCategory,
  destroyCategory,
};
