const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create a transporter (the service that actually sends the email)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `ArchLens Support <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.html, 
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;