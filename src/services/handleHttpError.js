const { StatusCodes, ReasonPhrases } = require('http-status-codes');

function handleHttpError(res, error) {
  console.error(error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
}

module.exports = handleHttpError;
