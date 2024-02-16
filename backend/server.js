const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http')
const mongoose = require('mongoose');
const fs = require('fs')


// const server = http.createServer((request, response) => {
//   console.log(response)
// })

// server.listen(8000, '127.0.0.1', () => {
//   console.log("Server has started!")
// })

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reservations', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const authRoutes = require('./routes/authUser.js'); 
const sportController = require('./controllers/sportController.js');
const locationController = require('./controllers/locationController.js');
const courtController = require('./controllers/courtController.js');
app.use('/api/auth', authRoutes);
app.use('/api/sports', sportController);
app.use('/api/locations', locationController);
app.use('/api/courts', courtController);
