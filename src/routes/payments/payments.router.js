const { Router } = require('express');
const paymentsRouter = Router();
const { httpSetNewPayment } = require('./payments.controller');
const verifyToken = require('../../middlewares/auth/verifyToken');
const { setNewPaymentValidator } = require('./payments.validator');

paymentsRouter.post(
  '/',
  verifyToken,
  setNewPaymentValidator,
  httpSetNewPayment
);

module.exports = paymentsRouter;
