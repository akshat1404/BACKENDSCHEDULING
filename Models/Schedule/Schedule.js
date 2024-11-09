// models/Schedule.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true }
});

const ScheduleSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tasks: [TaskSchema],
    email: {type: String, required: true},
    type: { type: String, required: true },
    userId: { type: String, required: true }, 
    followed: {type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
