const express = require('express');
const router = express.Router();
const {
  submitTasks
} = require('../Controllers/scheduleController');
const authenticate = require('../Middleware/authenticate');

router.post('/',authenticate, submitTasks);

module.exports = router;
