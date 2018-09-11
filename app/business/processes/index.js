const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');

module.exports = {
  async index(req, res, next) {
    let objs = await res.model.all();
    let payload = [];

    for (obj in objs) {
      let record = await views.expose(objs[obj], res.collection);
      payload.push(record.data);
    }

    res.send({ data: payload });
  }
};
