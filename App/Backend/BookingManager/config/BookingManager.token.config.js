const validate = require('../auth/validateToken');

module.exports = {
  key: 'passwd',
  validateFunc: validate,
  verifyOptions: {
    algorithms: ['HS256']
  }
};
