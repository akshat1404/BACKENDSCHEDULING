const cron = require('node-cron');
const moment = require('moment-timezone');
const Schedule = require('./Models/Schedule/Schedule');
const User = require('./Models/Auth/User'); 
const sendDailyEmail = require('./Utils/sendMailyEmail');

cron.schedule('00 00 * * *', async () => {
  console.log('Scheduler Running at 08:00 AM IST');

  const today = moment().tz('Asia/Kolkata').startOf('day').toISOString();
  const tomorrow = moment().tz('Asia/Kolkata').add(1, 'days').startOf('day').toISOString();

  console.log('Today (Asia/Kolkata):', today);
  console.log('Tomorrow (Asia/Kolkata):', tomorrow);

  try {
    const schedules = await Schedule.find({
      'tasks.start': { $gte: today, $lt: tomorrow }
    });

    const users = await User.find();

    users.forEach(user => {
      const userTasks = [];
      
      schedules.forEach(schedule => {

        if (!user._id.equals(schedule.userId)) return;
        const todayTasks = schedule.tasks.filter(task => {
          const taskDate = moment(task.start).tz('Asia/Kolkata').startOf('day').toISOString();
          return taskDate === today;
        });

        if (todayTasks.length > 0) {
          userTasks.push(...todayTasks);
        }
      });

      if (userTasks.length > 0) {
        sendDailyEmail(user.email, userTasks); 
        console.log(`Email sent to ${user.email} for today's tasks.`);
      }
    });
  } catch (error) {
    console.error('Error running daily task email cron job:', error);
  }
}, {
  timezone: 'Asia/Kolkata' 
});
