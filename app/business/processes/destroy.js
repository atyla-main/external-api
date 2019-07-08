const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');

module.exports = {
  async destroy(req, res) {
    let collection = req.params.collection;
    let collection_name = pluralize.singular(_.startCase(collection).replace(' ', ''));
    let id = req.params.id;

    let obj = await Models[collection_name].findById(id);
    await obj.destroy();

    res.send({});
  }
};
