const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const updateCourse = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const courseId = "674642cbbb16c66df3eadcdd";
    
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title: "Python Programming",
        description: "Learn Python programming from scratch. Perfect for beginners!",
        image: "/images/python.png",
        content: [
          {
            heading: "Introduction to Python",
            body: "Python is a high-level programming language designed to be easy to read and simple to implement. It is open source, which means it's free to use and distribute, even for commercial purposes. Python's elegant syntax and dynamic typing make it an ideal language for scripting and rapid application development."
          },
          {
            heading: "Setting Up Your Environment",
            body: "To start programming in Python, you'll need to set up your development environment. This includes installing Python on your computer and choosing an Integrated Development Environment (IDE) or text editor. We recommend using Visual Studio Code or PyCharm for beginners."
          },
          {
            heading: "Basic Syntax and Variables",
            body: "Python syntax emphasizes readability. Variables are containers for storing data values. In Python, you don't need to declare variable types explicitly - Python automatically determines the type based on the value assigned."
          },
          {
            heading: "Control Structures",
            body: "Control structures are the heart of any programming language. In Python, we use indentation to define blocks of code. Learn about if statements for decision making, and loops (for, while) for executing code repeatedly."
          }
        ]
      },
      { new: true }
    );
    
    console.log('Course updated successfully!');
    console.log('Updated course:', updatedCourse);
    process.exit(0);
  } catch (error) {
    console.error('Error updating course:', error);
    process.exit(1);
  }
};

updateCourse(); 