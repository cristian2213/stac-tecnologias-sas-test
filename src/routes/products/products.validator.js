const { query, param, body } = require('express-validator');
const handleHttpValidations = require('../../services/handleHttpValidations');

const ERROR_MESSAGES = {
  // QUERY DATA
  LIMIT: { isInt: 'The limit query must be greater than 0.' },
  PAGE: { isInt: 'The page query must be greater than 0.' },
  CATEGORY: { isInt: 'The category query must be greater than 0.' },
  ORDER: { isIn: 'The order query only asc and desc are allowed.' },
  SELLER: { isInt: 'The seller query must be greater than 0.' },
  PRICE_GTE: { isInt: 'The price_gte query must be a whole number.' },
  PRICE_LTE: {
    isInt: 'The price_lte query must be a whole number.',
    isLt: 'The price_lte param must be < than price_lte, Example: 6(price_gte >=) < 9(price_lte <=)',
  },

  // PARAM
  SLUG: { isSlug: 'The slug param must be a string.' },

  // PRODUCTS DATA
  NAME: {
    required: 'The name property is required.',
    isLength: 'The _ property must have a length of 5 to 255',
  },
  TITLE: {
    required: 'The title property is required.',
    isLength: 'The _ property must have a length of 5 to 255',
  },
  DESCRIPTION: {
    required: 'The description property is required.',
    isLength: 'The description property must have a length of 20 to 5000',
  },
  PRICE: {
    required: 'The price property is required.',
    isFloat: 'the price property must be a float number.',
  },
  PRODUCT_SLUG: {
    required: 'The slug property is required.',
    isLength: 'The slug property must have a length of 5 to 80',
  },
  STOCK: {
    required: 'The stock property is required.',
    isInt: 'The stock property must be greater than 0.',
  },
  USERID: {
    required: 'The userId property is required.',
    isInt: 'The userId property must be greater than 0.',
  },
};

const {
  LIMIT,
  PAGE,
  CATEGORY,
  ORDER,
  SELLER,
  PRICE_GTE,
  PRICE_LTE,
  SLUG,

  NAME,
  TITLE,
  DESCRIPTION,
  PRICE,
  PRODUCT_SLUG,
  STOCK,
  USERID,
} = ERROR_MESSAGES;

const getAllProductsValidator = [
  query('limit')
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage(LIMIT.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  query('page')
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage(PAGE.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  query('category')
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage(CATEGORY.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  query('order')
    .optional({ nullable: true })
    .isIn(['asc', 'desc'])
    .withMessage(ORDER.isIn)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  query('seller')
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage(SELLER.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  query('price_gte')
    .optional({ nullable: true })
    .custom((price_gte) => {
      const isNumber = Math.abs(price_gte);
      if (isNaN(isNumber)) throw new Error(PRICE_GTE.isInt);
      return true;
    })
    .trim()
    .escape()
    .toFloat(),

  query('price_lte')
    .optional({ nullable: true })
    .custom((price_lte) => {
      const isNumber = Math.abs(price_lte);
      if (isNaN(isNumber)) throw new Error(PRICE_LTE.isInt);
      return true;
    })
    .custom((price_lte, { req }) => {
      const bothExist = req.price_gte && price_lte;
      if (!bothExist) return true;

      if (+req.price_gte > +price_lte) throw new Error(PRICE_LTE.isLt);
      return true;
    })
    .trim()
    .escape()
    .toFloat(),
  handleHttpValidations,
];

const slugValidator = [
  param('slug').isSlug().withMessage(SLUG.isSlug).bail().trim().escape(),
  handleHttpValidations,
];

const addOneProductValidator = [
  body('name')
    .exists()
    .withMessage(NAME.required)
    .bail()
    .isLength([{ min: 5, max: 255 }])
    .withMessage(NAME.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  body('title')
    .exists()
    .withMessage(TITLE.required)
    .bail()
    .isLength([{ min: 5, max: 255 }])
    .withMessage(TITLE.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  body('description')
    .exists()
    .withMessage(DESCRIPTION.required)
    .bail()
    .isLength([{ min: 20, max: 5000 }])
    .withMessage(DESCRIPTION.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  body('price')
    .exists()
    .withMessage(PRICE.required)
    .bail()
    .isFloat()
    .withMessage(PRICE.isFloat)
    .bail()
    .trim()
    .escape()
    .toFloat(),

  body('slug')
    .exists()
    .withMessage(SLUG.required)
    .bail()
    .isLength([{ min: 5, max: 80 }])
    .withMessage(PRODUCT_SLUG.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  body('stock')
    .exists()
    .withMessage(STOCK.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(STOCK.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  body('userId')
    .exists()
    .withMessage(USERID.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(USERID.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  handleHttpValidations,
];

module.exports = {
  getAllProductsValidator,
  slugValidator,
  addOneProductValidator,
};
