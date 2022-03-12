const { Router } = require('express');
const productsRouter = Router();
const {
  httpGetAllProducts,
  httpGetOneProduct,
  httpAddOneProduct,
} = require('./products.controller');
const verifyToken = require('../../middlewares/auth/verifyToken');
const { isAdmin } = require('../../middlewares/auth/authRoles');
const {
  getAllProductsValidator,
  slugValidator,
  addOneProductValidator,
} = require('./products.validator');

productsRouter.get('/', getAllProductsValidator, httpGetAllProducts);
productsRouter.get('/:slug', slugValidator, httpGetOneProduct);
productsRouter.post(
  '/',
  verifyToken,
  isAdmin,
  addOneProductValidator,
  httpAddOneProduct
);

module.exports = productsRouter;
