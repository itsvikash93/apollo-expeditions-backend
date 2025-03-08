const { Resend } = require("resend");

require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (subject, html, email = process.env.ADMIN_EMAIL) => {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: [email],
    subject: subject,
    html: html,
  });

  return { data, error };
};

module.exports = { sendEmail };
