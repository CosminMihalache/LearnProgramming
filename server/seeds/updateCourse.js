const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const updateCourse = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const courseId = "674642cbbb16c66df3eadcdd"; // Your course ID
    
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          content: [
            {
              heading: "Introduction to Python",
              body: "Python is a high-level, interpreted programming language that lets you work quickly and integrate systems more effectively."
            },
            {
              heading: "Variables and Data Types",
              body: "Learn about Python's basic data types including integers, floating-point numbers, strings, and booleans."
            },
            {
              heading: "Control Flow",
              body: "Understand how to control the flow of your program using if statements, loops, and conditional expressions."
            }
          ]
        }
      },
      { new: true }
    );
    
    console.log('Course updated:', updatedCourse);
    process.exit(0);
  } catch (error) {
    console.error('Error updating course:', error);
    process.exit(1);
  }
};

updateCourse(); 