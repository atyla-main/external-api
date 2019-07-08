const uuidv4 = require('uuid/v4');
const views = require('../../../views/api/index');
const Models = require('../../../models');
const pluralize = require('pluralize')
const _ = require('lodash');
const Password = require('../steps/encrypt');

module.exports = {
  async create(req, res) {
    let collection = req.params.collection;
    let collection_name = pluralize.singular(_.startCase(collection).replace(' ', ''));
    let attributes = req.body.data.attributes;
    let relationships = req.body.data.relationships;

    if (attributes.password) {
      Password.encrypt(attributes);
    }

    let obj = await Models[collection_name]['create'](attributes);

    for (relation in relationships) {
      let id = relationships[relation].data.id;
      let set_relation_method = `set${_.startCase(relation).replace(' ', '')}`;
      await obj[set_relation_method](id);
    }

    res.send(await views.expose(obj, collection));
  }
};
