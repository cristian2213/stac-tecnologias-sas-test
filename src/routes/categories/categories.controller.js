const { StatusCodes } = require('http-status-codes');
const handleHttpError = require('../../services/handleHttpError');
const {
  getAllCategories,
  getOneCategory,
  addNewCategory,
  destroyCategory,
} = require('../../models/categories.model');
const { getPagination } = require('../../services/paginator');

async function httpGetAllCategories(req, res) {
  try {
    const { skip: offset, limit } = getPagination(req.query);
    const filter = { offset, limit };
    const categories = await getAllCategories(filter);

    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpGetOneCategory(req, res) {
  try {
    const { id } = req.params;

    const filter = { where: { id } };
    const category = await getOneCategory(filter);
    if (!category)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Category #${id} doesn't exist.`,
      });

    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpAddNewCategory(req, res) {
  try {
    const data = req.body;
    const category = await addNewCategory(data);
    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpDestroyCategory(req, res) {
  try {
    const { id } = req.params;
    const filter = { where: { id } };
    const categoryExists = await getOneCategory(filter);
    if (!categoryExists)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Category #${id} doesn't exist.`,
      });

    await destroyCategory(filter);
    return res.status(StatusCodes.OK).json(categoryExists);
  } catch (error) {
    handleHttpError(res, error);
  }
}

module.exports = {
  httpGetAllCategories,
  httpGetOneCategory,
  httpAddNewCategory,
  httpDestroyCategory,
};
