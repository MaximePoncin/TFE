const Joi = require('joi');

module.exports = {
  names: Joi.array().items({
    lang: Joi.string(),
    name: Joi.string()
  })
};
