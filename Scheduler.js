const cron = require('node-cron');
const moment = require('moment-timezone');
const Schedule = require('./Models/Schedule/Schedule');
const sendDailyEmail = require('./Utils/sendMailyEmail');

cron.schedule('00 08 * * *', async () => {
  console.log('Scheduler Running at 12:30 AM IST');

  const today = moment().tz('Asia/Kolkata').startOf('day').toISOString();
  const tomorrow = moment().tz('Asia/Kolkata').add(1, 'days').startOf('day').toISOString();

  console.log('Today (Asia/Kolkata):', today);
  console.log('Tomorrow (Asia/Kolkata):', tomorrow);

  try {

    const schedules = await Schedule.find({
      'tasks.start': { $gte: today, $lt: tomorrow }
    });

    schedules.forEach(schedule => {
      const todayTasks = schedule.tasks.filter(task => {
        const taskDate = moment(task.start).tz('Asia/Kolkata').startOf('day').toISOString();
        return taskDate === today;
      });

      console.log('Tasks for today:', todayTasks);

      if (todayTasks.length > 0) {
        sendDailyEmail(schedule.email, todayTasks);
      }
    });
  } catch (error) {
    console.error('Error running daily task email cron job:', error);
  }
}, {
  timezone: 'Asia/Kolkata' 
});
