const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const scheduleRoutes = require('./Routes/scheduleRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const authRoutes = require('./Routes/auth')
const notificationsRoutes = require('./Routes/notificationsRoutes.js');
const followedRoutes = require('./Routes/followedRoutes.js');
const configRoutes = require('./Routes/configRoutes.js');
const UserTasks = require('./Routes/userTasks.js');
const Scheduler = require('./Scheduler');

dotenv.config();
const app = express();
const port = process.env.PORT || 800;

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Schedule App API!');
});

app.use('/auth', authRoutes);
app.use('/config', configRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/tasks', taskRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/followed',followedRoutes);
app.use('/userTasks',UserTasks);
app.get('/trigger-email-dummy', (req, res) => {
  res.status(200).send('Server is alive');
});
app.use('/trigger-email',Scheduler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
