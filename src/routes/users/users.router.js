const { Router } = require('express');
const usersRouter = Router();
const {
  httpGetAllUsers,
  httpAddNewUser,
  httpGetOneUser,
} = require('./users.controller');
const { addNewUserValidator, paramValidator } = require('./users.validator');
const verifyToken = require('../../middlewares/auth/verifyToken');

usersRouter.get('/', httpGetAllUsers);
usersRouter.post('/', verifyToken, addNewUserValidator, httpAddNewUser);
usersRouter.get('/:id', paramValidator, httpGetOneUser);

module.exports = usersRouter;
