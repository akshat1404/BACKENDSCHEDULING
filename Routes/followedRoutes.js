const express=require('express');
const Router=express.Router();
const {followedSchedule} = require('../Controllers/followedController.js');

Router.post('/:id', followedSchedule);

module.exports=Router;