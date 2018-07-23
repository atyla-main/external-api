const User = require('../../../models').User;
const Processes = require('../methods/list');
const views = require('../../../views/api/index');

module.exports = {
  async index(req, res) {
    let collection_name = req.params.collection;
    let objs = await Processes[collection_name]['index']();
    let payload = [];

    for (obj in objs) {
      let record = await views.expose(objs[obj], collection_name);
      payload.push(record.data);
    }

    res.send({ data: payload });
  }
};