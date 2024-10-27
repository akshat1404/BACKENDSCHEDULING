const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const scheduleRoutes = require('./Routes/scheduleRoutes');
const authRoutes = require('./Routes/auth')

dotenv.config();

const app = express();
const port = process.env.PORT || 800;

app.use(cors());
app.use(express.json()); 
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Schedule App API!');
});

app.use('/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
