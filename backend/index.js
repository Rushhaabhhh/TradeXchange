const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  connectTimeoutMS: 30000, 
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Routes
const UserRoute = require('./Routes/UserRoute');
const AssetRoute = require('./Routes/AssetRoute');

app.use('/user', UserRoute);
app.use('/asset', AssetRoute);

// Error Handling Middleware
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});