const User = require('../../models').User;
var passportJWT = require('passport-jwt');
const moment = require('moment');
var JwtStrategy = passportJWT.Strategy;

exports.jwtStrategy = function(jwtOptions) {
 return new JwtStrategy(jwtOptions,
    function(jwt_payload, next) {
      var user = User.findById(jwt_payload.id);

      if (jwt_payload.exp <= moment().unix()) { user = null }
      next(null, user || false);
    });
};
