const User = require('./user/user');
const Order = require('./order/order');
const Merchant = require('./merchant/merchant');
const Ico = require('./ico/ico');
const Price = require('./price/price')

module.exports = {
  icos: Ico,
  merchants: Merchant,
  orders: Order,
  prices: Price,
  users: User
};