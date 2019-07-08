const express = require('express');
const router = express.Router();
const ProcessCreate = require('../app/business/processes/create');
const ProcessShow = require('../app/business/processes/show');
const ProcessIndex = require('../app/business/processes/index');
const ProcessUpdate = require('../app/business/processes/update');
const ProcessDestroy = require('../app/business/processes/destroy');

/* GET home page. */
router.post('/:collection', ProcessCreate.create)
      .get('/:collection/:id', ProcessShow.show)
      .get('/:collection', ProcessIndex.index)
      .put('/:collection/:id', ProcessUpdate.update)
      .delete('/:collection/:id', ProcessDestroy.destroy);

module.exports = router;
