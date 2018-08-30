const Joi = require('joi');

module.exports = {
  street: Joi.string().required().example('du vicinal'),
  num: Joi.string().required().example('16 A'),
  postalCode: Joi.string().required().example('1602'),
  country: Joi.string().required().example('BE'),
  city: Joi.string().required().example('Bruxelles')
};
