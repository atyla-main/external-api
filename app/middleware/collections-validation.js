const Models = require('../../models');
const pluralize = require('pluralize')
const _ = require('lodash');

function getModel(collection_name, next) {
  let model = Models[collection_name];

  if (!model) {
    const error = new Error('Collection not found')
    error.status = 404
    error.detail = `There is no collection called ${collection_name}.`
    error.title = 'Collection not found'
    return error
  }

  return model
}

module.exports = {
  async validate(req, res, next) {
    res.collection = req.params.collection;
    res.collection_name = pluralize.singular(_.startCase(res.collection).replace(' ', ''));
    let model = getModel(res.collection_name, next);

    if (model.constructor.name == 'Error') { return next(model) }
    res.model = model
    return next()
  }
};
