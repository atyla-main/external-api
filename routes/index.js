const express = require('express');
const router = express.Router();
const Login = require('../app/authentification/login');
const ExternalController = require('../app/controllers/external');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', Login.login);
router.post('/register-payment', Login.registerPayment);

router.get('/ico-current-info/:ico', ExternalController.icoCurrentInfos)

module.exports = router;
