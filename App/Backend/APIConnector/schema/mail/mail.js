const Joi = require('joi');

module.exports = {
  // from: Joi.string().email().require(),
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().required()
}
