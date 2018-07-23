const User = require('../../../models').User;
const Order = require('../../../models').Order;
const Uuid = require('../steps/generate-uuid');
const Password = require('../steps/encrypt');

module.exports =
{
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
  }
}