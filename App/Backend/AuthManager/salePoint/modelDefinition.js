const addressDefinition = require('../address/modelDefinition');

module.exports = {
  name: String,
  address: addressDefinition,
  images: [{
    path: String,
    link: String
  }]
};
