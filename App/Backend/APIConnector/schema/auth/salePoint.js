const Joi = require('joi'),
      AddressSchema = require('./address');

module.exports = {
  name: Joi.string().required().example('Super SalePoint'),
  address: AddressSchema,
  images: Joi.array().items({
    path: Joi.string(),
    link: Joi.string()
  })
}
