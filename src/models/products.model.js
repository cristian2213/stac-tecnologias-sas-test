const { Product } = require('../db/models/index');

async function getAllProducts(filter = null) {
  const products = await Product.findAll(filter);
  return products;
}

async function getOneProduct(filter = null) {
  const product = await Product.findOne(filter);
  return product;
}

async function addNewProduct(data) {
  const newProduct = await Product.create(data);
  return newProduct;
}

module.exports = { getAllProducts, getOneProduct, addNewProduct };
