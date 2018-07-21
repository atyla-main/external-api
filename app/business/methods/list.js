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
    user: function(order, id) {
      return order.setUser(id);
    }
  }
}