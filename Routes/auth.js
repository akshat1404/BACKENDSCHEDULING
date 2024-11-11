const express = require('express');
const router = express.Router();
const {
  login,
  signup,
  googleLogin
} = require('../Controllers/authController');

router.post('/signUp',signup)
router.post('/login', login);
router.post('/google-login', googleLogin);

module.exports = router;