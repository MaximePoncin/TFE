const Joi = require('joi');

const AddressSchema = require('../address/schema');

module.exports = {
  name: Joi.string().required().example('Super SalePoint'),
  address: AddressSchema,
  images: Joi.array().items({
    path: Joi.string(),
    link: Joi.string()
  }).required()
}
