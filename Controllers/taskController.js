const Schedule = require('../Models/Schedule/Schedule');

exports.getTodayTasks = async (req, res) => {
    const {scheduleID} = request.query;

    try {
        const schedule = await Schedule.findOne({id: scheduleID});
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        const today=moment().startOf('day');
        const tomorrow = moment(today).endOf('day');
        const todayTasks = schedule.tasks.filter(task => {
            const taskStart = moment(task.start);
            const taskEnd = moment(task.end);
            return taskStart.isBetween(today, tomorrow, null, '[]') || taskEnd.isBetween(today, tomorrow, null, '[]');
        })

        res.status(200).json({tasks: todayTasks});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

