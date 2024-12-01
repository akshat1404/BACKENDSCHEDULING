const express=require('express');
const Router=express.Router();
const {followedSchedule} = require('../Controllers/followedController.js');
const authenticate = require('../Middleware/authenticate.js');

Router.post('/:id',authenticate, followedSchedule);

module.exports=Router;