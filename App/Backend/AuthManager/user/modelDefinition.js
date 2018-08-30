const AddressDefinition = require('../address/modelDefinition'),
      PersonDefinition = require('../person/modelDefinition');

module.exports = {
  mail: {
    type: String,
    unique: true
  },
  phoneNumber: String,
  password: String,
  salePoint: String,
  role: String,
  address: AddressDefinition,
  person: PersonDefinition
}
