const express = require('express');
const router = express.Router();
const {
  submitTasks
} = require('../controllers/scheduleController');
const authenticate = require('../Middleware/authenticate');

router.post('/',authenticate, submitTasks);

module.exports = router;
