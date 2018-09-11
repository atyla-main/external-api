const Models = require('../../models');
const pluralize = require('pluralize')
const _ = require('lodash');
const isUuid = require('uuid-validate');

module.exports = {
  async validate(req, res, next) {
    let id = req.params.id

    if (!isUuid(id)) {
      const error = new Error('Id invalid')
      error.status = 422
      error.detail = `This ${id} is not a valid id.`
      error.title = 'Id invalid'
      return next(error)
    }

    let record = await res.model.findById(id);

    if (!record) {
      const error = new Error('Record not found')
      error.status = 404
      error.detail = `There is no record with the id ${id} in the collection ${res.collection_name}.`
      error.title = 'Record not found'
      return next(error)
    }
    res.record = record
    return next()
  }
};
