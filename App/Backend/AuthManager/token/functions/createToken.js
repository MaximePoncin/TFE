const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/token.config');
const secret = require('../config/token.pass').secret;

module.exports = (payload => {
  return jwt.sign(payload, secret, tokenConfig);
});
