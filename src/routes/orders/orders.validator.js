const { body } = require('express-validator');
const handleHttpValidations = require('../../services/handleHttpValidations');

const ERROR_MESSAGES = {
  USER_ID: {
    required: 'The userId property is required.',
    isInt: 'The userId property must be greater than 0.',
  },

  PRODUCTS: {
    required: 'The products property is required.',
    isArray: 'The products property must be an array of objects.',

    ID: {
      required: 'The id property in the array of objects is required.',
      isInt: 'The id property in the array of objects must be greater than 0.',
    },

    QUANTITY: {
      required: 'The quantity property in the array of objects is required.',
      isInt:
        'The quantity property in the array of objects must be greater than 0.',
    },
  },

  BILLING_DETAILS: {
    required: 'The billingDetails property is required.',
    isObj: 'The billingDetails property must be an Object.',

    FIRSTNAME: {
      required: 'The firstName property is required.',
      isLength:
        'The firstName property must have a length of 2 to 255 characters.',
    },
    LASTNAME: {
      required: 'The lastName property is required.',
      isLength:
        'The lastName property must have a length of 2 to 255 characters.',
    },
    ADDRESS: {
      required: 'The address property is required.',
      isLength:
        'The address property must have a length of 2 to 500 characters.',
    },
    CITY: {
      required: 'The city property is required.',
      isIn: 'The city property must be one of this options: bogota,ibague,cali',
    },
    POSTCODE: {
      required: 'The postcode property is required.',
      isLength:
        'The postcode property must have a length of 1 to 255 characters.',
    },
    PHONE: {
      required: 'The phone property is required.',
      isLength: 'The phone property must have a length of 6 to 255 characters.',
    },
    EMAIL: {
      required: 'The email property is required.',
      isEmail: 'The email property must be a valid email.',
      isLength: 'The email property must have a length of 2 to 80 characters.',
    },
    ADDITIONALINFORMATION: {
      isLength:
        'The additionalInformation property must have a length of 5 to 5000 characters.',
    },
  },

  PROCESS: {
    PROCESS_ID: {
      required: 'The processId is required.',
      isInt: 'The processId property must be greater than 0.',
    },

    PROCESS: {
      required: 'The process is required.',
      isIn: 'Only packing-up,dispatched,traveling and delivered allowed.',
    },
  },
};
const { USER_ID, PRODUCTS, BILLING_DETAILS, PROCESS } = ERROR_MESSAGES;

const addNewOrderValidator = [
  body('userId')
    .exists()
    .withMessage(USER_ID.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(USER_ID.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  body('products')
    .exists()
    .withMessage(PRODUCTS.required)
    .bail()
    .isArray()
    .withMessage(PRODUCTS.isArray)
    .bail(),

  body('products.*.id')
    .exists()
    .withMessage(PRODUCTS.ID.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(PRODUCTS.ID.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  body('products.*.quantity')
    .exists()
    .withMessage(PRODUCTS.QUANTITY.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(PRODUCTS.QUANTITY.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  body('billingDetails')
    .exists()
    .withMessage(BILLING_DETAILS.required)
    .bail()
    .isObject()
    .withMessage(BILLING_DETAILS.isObj)
    .bail(),

  body('billingDetails.firstName')
    .exists()
    .withMessage(BILLING_DETAILS.FIRSTNAME.required)
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage(BILLING_DETAILS.FIRSTNAME.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  body('billingDetails.lastName')
    .exists()
    .withMessage(BILLING_DETAILS.LASTNAME.required)
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage(BILLING_DETAILS.LASTNAME.isLength)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),

  body('billingDetails.address')
    .exists()
    .withMessage(BILLING_DETAILS.ADDRESS.required)
    .bail()
    .isLength({ min: 2, max: 500 })
    .withMessage(BILLING_DETAILS.ADDRESS.isLength)
    .bail()
    .trim()
    .escape(),

  body('billingDetails.city')
    .exists()
    .withMessage(BILLING_DETAILS.CITY.required)
    .bail()
    .isIn(['bogota', 'ibague', 'cali'])
    .withMessage(BILLING_DETAILS.CITY.isIn)
    .bail()
    .trim()
    .escape(),

  body('billingDetails.postcode')
    .exists()
    .withMessage(BILLING_DETAILS.POSTCODE.required)
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage(BILLING_DETAILS.POSTCODE.isLength)
    .bail()
    .trim()
    .escape(),

  body('billingDetails.phone')
    .exists()
    .withMessage(BILLING_DETAILS.PHONE.required)
    .bail()
    .isLength({ min: 6, max: 255 })
    .withMessage(BILLING_DETAILS.PHONE.isLength)
    .bail()
    .trim(),

  body('billingDetails.email')
    .exists()
    .withMessage(BILLING_DETAILS.EMAIL.required)
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage(BILLING_DETAILS.EMAIL.isLength)
    .bail()
    .isEmail()
    .withMessage(BILLING_DETAILS.EMAIL.isEmail)
    .bail()
    .trim()
    .escape(),

  body('billingDetails.additionalInformation')
    .optional({ nullable: true })
    .isLength({ min: 5, max: 5000 })
    .withMessage(BILLING_DETAILS.ADDITIONALINFORMATION.isLength)
    .bail()
    .trim()
    .escape(),

  handleHttpValidations,
];

const changePackingStatusValidator = [
  body('processId')
    .exists()
    .withMessage(PROCESS.PROCESS_ID.required)
    .bail()
    .isInt({ gt: 0 })
    .withMessage(PROCESS.PROCESS_ID.isInt)
    .bail()
    .trim()
    .escape()
    .toInt(),

  body('process')
    .exists()
    .withMessage(PROCESS.PROCESS.required)
    .bail()
    .isIn(['packing-up', 'dispatched', 'traveling', 'delivered'])
    .withMessage(PROCESS.PROCESS.isIn)
    .bail()
    .trim()
    .escape()
    .toLowerCase(),
  handleHttpValidations,
];
module.exports = {
  addNewOrderValidator,
  changePackingStatusValidator,
  changePackingStatusValidator,
};
