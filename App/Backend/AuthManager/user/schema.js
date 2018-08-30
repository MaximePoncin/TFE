const Joi = require('joi');

const SchemaPerson = require('../person/schema');

const SchemaAddress = require('../address/schema');

module.exports = {
  person: SchemaPerson,
  address: SchemaAddress,
  mail: Joi.string().email().required().example('mail@test.com'),
  phoneNumber: Joi.string().required().example('666'),
  password: Joi.string().required().example('1234'),
  salePoint: Joi.string(),
  role: Joi.string().default("User")
};
