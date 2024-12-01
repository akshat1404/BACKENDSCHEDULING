const express = require('express');
const router = express.Router();
const {
  getTodayTasks
} = require('../Controllers/taskController');
const authenticate = require('../Middleware/authenticate');

router.get('/:id',authenticate, getTodayTasks); 

module.exports = router;
