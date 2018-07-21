const User = require('../../../models').User;
const Processes = require('../methods/list');
const uuidv4 = require('uuid/v4');
const views = require('../../../views/api/index');

module.exports = {
  async create(req, res) {
    let collection_name = req.params.collection;
    let attributes = req.body.data.attributes;
    let relationships = req.body.data.relationships;

    let obj = await Processes[collection_name]['create'](attributes);

    for (relation in relationships) {
      let id = relationships[relation].data.id;
      await Processes[collection_name][relation](obj, id);
    }

    res.send(await views.expose(obj, collection_name));
  }
};