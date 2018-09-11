const Ico = require('../../models').Ico
const Order = require('../../models').Order
const User = require('../../models').User
const Payment = require('../../models').Payment
const UserSession = require('../../models').UserSession
const PaymentMethodHistory = require('../../models').PaymentMethodHistory
const Transaction = require('../../models').Transaction
const moment = require('moment')
const cryptoRandomString = require('crypto-random-string');

module.exports = {
  async icoCurrentInfos(req,res) {
    let ico = await Ico.findById(req.params.ico);
    let prices = await ico.getPrices();
    let merchant = await ico.getMerchant();
    let actualPrice = {};
    let value = null;

    prices.forEach(price => {
      if (moment().isBetween(price.startDate, price.endDate)) {
        actualPrice = price.amount
      }
    });

    let order = await Order.create({
      status: "creating",
      statusHistory: [{status: "creating", date: moment()}],
      amount: {},
      fees:  0.049,
      source: req.query.merchant
    });

    order.setIco(ico.uuid);
    order.setMerchant(req.params.merchant);

    let userSession = await UserSession.create({
      userAgent: req.query.userAgent,
      ipAddress: req.ip
    });

    res.send({
      data: {
        attributes: {
      		'name': ico.name,
          'coin': ico.coin,
      		'ico-website-url': ico.icoWebsiteUrl,
      		'block-chain': ico.blockChain,
      		'description': ico.description,
          'legal-name': merchant.legalName,
          'commission-rate': merchant.commissionRate,
          'current-price': actualPrice.value,
          'current-currency': actualPrice.currency,
          'order': order.uuid,
          'user-session': userSession.uuid
        }
      }
    })
  },

  async payment(req, res) {
    let order = await Order.findById(req.body.data.attributes.order);
    let orderHistory = order.statusHistory;
    orderHistory.push({ status: "waiting", date: moment()})
    let attributes = {
      status: "waiting",
      statusHistory: orderHistory
    };
    order.update(attributes, { fields: Object.keys(attributes) });
    let user = await User.findById(req.body.data.attributes.user);
    order.setUser(user.uuid);

    let userSession = await UserSession.findById(req.body.data.attributes.userSession);
    userSession.setUser(user.uuid);

    let ico = await order.getIco();
    let prices = await ico.getPrices();
    let actualPrice = {};
    prices.forEach(price => {
      if (moment().isBetween(price.startDate, price.endDate)) {
        actualPrice = price.amount
      }
    });
    let reference = `${cryptoRandomString(10)} atyla.io`;

    let clientPrice = actualPrice.value * req.body.data.attributes.price + ((actualPrice.value * req.body.data.attributes.price) * order.fees);
    let payment = await Payment.create({
      amount: {
        value: clientPrice,
        currency: actualPrice.currency,
        },
        reference: reference,
        status: 'waiting',
        statusHistory: [{status: 'waiting', date: moment()}],
        paymentMethod: 'wire',
        paymentData: {}
      });

     payment.setOrder(order.uuid);

     orderHistory = order.statusHistory;
     orderHistory.push({ status: "processing", date: moment()})
     attributes = {
       status: "processing",
       statusHistory: orderHistory,
       amount: payment.amount
     };
     order.update(attributes, { fields: Object.keys(attributes) });
     res.send({
       data: {
         attributes: {
           amount: {
             value: clientPrice,
             currency: actualPrice.currency
           },
           payment: payment
         }
       }
   });
  },

  async validatePayment(req, res) {
    let body = req.body.data.attributes;
    let order = await Order.findById(body.order);
    let user = await order.getUser();

    let orderHistory = order.statusHistory;
    orderHistory.push({ status: "pending", date: moment()})
    let historyAttributes = {
      status: "pending",
      statusHistory: orderHistory
    };
    order.update(historyAttributes, { fields: Object.keys(historyAttributes) });

    let payment = await order.getPayment();
    let attributes = {
      paymentData: body.paymentData,
      paymentMethod: body.paymentMethod
    };
    payment.update(attributes, { fields: Object.keys(attributes) });

    let paymentMethodHistory = await PaymentMethodHistory.create({
      infos: body.paymentData
    });
    paymentMethodHistory.setUser(user.uuid);

    let transaction = await Transaction.create({
      status: 'waiting',
      amount: payment.amount
    });

    transaction.setPayment(payment.uuid);

    res.send({ data: { attributes: { message: 'payment updated' } } });
  }
}
