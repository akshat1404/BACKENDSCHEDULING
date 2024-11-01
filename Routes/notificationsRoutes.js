const express = require('express');
const router = express.Router();
const {
    getNotifications
} = require('../Controllers/notificationController.js');

router.get('/:id', getNotifications); 

module.exports = router;