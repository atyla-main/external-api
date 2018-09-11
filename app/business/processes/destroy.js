const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');

module.exports = {
  async destroy(req, res) {
    await res.record.destroy();

    res.send({});
  }
};
