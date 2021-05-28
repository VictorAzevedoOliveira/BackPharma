const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pharmaoff3@gmail.com',
      pass: 'tcc40028922',
    },
  });

  const mailOptions = {
    from: 'Easy Personal <pharmaoff3@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
