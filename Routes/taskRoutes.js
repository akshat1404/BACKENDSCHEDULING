const express = require('express');
const router = express.Router();
const {
  getTodayTasks
} = require('../Controllers/taskController');

router.get('/:id', getTodayTasks); 

module.exports = router;
