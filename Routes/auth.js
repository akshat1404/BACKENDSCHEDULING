const express = require('express');
const router = express.Router();
const {
  login,
  signup
} = require('../Controllers/authController');

router.post('/signUp',signup)
router.post('/login', login);

module.exports = router;