const { body, param, query } = require('express-validator');
const handleHttpValidations = require('../../services/handleHttpValidations');

const ERROR_MESSAGES = {
  LIMIT: {
    isInt: 'The limit query must be greater than 0.',
  },
  PAGE: {
    isInt: 'The page query must be greater than 0.',
  },

  // CATEGORY
  NAME: {
    required: 'The name property is required.',
    isLength: 'The name property must have a length of 2 to 50 characters.',
  },

  // PARAM
  ID: {
    isInt: 'The id param must be greater than 0.',
  },
};

const { LIMIT, PAGE, NAME, ID } = ERROR_MESSAGES;

const paginationValidator = [
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

  handleHttpValidations,
];

const addNewCategoryValidator = [
  body('name')
    .exists()
    .withMessage(NAME.required)
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(NAME.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),
  handleHttpValidations,
];

const idValidator = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage(ID.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),
  handleHttpValidations,
];
module.exports = { paginationValidator, addNewCategoryValidator, idValidator };
