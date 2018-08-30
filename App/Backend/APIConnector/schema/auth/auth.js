const Joi = require('joi');

module.exports = {
  userId: Joi.string().email().required().example('mail@test.com'),
  userPasswd: Joi.string().required().example('1234')
}
