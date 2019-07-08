const User = require('../../models').User;
var passportJWT = require('passport-jwt');
var JwtStrategy = passportJWT.Strategy;

exports.jwtStrategy = function(jwtOptions) {
 return new JwtStrategy(jwtOptions,
    function(jwt_payload, next) {
      var user = User.findById(jwt_payload.id);

      next(null, user || false);
    });
};