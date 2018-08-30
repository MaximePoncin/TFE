const nodemailer = require('nodemailer')
      mailerConfig = require('../../config/MailManager.mailer.config');

const transporter = nodemailer.createTransport(mailerConfig);

module.exports = (data) => {
  let mailOptions = data;
  mailOptions.from = mailerConfig.auth.user;

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if(err) {
  //     console.log(err);
  //     return h.response({
  //       msg: "Mail sent to " + mailOptions.to,
  //       err: err
  //     });
  //   } else {
  //     console.log(info.response);
  //     return h.response({
  //       msg: "Mail sent to " + mailOptions.to,
  //       res: true
  //     });
  //   }
  // })

  return transporter.sendMail(mailOptions)
  .then(info => {
    console.log("Mail sent");
    return true;
  })
  .catch(err => {
    console.log(err);
    return false;
  })
}
