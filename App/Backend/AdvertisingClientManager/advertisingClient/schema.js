const Joi = require('joi'),
      addressSchema = require('../address/schema');

module.exports = {
  name: Joi.string().required().example('AdvertisingClient name example'),
  url: Joi.string().required().example('https://facebook.com'),
  mail: Joi.string().required().example('AdvertisingClient@test.com'),
  beerTypes: Joi.array().items(Joi.string()).required(),
  address: addressSchema,
  images: Joi.array().items({
    path: Joi.string(),
    link: Joi.string()
  }).required()
};
