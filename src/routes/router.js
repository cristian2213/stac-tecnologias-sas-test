const { Router } = require('express');
const router = Router();
const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;
