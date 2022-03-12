const { Router } = require('express');
const router = Router();

const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const ordersRouter = require('./orders/orders.router');
const paymentsRouter = require('./payments/payments.router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/payments', paymentsRouter);

module.exports = router;
