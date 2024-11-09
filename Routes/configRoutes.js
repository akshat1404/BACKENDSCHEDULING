const express = require('express');
const authenticate = require('../Middleware/authenticate');
const Schedule = require('../Models/Schedule/Schedule');
const User = require('../Models/Auth/User');
const router = express.Router();

router.get('/',authenticate, async (req, res) => {
    
    try {
        const userId = req.user.id;
        const followedSchedule= await Schedule.findOne({userId,followed: true});
        const user = await User.findById(userId, 'name email');
    
        if (!followedSchedule || !user) {
          return res.status(404).json({ message: 'User or followed schedule not found' });
        }

        const data = {
          followedSchedule: followedSchedule.id,
          name: user.name,
          email: user.email,
        };
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching config', error });
    }
})

module.exports = router;