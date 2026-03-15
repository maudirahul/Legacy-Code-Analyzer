const { Resend } = require('resend');


const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const data = await resend.emails.send({
      from: 'ArchLens Support <onboarding@resend.dev>',
      to: options.email, 
      
      subject: options.subject,
      html: options.html,
    });
  } catch (error) {
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;