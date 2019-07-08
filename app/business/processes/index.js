const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');

module.exports = {
  async index(req, res) {
    let collection = req.params.collection;
    let collection_name = pluralize.singular(_.startCase(collection).replace(' ', ''));
    let objs = await Models[collection_name].all();
    let payload = [];

    for (obj in objs) {
      let record = await views.expose(objs[obj], collection);
      payload.push(record.data);
    }

    res.send({ data: payload });
  }
};
