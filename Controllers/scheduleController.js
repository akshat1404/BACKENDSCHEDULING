const Schedule = require('../Models/Schedule/Schedule');

exports.createSchedule = async (req, res) => {
  try {
    const newSchedule = new Schedule({...req.body, userId: req.user.id});
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create schedule', error });
  }
};

exports.updateFollowedSchedule = async(req,res) =>{

  try {
    const {id} = req.params;
    const {userId} = req.body;

    await Schedule.findOne(
      {userId,followed: true},
      {followed:false}
    )
    console.log(id);
    const updatedSchedule= await Schedule.findOneAndUpdate(
      {id},
      {followed: true},
      {new: true}
    )

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.user.id });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({id:req.params.id});
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const newTasks = req.body.tasks;

    const schedule = await Schedule.findOne({ id: scheduleId });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.tasks = newTasks;

    await schedule.save();

    res.status(200).json({ message: 'Schedule updated successfully', tasks: schedule.tasks });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(400).json({ message: 'Failed to update schedule', error });
  }
};



exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete schedule', error });
  }
};
