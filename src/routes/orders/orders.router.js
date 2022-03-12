const { Router } = require('express');
const ordersRouter = Router();
const {
  httpAddNewOrder,
  httpChangePackingStatus,
  httpGetProcesses,
  httpGetSales,
} = require('./orders.controller');
const verifyToken = require('../../middlewares/auth/verifyToken');
const {
  addNewOrderValidator,
  changePackingStatusValidator,
} = require('./orders.validator');

ordersRouter.post('/', verifyToken, addNewOrderValidator, httpAddNewOrder);
ordersRouter.post(
  '/packaging-change',
  verifyToken,
  changePackingStatusValidator,
  httpChangePackingStatus
);
ordersRouter.get('/processes', httpGetProcesses);
ordersRouter.get('/sales', httpGetSales);

module.exports = ordersRouter;
