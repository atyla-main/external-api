const User = require('../../../models').User;
const Processes = require('../methods/list');
const views = require('../../../views/api/index');

module.exports = {
  async show(req, res) {
    let collection_name = req.params.collection;
    let id = req.params.id;

    let obj = await Processes[collection_name]['show'](id);

    res.send(await views.expose(obj, collection_name));
  }
};