import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vedaantsinngh@gmail.com",
    pass: "dllvjolyzyitiiqb", // Use App Password instead of regular password
  },
});


transporter.verify((error) => {
  if (error) logger.error('Transporter error:', error);
  else logger.info('Email server ready');
});

export const sendReferralEmail = async (toEmail, courseInterest) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Referral Confirmation',
    text: `Thanks for your referral for the ${courseInterest} course!`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
    return info;
  } catch (error) {
    logger.error(`Email sending failed: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to send email'); // Error originates here
  }
};