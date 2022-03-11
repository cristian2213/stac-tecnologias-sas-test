const { body, param } = require('express-validator');
const handleHttpValidations = require('../../services/handleHttpValidations');

const ERROR_MESSAGES = {
  ID: { isInt: 'The id param must be a whole number.' },
  NAME: { required: 'The name field is required.' },
  EMAIL: {
    required: 'The email field is required.',
    isEmail: 'The email field is invalid.',
  },
  PASSWORD: {
    required: 'The password field is required.',
    isStrong:
      'The password field must have a minimum of 8 characters, a minimum of 1 lowercase, a minimum of 1 uppercase, 1 number and 1 symbol.',
  },
};
const { ID, NAME, EMAIL, PASSWORD } = ERROR_MESSAGES;

const addNewUserValidator = [
  body('name').exists().withMessage(NAME.required).bail().trim().escape(),
  body('email')
    .exists()
    .withMessage(EMAIL.required)
    .bail()
    .isEmail()
    .withMessage(EMAIL.isEmail)
    .bail()
    .trim()
    .escape(),
  body('password')
    .exists()
    .withMessage(PASSWORD.required)
    .bail()
    .isStrongPassword()
    .withMessage(PASSWORD.isStrong)
    .bail()
    .trim(),
  handleHttpValidations,
];

const paramValidator = [
  param('id').custom((id) => {
    const absValue = Math.abs(id);
    if (isNaN(absValue)) throw new Error(ID.isInt);
    return true;
  }),
  handleHttpValidations,
];

module.exports = {
  addNewUserValidator,
  paramValidator,
};
