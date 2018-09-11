const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');

module.exports = {
  async show(req, res) {
    res.send(await views.expose(res.record, res.collection));
  }
};
