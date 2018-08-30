const Joi = require('joi');

module.exports = {
  name: Joi.string().required().example('Aqua poney'),
};
