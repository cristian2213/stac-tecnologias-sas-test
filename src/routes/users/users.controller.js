const { StatusCodes } = require('http-status-codes');
const {
  getAllUsers,
  getOneUser,
  addNewUser,
} = require('../../models/users.model');
const handleHttpError = require('../../services/handleHttpError');

async function httpGetAllUsers(req, res) {
  try {
    const filter = { attributes: { exclude: ['password'] } };
    return res.status(StatusCodes.OK).json(await getAllUsers(filter));
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpAddNewUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await addNewUser(userData);
    return res.status(StatusCodes.OK).json(newUser);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpGetOneUser(req, res) {
  const { id } = req.params;
  try {
    const filter = { attributes: { exclude: ['password'] } };
    const user = await getOneUser(id, filter);
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `User #${id} doesn't exist.`,
      });

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    handleHttpError(res, error);
  }
}

module.exports = {
  httpGetAllUsers,
  httpAddNewUser,
  httpGetOneUser,
};
