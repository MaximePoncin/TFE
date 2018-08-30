const Joi = require('joi');

module.exports = {
  country: Joi.string().required().example('DE'),
  city: Joi.string().required().example('Frankfurt')
};
