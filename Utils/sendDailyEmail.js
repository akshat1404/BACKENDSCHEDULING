const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const moment = require('moment');

async function sendDailyEmail(email, tasks) {

  console.log('Email User:', process.env.EMAIL_USER);
  console.log('Email Pass:', process.env.EMAIL_PASS);

  const taskDetails = tasks
    .map(task => `- ${task.title} from ${moment(task.start).format('hh:mm A')} to ${moment(task.end).format('hh:mm A')}`)
    .join('\n');

  const message = `
    Hello,
    
    Here are your tasks for today:
    ${taskDetails}

    Best regards,
    Your Scheduler
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Today's Tasks Reminder",
      text: message
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
}

module.exports = sendDailyEmail;
