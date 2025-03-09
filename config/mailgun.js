const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

require("dotenv").config();
// console.log(process.env.MAILGUN_API_KEY);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async (subject, emailHtml) => {
  const response = await mg.messages
    .create(process.env.MAILGUN_DOMAIN, {
      from: process.env.MAILGUN_FROM,
      to: [process.env.MAILGUN_TO],
      subject: subject,
      // text: "Testing some Mailgun awesomness!",
      html: emailHtml,
    })
    // logs response data
    .catch((err) => console.error(err)); // logs any error
  return response;
};

module.exports = { sendEmail };
