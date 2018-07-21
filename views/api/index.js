const Layouts = require('./layouts');

module.exports = {
  async expose(obj, collection) {
    return await Layouts[collection].expose(obj);
  }
};