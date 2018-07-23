const User = require('../../../models').User;
const Processes = require('../methods/list');
const views = require('../../../views/api/index');

module.exports = {
  async destroy(req, res) {
    let collection_name = req.params.collection;
    let id = req.params.id;

    await Processes[collection_name]['destroy'](id);

    res.send({});
  }
};