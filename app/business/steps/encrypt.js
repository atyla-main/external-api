const bcrypt = require('bcrypt');

module.exports = {
  encrypt(attributes) {
    attributes.password = bcrypt.hashSync(attributes.password, 10);
  }
};