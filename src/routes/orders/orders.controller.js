const { StatusCodes } = require('http-status-codes');
const handleHttpError = require('../../services/handleHttpError');
const {
  associateOrder,
  associateProductsToOrder,
  associateBillingDetailToOrder,
  associatePackagingProcesse,
  getOrderProcess,
  getCurrentSales,
  getAllProcesses,
} = require('../../models/orders.model');
const { getOneUser } = require('../../models/users.model');

async function httpAddNewOrder(req, res) {
  try {
    const { userId, products, billingDetails, orderData } = req.body;

    const user = await getOneUser(userId);
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `User #${userId} doesn't exist.`,
      });

    const order = await associateOrder(user, orderData);

    const [orderProducts, newBillingDetail, packagingProcesse] =
      await Promise.all([
        associateProductsToOrder(order, products),
        associateBillingDetailToOrder(order, billingDetails),
        associatePackagingProcesse(order),
      ]);

    return res.status(StatusCodes.CREATED).json({
      user,
      orderProducts,
      newBillingDetail,
      packagingProcesse,
    });
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpChangePackingStatus(req, res) {
  try {
    const { processId, process } = req.body;
    const filter = { where: { id: processId } };
    const packagingProcess = await getOrderProcess(filter);
    if (!packagingProcess)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Packaging process doesn't exist.`,
      });

    packagingProcess.status = process;
    const newPackagingProcess = await packagingProcess.save();

    return res.status(StatusCodes.OK).json(newPackagingProcess);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpGetProcesses(req, res) {
  try {
    const process = await getAllProcesses();
    return res.status(StatusCodes.OK).json(process);
  } catch (error) {
    handleHttpError(res, error);
  }
}

async function httpGetSales(req, res) {
  try {
    const sales = await getCurrentSales();
    return res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    handleHttpError(res, error);
  }
}

module.exports = {
  httpAddNewOrder,
  httpChangePackingStatus,
  httpGetSales,
  httpGetProcesses,
};
