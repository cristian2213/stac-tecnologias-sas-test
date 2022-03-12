const { Router } = require('express');
const authRouter = Router();
const { httpLogin } = require('./auth.controller');
const { loginValidator } = require('./auth.validator');

authRouter.post('/login', loginValidator, httpLogin);

module.exports = authRouter;
