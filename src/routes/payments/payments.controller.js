const handleHttpError = require('../../services/handleHttpError');
const { Order } = require('../../db/models/index');
const { StatusCodes } = require('http-status-codes');

// NOTE - METHOD TO MOCK THE PAYMENT!
async function httpSetNewPayment(req, res) {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });

    if (!order)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Order #${orderId} doesn't exist.`,
      });

    order.status = 'paid';
    const orderUpdated = await order.save();

    return res.status(StatusCodes.OK).json(orderUpdated);
  } catch (error) {
    handleHttpError(res, error);
  }
}
module.exports = {
  httpSetNewPayment,
};
