const uuidv4 = require('uuid/v4');

module.exports = {
  generate(attributes) {
    attributes.uuid = uuidv4();
  }
};