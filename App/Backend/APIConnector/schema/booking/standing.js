const Joi = require('joi');

module.exports = {
  value: Joi.string().required().example('5_STAR_HOTEL')
};
