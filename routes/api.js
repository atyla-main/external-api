const express = require('express');
const router = express.Router();
const ProcessCreate = require('../app/business/processes/create');
const ProcessShow = require('../app/business/processes/show');
const ProcessIndex = require('../app/business/processes/index');
const ProcessUpdate = require('../app/business/processes/update');
const ProcessDestroy = require('../app/business/processes/destroy');
const ProcessOrder = require('../app/controllers/external');
const CollectionsValidation = require('../app/middleware/collections-validation');
const IdValidation = require('../app/middleware/id-validation');

/* GET home page. */
router.post('/validate-payment', ProcessOrder.validatePayment)
      .post('/order-payment', ProcessOrder.payment)
      .post('/:collection', CollectionsValidation.validate, ProcessCreate.create)
      .get('/:collection/:id', CollectionsValidation.validate, IdValidation.validate,  ProcessShow.show)
      .get('/:collection', CollectionsValidation.validate, ProcessIndex.index)
      .put('/:collection/:id', CollectionsValidation.validate, IdValidation.validate, ProcessUpdate.update)
      .delete('/:collection/:id', CollectionsValidation.validate, IdValidation.validate, ProcessDestroy.destroy);

module.exports = router;
