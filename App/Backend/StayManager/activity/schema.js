const Joi = require('joi');

module.exports = {
  descriptions: Joi.array().items({
    lang: Joi.string(),
    name: Joi.string(),
    descr: Joi.string()
  })
};
