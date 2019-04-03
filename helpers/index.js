const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "" };

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({

  });

  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
}