const _ = require('lodash'),
      saveUser = require('../../user/functions/saveUser'),
      getAllUsers = require('../../user/functions/getAllUsers'),
      Boom = require('boom');

module.exports = (newUser) => {
  return getAllUsers()
  .then(promisedAllUsers => {
    if(_.find(promisedAllUsers, {'mail': newUser.mail})) {
      // throw new Error('User Already exists in storage');
      return Boom.forbidden("Mail already used by another user");
      // return false;
    } else {
      return saveUser(newUser)
      .then(promisedNewUser => {
        if(!promisedNewUser) throw new Error('Registration error');
        return promisedNewUser;
      })
      .catch(err => {
        // console.log(err);
        return Boom.boomify(err);
      })
    }
  })
  .catch(err => {
    // console.log(err);
    return Boom.boomify(err);
  })
}
