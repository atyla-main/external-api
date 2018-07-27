const express = require('express');
const router = express.Router();
const Login = require('../app/authentification/login');
const PaymentController = require('../app/controllers/payment');
const CalculatorController = require('../app/controllers/calculator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/calculator/:merchant', CalculatorController.setup);
router.post('/calculator/:merchant', CalculatorController.setup);

router.post('/login', Login.login);
router.get('/login', function(req, res) {
  res.render('login', {
    amount: req.query.amount,
    ico: req.query.ico,
    order: req.query.order,
    session: req.query.session
  });
})
router.post('/login-payment', Login.loginPayment);
router.post('/register-payment', Login.registerPayment);
router.get('/register-payment', function(req, res) {
  res.render('register', {
    amount: req.query.amount,
    ico: req.query.ico,
    order: req.query.order,
    session: req.query.session
  });
});
router.get('/atyla-payment/:ico', PaymentController.setup);
router.post('/atyla-payment/:ico', PaymentController.pay);

module.exports = router;
