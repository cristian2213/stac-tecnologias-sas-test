const { Op } = require('sequelize');
const { Category } = require('../../db/models/index');
const handleHttpError = require('../../services/handleHttpError');
const {
  getAllProducts,
  getOneProduct,
  addNewProduct,
} = require('../../models/products.model');
const { getPagination } = require('../../services/paginator');
const { StatusCodes } = require('http-status-codes');

async function httpGetAllProducts(req, res) {
  try {
    const { category, order, seller, price_lte, price_gte } = req.query;
    const { skip: offset, limit } = getPagination(req.query);

    const filter = { where: {}, offset, limit };

    if (category)
      filter.include = [
        {
          model: Category,
          as: 'categories',
          require: true,
          where: {
            id: category,
          },
          attributes: [], // WITHOUT CATEGORY RELATIONSHIP
          through: { attributes: [] },
        },
      ];

    if (order) filter.order = [['id', order || 'asc']];

    if (seller) {
      filter.where.userId = seller;
    }

    // >= x  <= x
    if (price_gte && price_lte) {
      if (+price_gte < +price_lte)
        filter.where.price = { [Op.between]: [price_gte, price_lte] };
    } else {
      if (price_gte) filter.where.price = { [Op.gte]: price_gte }; // >=
      if (price_lte) filter.where.price = { [Op.lte]: price_lte }; // <=
    }

    const products = await getAllProducts(filter);

    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    handleHttpError(res, error);
  }
}
async function httpGetOneProduct(req, res) {
  try {
    const { slug } = req.params;
    const filter = { where: { slug } };
    const product = await getOneProduct(filter);
    if (!product)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Product #${slug} doesn't exist.`,
      });

    return res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpAddOneProduct(req, res) {
  try {
    const data = req.body;
    const product = await addNewProduct(data);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    handleHttpError(res, error);
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetOneProduct,
  httpAddOneProduct,
};
