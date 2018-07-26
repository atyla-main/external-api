const User = require('../../../models').User;
const Order = require('../../../models').Order;
const Merchant = require('../../../models').Merchant;
const Ico = require('../../../models').Ico;
const Price = require('../../../models').Price;
const Uuid = require('../steps/generate-uuid');
const Password = require('../steps/encrypt');

module.exports =
{
  icos: {
    create: function(attributes) {
      Uuid.generate(attributes);
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
      Uuid.generate(attributes);
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
      Uuid.generate(attributes);
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
      Uuid.generate(attributes);
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
      Uuid.generate(attributes);
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
  }
}