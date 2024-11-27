const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Course+Image'
  },
  category: {
    type: String,
    default: 'Python'
  },
  pdfUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); 