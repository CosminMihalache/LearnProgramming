import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const [imageError, setImageError] = useState(false);
  const defaultImage = 'https://via.placeholder.com/300x200?text=Course+Image';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="course-card">
      <div className="card-image-container">
        <img 
          src={imageError ? defaultImage : (course.imageUrl || defaultImage)}
          alt={course.title}
          onError={handleImageError}
          className="card-image"
        />
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <Link to={`/course/${course._id}`} className="view-course">
          Vezi cursul
        </Link>
      </div>
    </div>
  );
};

export default CourseCard; 