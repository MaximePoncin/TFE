const getUserByMail = require('../../user/functions/getUserByMail');
const createToken = require('../../token/functions/createToken');

module.exports = (userId, userPasswd) => {
  return getUserByMail(userId)
  .then(promisedUser => {
    // return JSON.parse(JSON.stringify(promisedUser));
    // console.log(promisedUser);
    return promisedUser
  })
  .then(user => {
    if (user.password === userPasswd) {
      let scopeArr = new Array();

      scopeArr.push(user.role);

      const payload = {
        scope: scopeArr
      }

      return {
        token: createToken(payload),
        user: user
      };
    } else {
      throw new Error('Wrong credentials')
    }
  })
  .catch(err => {
    console.log(err);
    return err;
  })
}
