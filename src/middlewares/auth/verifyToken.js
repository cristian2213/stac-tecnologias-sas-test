const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { getOneUser } = require('../../models/users.model');

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  try {
    const token = req.headers['x-access-token'];
    if (!token)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "The token wasn't attached to the request.",
      });

    const decodedToken = JWT.verify(token, JWT_SECRET);
    const user = await getOneUser(decodedToken.sub);

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'The token owner does not exist.',
      });

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'The token is invalid.',
    });
  }
}

module.exports = verifyToken;
