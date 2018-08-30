const Joi = require('joi'),
      AddressSchema = require('./address');

module.exports = {
  name: Joi.string().required().example('AdvertisingClient name example'),
  url: Joi.string().required().example('https://facebook.com'),
  mail: Joi.string().required().example('AdvertisingClient@test.com'),
  beerTypes: Joi.array().items(Joi.string()).required(),
  address: AddressSchema,
  images: Joi.array().items({
    path: Joi.string(),
    link: Joi.string()
  }).required()
};
