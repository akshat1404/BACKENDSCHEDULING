// models/UserTasks.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserTasksSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    tasks: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            start: { type: Date, required: true },
            end: { type: Date, required: true },
            completed: { type: Boolean, required: true }
        }
    ]
});

UserTasksSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('UserTasks', UserTasksSchema);
