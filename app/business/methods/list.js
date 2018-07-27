const User = require('../../../models').User;
const Order = require('../../../models').Order;
const Merchant = require('../../../models').Merchant;
const Ico = require('../../../models').Ico;
const Price = require('../../../models').Price;
const Password = require('../steps/encrypt');
const UserSession = require('../../../models').UserSession;
const PaymentMethodHistory = require('../../../models').PaymentMethodHistory;
const Payment = require('../../../models').Payment;
const Transaction = require('../../../models').Transaction;

module.exports =
{
  icos: {
    create: function(attributes) {
      return Ico.create(attributes);
    },
    show: function(id) {
      return Ico.findById(id);
    },
    index: function() {
      return Ico.all();
    },
    merchant: function(ico, id) {
      return ico.setMerchant(id);
    }
  },
  merchants: {
    create: function(attributes) {
      return Merchant.create(attributes);
    },
    show: function(id) {
      return Merchant.findById(id);
    },
    index: function() {
      return Merchant.all();
    },
  },
  orders: {
    create: function(attributes) {
      return Order.create(attributes);
    },
    show: function(id) {
      return Order.findById(id);
    },
    index: function() {
      return Order.all();
    },
    update: async function(attributes, id) {
      if (attributes.password) {
        Password.encrypt(attributes);
      }
      let order = await Order.findById(id);
      return order.update(attributes, { fields: Object.keys(attributes) });
    },
    destroy: async function(id) {
      let order = await Order.findById(id);
      return order.destroy();
    },
    user: function(order, id) {
      return order.setUser(id);
    }
  },
  prices: {
    create: function(attributes) {
      return Price.create(attributes);
    },
    show: function(id) {
      return Price.findById(id);
    },
    index: function() {
      return Price.all();
    },
    ico: function(price, id) {
      return price.setIco(id);
    }
  },
  users: {
    create: function(attributes) {
      Password.encrypt(attributes);
      return User.create(attributes);
    },
    show: function(id) {
      return User.findById(id);
    },
    index: function() {
      return User.all();
    },
    update: async function(attributes, id) {
      if (attributes.password) {
        Password.encrypt(attributes);
      }
      let user = await User.findById(id);
      return user.update(attributes, { fields: Object.keys(attributes) });
    },
    destroy: async function(id) {
      let user = await User.findById(id);
      return user.destroy();
    }
  },
  'user-sessions': {
    create: function(attributes) {
      return UserSession.create(attributes);
    },
    show: function(id) {
      return UserSession.findById(id);
    },
    index: function() {
      return UserSession.all();
    },
    update: async function(attributes, id) {
      let userSession = await UserSession.findById(id);
      return userSession.update(attributes, { fields: Object.keys(attributes) });
    },
    destroy: async function(id) {
      let userSession = await UserSession.findById(id);
      return userSession.destroy();
    },
    user: function(userSession, id) {
      return userSession.setUser(id);
    }
  },
  'payment-method-histories': {
    create: function(attributes) {
      return PaymentMethodHistory.create(attributes);
    },
    show: function(id) {
      return PaymentMethodHistory.findById(id);
    },
    index: function() {
      return PaymentMethodHistory.all();
    },
    update: async function(attributes, id) {
      let paymentMethodHistory = await PaymentMethodHistory.findById(id);
      return paymentMethodHistory.update(attributes, { fields: Object.keys(attributes) });
    },
    destroy: async function(id) {
      let paymentMethodHistory = await PaymentMethodHistory.findById(id);
      return paymentMethodHistory.destroy();
    },
    user: function(paymentMethodHistory, id) {
      return paymentMethodHistory.setUser(id);
    }
  },
  payments: {
    create: function(attributes) {
      return Payment.create(attributes);
    },
    show: function(id) {
      return Payment.findById(id);
    },
    index: function() {
      return Payment.all();
    },
    update: async function(attributes, id) {
      let payment = await Payment.findById(id);
      return payment.update(attributes, { fields: Object.keys(attributes) });
    },
    destroy: async function(id) {
      let payment = await Payment.findById(id);
      return payment.destroy();
    },
    order: function(payment, id) {
      return payment.setOrder(id);
    }
  },
  transactions: {
    create: function(attributes) {
      return Transaction.create(attributes);
    },
    show: function(id) {
      return Transaction.findById(id);
    },
    index: function() {
      return Transaction.all();
    },
    update: async function(attributes, id) {
      let transaction = await Transaction.findById(id);
      return transaction.update(attributes, { fields: Object.keys(attributes) });
    },
    destroy: async function(id) {
      let transaction = await Transaction.findById(id);
      return transaction.destroy();
    },
    payment: function(transaction, id) {
      return transaction.setPayment(id);
    }
  },
}