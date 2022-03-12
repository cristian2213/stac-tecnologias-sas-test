const { body } = require('express-validator');
const handleHttpValidations = require('../../services/handleHttpValidations');

const MESSAGE_ERROR = {
  ORDER_ID: {
    required: 'The orderId property is required.',
    isInt: 'The orderId property must be greater than 0.',
  },
};
const { ORDER_ID } = MESSAGE_ERROR;

const setNewPaymentValidator = [
  body('orderId')
    .exists()
    .withMessage(ORDER_ID.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(ORDER_ID.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),
  handleHttpValidations,
];

module.exports = { setNewPaymentValidator };
