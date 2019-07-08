const views = require('../../../views/api/index');
const Password = require('../steps/encrypt');
const Models = require('../../../models');
const pluralize = require('pluralize');
const _ = require('lodash');

module.exports = {
  async update(req, res) {
    let collection = req.params.collection;
    let collection_name = pluralize.singular(_.startCase(collection).replace(' ', ''));
    let attributes = req.body.data.attributes;
    let relationships = req.body.data.relationships;
    let id = req.params.id;

    if (attributes.password) {
      Password.encrypt(attributes);
    }

    let obj = await Models[collection_name].findById(id);
    await obj.update(attributes, { fields: Object.keys(attributes) });

    for (relation in relationships) {
      let id = relationships[relation].data.id;
      let set_relation_method = `set${_.startCase(relation).replace(' ', '')}`;
      await obj[set_relation_method](id);
    }

    res.send(await views.expose(obj, collection));
  }
};
