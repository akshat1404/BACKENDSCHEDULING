const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const scheduleRoutes = require('./Routes/scheduleRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const authRoutes = require('./Routes/auth')
const notificationsRoutes = require('./Routes/notificationsRoutes.js');
const followedRoutes = require('./Routes/followedRoutes.js');
require('./Scheduler.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 800;

app.use(cors());
app.use(express.json()); 
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 30000, connectTimeoutMS: 30000 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Schedule App API!');
});

app.use('/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/tasks', taskRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/followed',followedRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
