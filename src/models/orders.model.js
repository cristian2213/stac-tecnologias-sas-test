const { PackagingProcesse, Order } = require('../db/models/index');
const { literal } = require('sequelize');
async function getOrderProcess(filter = null) {
  const process = await PackagingProcesse.findOne(filter);
  return process;
}

async function associateOrder(user, data = null) {
  if (!data) return await user.createOrder({});
  return await user.createOrder(data);
}

async function associateProductsToOrder(order, products) {
  const totalProducts = products.length;
  const orderProducts = [];
  for (let i = 0; i < totalProducts; i++) {
    const orderProduct = await order.addProduct(products[i].id, {
      through: {
        quantity: products[i].quantity,
      },
    });
    orderProducts.push(orderProduct);
  }
  return orderProducts;
}

async function associateBillingDetailToOrder(order, billingDetails) {
  return await order.createBillingDetail(billingDetails);
}

async function associatePackagingProcesse(order) {
  return await order.createPackagingProcesse();
}

async function getCurrentSales() {
  const date = new Date();
  const day = +String(date.getDate()).padStart(2, '0');
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const sales = await Order.findAll({
    attributes: {
      include: [
        [literal(`COUNT(DAY(created_at))`), 'salesByDay'],
        [literal(`COUNT(MONTH(created_at))`), 'salesByMonth'],
        [literal(`COUNT(YEAR(created_at))`), 'salesByYear'],
      ],
      exclude: ['id', 'userId', 'status', 'createdAt', 'updatedAt'],
    },
    where: literal(
      `status = 'paid' AND DAY(created_at) = ${day} AND  MONTH(created_at) = ${month} AND YEAR(created_at) = ${year}`
    ),
    group: literal('DAY(created_at), MONTH(created_at), YEAR(created_at)'),
  });
  return sales;
}

async function getAllProcesses(filter = null) {
  if (!filter) filter = { where: {} };
  return await PackagingProcesse.findAll(filter);
}

module.exports = {
  associateOrder,
  associateProductsToOrder,
  associateBillingDetailToOrder,
  associatePackagingProcesse,
  getOrderProcess,
  getCurrentSales,
  getAllProcesses,
};
