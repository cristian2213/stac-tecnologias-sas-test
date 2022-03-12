const { body } = require('express-validator');
const handleHttpValidations = require('../../services/handleHttpValidations');

const ERROR_MESSAGES = {
  EMAIL: {
    required: 'The email property is required.',
    isEmail: 'The email property must be a valid email.',
  },
  PASSWORD: {
    required: 'The password property is required.',
    isStrong:
      'The password field must have a minimum of 8 characters, a minimum of 1 lowercase, a minimum of 1 uppercase, 1 number and 1 symbol.',
  },
};
const { EMAIL, PASSWORD } = ERROR_MESSAGES;

const loginValidator = [
  body('email')
    .exists()
    .withMessage(EMAIL.required)
    .bail()
    .isEmail()
    .withMessage(EMAIL.isEmail)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

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

module.exports = { loginValidator };
