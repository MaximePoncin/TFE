const _ = require('lodash'),
      saveUser = require('../../user/functions/saveUser'),
      getAllUsers = require('../../user/functions/getAllUsers'),
      Boom = require('boom');

module.exports = (newUser) => {
  return getAllUsers()
  .then(promisedAllUsers => {
    if(_.find(promisedAllUsers, {'mail': newUser.mail})) {
      // return Boom.forbidden("Mail already used by another user");
      return {error: "Mail already used"};
    } else {
      return saveUser(newUser)
      .then(promisedNewUser => {
        if(!promisedNewUser) return {error: "Could not register new user"};
        return promisedNewUser;
      })
      .catch(err => {
        // console.log(err);
        return err;
      })
    }
  })
  .catch(err => {
    // console.log(err);
    return err;
  })
}
