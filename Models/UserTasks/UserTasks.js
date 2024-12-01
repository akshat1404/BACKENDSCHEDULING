const mongoose = require('mongoose');

const UserTaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tasks: [{ type: String, ref: 'Task' }],
    status: { type: String, enum: ['success', 'fail', 'none'], required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserTask', UserTaskSchema);
