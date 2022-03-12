const { Router } = require('express');
const categoriesRouter = Router();
const {
  httpGetAllCategories,
  httpGetOneCategory,
  httpAddNewCategory,
  httpDestroyCategory,
} = require('./categories.controller');
const verifyToken = require('../../middlewares/auth/verifyToken');
const { isAdmin } = require('../../middlewares/auth/authRoles');
const {
  paginationValidator,
  addNewCategoryValidator,
  idValidator,
} = require('./categories.validator');

categoriesRouter.get('/', paginationValidator, httpGetAllCategories);
categoriesRouter.post(
  '/',
  verifyToken,
  isAdmin,
  addNewCategoryValidator,
  httpAddNewCategory
);
categoriesRouter.get('/:id', idValidator, httpGetOneCategory);
categoriesRouter.delete(
  '/:id',
  verifyToken,
  isAdmin,
  idValidator,
  httpDestroyCategory
);

module.exports = categoriesRouter;
