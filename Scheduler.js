const cron = require('node-cron');
const moment = require('moment');
const Schedule = require('./Models/Schedule/Schedule');
const sendDailyEmail = require('./Utils/sendMailyEmail');

cron.schedule('26 00 * * *', async () => {
  const today = moment().startOf('day').toISOString();
  const tomorrow = moment().add(1, 'days').startOf('day').toISOString();
  console.log('Scheduler Running');
  console.log('Today:', today);
  console.log('Tomorrow:', tomorrow);
  return ;
  try {
    const schedules = await Schedule.find({
      'tasks.start': { $gte: today, $lt: tomorrow }
    });

    schedules.forEach(schedule => {
      const todayTasks = schedule.tasks.filter(task => {
        const taskDate = moment(task.start).startOf('day').toISOString();
        return taskDate === today;
      });
      console.log('todayTasks', todayTasks);
      if (todayTasks.length > 0) {
        sendDailyEmail(schedule.email, todayTasks);
      }
    });
  } catch (error) {
    console.error('Error running daily task email cron job:', error);
  }
},{
  timezone: 'Asia/Kolkata'
});
