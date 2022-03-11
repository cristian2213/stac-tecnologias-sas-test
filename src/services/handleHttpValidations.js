const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const handleHttpValidations = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty())
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: erros.array() });
  next();
};

module.exports = handleHttpValidations;
