const Joi = require('joi'),
      SchemaPerson = require('./person'),
      SchemaAddress = require('./address');

module.exports = {
  person: SchemaPerson,
  address: SchemaAddress,
  mail: Joi.string().email().required().example('mail@test.com'),
  phoneNumber: Joi.string().required().example('666'),
  password: Joi.string().required().example('1234'),
  salePoint: Joi.string(),
  role: Joi.string().default("User")
};
