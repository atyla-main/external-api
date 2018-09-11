var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var api = require('./routes/api');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var errorManager = require('./app/middleware/error-manager.js');

var JwtStrategy = passportJWT.Strategy;
var atylaJwt = require('./app/strategies/jwt-strategy.js');
var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'maisonBleue';

var strategy = atylaJwt.jwtStrategy(jwtOptions);

passport.use(strategy);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

var CryptoJob = require('./cron-jobs/crypto-values');
CryptoJob.start();

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',  function(req, res, next) {
  passport.authenticate('jwt', { session: false },
  function(err, user, info) {
    if (info && info.name === 'TokenExpiredError') info.status = 401;
    if (info && info.name === 'JsonWebTokenError') info.status = 401;
    if (info && info.name === 'Error') info.status = 401;
    if (err || !user) {
      const error = new Error('Unauthorized')
      error.status = 401
      error.detail = info.message || 'You do not have access to this path.'
      error.title = info.name || 'Unauthorized'
      return next(error)
    }
    req.user = user;
    next();
  })(req, res, next)
}, api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler,
app.use(function(err, req, res, next) {
  errorManager.global(err, req, res, next)
});

module.exports = app;
