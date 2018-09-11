const uuidv4 = require('uuid/v4');
const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');
const Password = require('../steps/encrypt');
const moment = require('moment');

module.exports = {
  async create(req, res, next) {
    let attributes = req.body.data.attributes;
    let relationships = req.body.data.relationships;

    if (attributes.password) {
      Password.encrypt(attributes);
    }

    if (attributes.status) {
      attributes.statusHistory = [{
        status: attributes.status,
        date: moment()
      }]
    }

    let obj = await res.model['create'](attributes).catch(errors => {
      res.sequelizeError = true
      next(errors)
    });

    if (res.sequelizeError) { return }

    for (relation in relationships) {
      let id = relationships[relation].data.id;
      let set_relation_method = `set${_.startCase(relation).replace(' ', '')}`;
      await obj[set_relation_method](id);
    }

    res.send(await views.expose(obj, res.collection));
  }
};
