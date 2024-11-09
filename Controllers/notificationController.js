const Schedule = require("../Models/Schedule/Schedule");
const moment = require("moment");

exports.getNotifications = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const schedule = await Schedule.findOne({ id: scheduleId }).select("tasks");

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        const startOfDay = moment().startOf("day");
        const endOfDay = moment().endOf("day");

        const todaysTasks = schedule.tasks.filter(task => {
            const taskStart = moment(task.start);
            return taskStart.isBetween(startOfDay, endOfDay, null, "[]");
        });

        res.json(todaysTasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
};
