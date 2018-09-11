const views = require('../../../views/api/index');
const Password = require('../steps/encrypt');
const Models = require('../../../models');
const pluralize = require('pluralize');
const _ = require('lodash');
const moment = require('moment')

module.exports = {
  async update(req, res, next) {
    let attributes = req.body.data.attributes;
    let relationships = req.body.data.relationships;

    if (attributes.password) {
      Password.encrypt(attributes);
    }

    if (attributes.status) {
      attributes.statusHistory = res.record.statusHistory
      attributes.statusHistory.push({
        status: attributes.status,
        date: moment()
      })
    }

    await res.record.update(attributes, {
      fields: Object.keys(attributes)
    }).catch(errors => {
      res.sequelizeError = true
      next(errors)
    });

    if (res.sequelizeError) { return }

    for (relation in relationships) {
      let id = relationships[relation].data.id;
      let set_relation_method = `set${_.startCase(relation).replace(' ', '')}`;
      await res.record[set_relation_method](id);
    }

    res.send(await views.expose(res.record, res.collection));
  }
};
