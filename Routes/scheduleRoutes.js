const express = require('express');
const router = express.Router();
const {
  createSchedule,
  updateFollowedSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require('../Controllers/scheduleController');
const authenticate = require('../Middleware/authenticate');

router.post('/',authenticate, createSchedule);
router.patch('/:id',authenticate, updateFollowedSchedule);
router.get('/',authenticate, getSchedules);
router.get('/:id',authenticate, getScheduleById); 
router.put('/:id',authenticate, updateSchedule); 
router.delete('/:id',authenticate, deleteSchedule); 

module.exports = router;