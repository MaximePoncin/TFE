const addressDefinition = require('../address/modelDefinition');

module.exports = {
  name: String,
  url: String,
  mail: String,
  beerTypes: [String],
  address: addressDefinition,
  images: [{
    path: String,
    link: String
  }]
}
