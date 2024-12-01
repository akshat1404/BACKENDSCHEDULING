const express = require('express');
const UserTask = require('../Models/UserTasks/UserTasks');
const Schedule = require('../Models/Schedule/Schedule');
const authenticate = require('../Middleware/authenticate');
const router = express.Router();

router.post('/submitTasks', authenticate, async (req, res) => {
    try {
        const { scheduleId, completedTasks } = req.body;
        const userId = req.user.id;

        if (!userId || !scheduleId || !Array.isArray(completedTasks)) {
            return res.status(400).json({ message: 'Invalid payload' });
        }

        const schedule = await Schedule.findOne({ id: scheduleId });

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tasksForToday = schedule.tasks.filter((task) => {
            const taskStart = new Date(task.start);
            return taskStart >= today && taskStart < tomorrow;
        });

        const taskIdMapping = tasksForToday.reduce((map, task) => {
            map[task.id] = task.id;
            return map;
        }, {});

        const dbCompletedTasks = completedTasks
            .map((frontendId) => taskIdMapping[frontendId])
            .filter(Boolean); 

        const taskIdsForToday = tasksForToday.map((task) => task.id);

        const isAllTasksCompleted = taskIdsForToday.every((taskId) =>
            dbCompletedTasks.includes(taskId)
        );
        const hasAnyTaskCompleted = dbCompletedTasks.some((taskId) =>
            taskIdsForToday.includes(taskId)
        );

        const status = isAllTasksCompleted
            ? 'success'
            : hasAnyTaskCompleted
            ? 'fail'
            : 'none';

        // Save the result
        const newUserTaskRecord = new UserTask({
            userId,
            tasks: dbCompletedTasks,
            status,
            date: today,
        });

        await newUserTaskRecord.save();

        return res.status(201).json({ message: 'Tasks submitted successfully', status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/getUserHistory', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const userTaskHistory = await UserTask.find({ userId }).sort({ date: -1 });

        if (!userTaskHistory || userTaskHistory.length === 0) {
            return res.status(404).json({ message: 'No task history found for the user' });
        }

        return res.status(200).json({
            message: 'User task history retrieved successfully',
            data: userTaskHistory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
