var express = require('express');
var router = express.Router();
var ProcessCreate = require('../app/business/processes/create');
var ProcessShow = require('../app/business/processes/show');

/* GET home page. */
router.post('/:collection', ProcessCreate.create)
      .get('/:collection/:id', ProcessShow.show);

module.exports = router;
