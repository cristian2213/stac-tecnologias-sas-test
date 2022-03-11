const { Router } = require('express');
const authRouter = Router();
const { httpLogin } = require('./auth.controller');

authRouter.post('/login', httpLogin);

module.exports = authRouter;
