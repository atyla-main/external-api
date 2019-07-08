const Ico = require('../../models').Ico;
const Order = require('../../models').Order;
const User = require('../../models').User;
const UserSession = require('../../models').UserSession;
const Payment = require('../../models').Payment;
const PaymentMethodHistory = require('../../models').PaymentMethodHistory;
const Transaction = require('../../models').Transaction;
var passport = require('passport');
const request = require('request');
const _ = require('lodash');
const moment = require('moment');
const apiv1Url = process.env.ATYLA_API_V1_LINK;

module.exports = {
  async setup(req, res, next) {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `JWT ${req.query.token}`,
    };
    let order = await Order.findById(req.query.order);
    if (order.status === "creating") {
      let orderHistory = order.statusHistory;
      orderHistory.push({ status: "waiting", date: moment()})
      let attributes = {
        status: "waiting",
        statusHistory: orderHistory
      };
      order.update(attributes, { fields: Object.keys(attributes) });
    }

    request.get({ url: `${apiv1Url}api`, headers: headers }, async function (err, httpResponse, body) {
      if (httpResponse.statusCode != 200) {
        res.redirect(`/login?amount=${req.query.amount}&ico=${req.params.ico}&order=${req.query.order}&session=${req.query.session}`);
      } else {
        let user = await User.findById(req.query.user);
        order.setUser(user.uuid);

        let userSession = await UserSession.findById(req.query.session);
        userSession.setUser(user.uuid);

        let ico = await order.getIco();
        let prices = await ico.getPrices();
        let actualPrice = {};

        prices.forEach(price => {
          if (moment().isBetween(price.startDate, price.endDate)) {
            actualPrice = price.amount
          }
        });

        let clientPrice = actualPrice.value * req.query.amount + ((actualPrice.value * req.query.amount) * order.fees);
        let payment = await Payment.create({
          amount: {
            value: clientPrice,
            currency: actualPrice.currency,
          },
          status: 'waiting',
          statusHistory: [{status: 'waiting', date: moment()}],
          paymentMethod: 'bank_wire',
          paymentData: {}
        });


        payment.setOrder(order.uuid);

        let orderHistory = order.statusHistory;
        orderHistory.push({ status: "processing", date: moment()})
        let attributes = {
          status: "processing",
          statusHistory: orderHistory,
          amount: payment.amount
        };
        order.update(attributes, { fields: Object.keys(attributes) });

        res.render('payment', { ico: req.params.ico, amount: req.query.amount, token: req.query.token, order: order.uuid });
      }
    });
  },
  async pay(req, res, next) {
    let body = req.body;

    if (_.isEmpty(body.accountName) || _.isEmpty(body.address) || _.isEmpty(body.iban) || _.isEmpty(body.bankName) || _.isEmpty(body.bic)) {
      res.render('payment', { ico: req.params.ico, amount: req.query.amount, token: req.query.token, order: req.query.order, errors: "Please fill in all the informations" });
    } else {
      let order = await Order.findById(req.query.order);
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
        paymentData: {
          accountName: body.accountName,
          address: body.address,
          iban: body.iban,
          bankName: body.bankName,
          bic: body.bic
        }
      };
      payment.update(attributes, { fields: Object.keys(attributes) });

      let paymentMethodHistory = await PaymentMethodHistory.create({
        infos: {
          type: payment.paymentMethod,
          accountName: body.accountName,
          address: body.address,
          iban: body.iban,
          bankName: body.bankName,
          bic: body.bic
        }
      });
      paymentMethodHistory.setUser(user.uuid);

      let transaction = await Transaction.create({
        status: 'waiting',
        amount: payment.amount
      });

      transaction.setPayment(payment.uuid);

      res.render('paid', { user: user.firstName, amount: payment.amount.value, currency: payment.amount.currency });
    }
  }
}