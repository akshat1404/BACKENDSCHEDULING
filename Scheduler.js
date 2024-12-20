const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const Schedule = require('./Models/Schedule/Schedule');
const User = require('./Models/Auth/User');
const sendDailyEmail = require('./Utils/sendDailyEmail');

router.get('/', async (req, res) => {
  try {
    const today = moment().tz('Asia/Kolkata').startOf('day').toISOString();
    const tomorrow = moment().tz('Asia/Kolkata').add(1, 'days').startOf('day').toISOString();

    const schedules = await Schedule.find({
      'tasks.start': { $gte: today, $lt: tomorrow },
    });

    const users = await User.find();

    const emailTasks = [];

    users.forEach((user) => {
      const userTasks = [];
      schedules.forEach((schedule) => {
        if (!user._id.equals(schedule.userId)) return; 

        const todayTasks = schedule.tasks.filter((task) => {
          const taskDate = moment(task.start)
            .tz('Asia/Kolkata')
            .startOf('day')
            .toISOString();
          return taskDate === today;
        });

        if (todayTasks.length > 0) {
          userTasks.push(...todayTasks);
        }
      });

      if (userTasks.length > 0) {
        emailTasks.push({ email: user.email, tasks: userTasks.length });
        sendDailyEmail(user.email, userTasks);
        console.log(`Email sent to ${user.email} for ${userTasks.length} tasks.`);
      }
    });


    res.status(200).send('Email notifications processed successfully.');
  } catch (error) {
    console.error('Error running daily email cron job:', error);

    res.status(500).send('Error processing email notifications.');
  }
});

module.exports = router;
