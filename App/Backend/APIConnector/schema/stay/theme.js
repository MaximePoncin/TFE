const Joi = require('joi');

module.exports = {
  value: Joi.string().required().example('Gastronomy')
};
