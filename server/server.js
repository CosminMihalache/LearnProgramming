const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Add this before mongoose.connect
console.log('Attempting to connect to:', 
  process.env.MONGODB_URI.replace(
    /(mongodb\+srv:\/\/[^:]+:)([^@]+)/, 
    '$1*****'
  )
);

// Add this after your middleware setup
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add more detailed logging
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI type:', typeof process.env.MONGODB_URI);
console.log('Attempting to connect to:', 
  process.env.MONGODB_URI 
    ? process.env.MONGODB_URI.replace(/(mongodb\+srv:\/\/[^:]+:)([^@]+)/, '$1*****')
    : 'undefined'
);

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
};

// Safely get MongoDB URI
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(mongoURI, mongooseOptions)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', {
      name: err.name,
      message: err.message
    });
    process.exit(1);
  });

// Routes
app.use('/api/courses', require('./routes/courses'));

app.use('/uploads', express.static('uploads'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 