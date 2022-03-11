// require('dotenv').config();
const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const handleHttpError = require('../../services/handleHttpError');
const { getUserByFilter } = require('../../models/users.model');
const { comparePasswords } = require('../../helpers/passwords');

const JWT_SECRET = process.env.JWT_SECRET;

async function httpLogin(req, res) {
  const { email, password } = req.body;
  try {
    const filter = { where: { email } };
    const user = await getUserByFilter(filter);

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Email ${email} doesn't exist.`,
      });

    const { password: hash, id, name } = user;
    const match = await comparePasswords(hash, password);
    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'The passwords do not match.',
      });

    // FIXME - ROLE
    user.roles = 'admin';

    const payload = {
      sub: id,
      roles: user.roles,
      name,
      email,
    };

    const jwtTimeToLive = 1000 * 60 * 60 + '';

    const { token } = generateJWT(payload, +jwtTimeToLive + 1000 * 120 + '');

    return res.status(StatusCodes.OK).json({
      user,
      token: { token, ttl: jwtTimeToLive },
    });
  } catch (error) {
    handleHttpError(res, error);
  }
}

function generateJWT(payload, ttl = '1h') {
  const token = JWT.sign(payload, JWT_SECRET, {
    expiresIn: ttl,
  });
  return { token, ttl };
}

module.exports = { httpLogin };
