const { ROLES } = require('../../services/roles');
const { StatusCodes } = require('http-status-codes');

function isAdmin(req, res, next) {
  const roles = req.user.roles.split(',');
  for (const role of roles) {
    if (role === ROLES.ADMIN) {
      return next();
    }
  }
  return res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Your user does not have permissions to execute this action.',
  });
}

function isCustomer(req, res, next) {
  const roles = req.user.roles.split(',');
  for (const role of roles) {
    if (role === ROLES.CUSTOMER) {
      return next();
    }
  }
  return res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Your user does not have permissions to execute this action.',
  });
}

module.exports = {
  isAdmin,
  isCustomer,
};
