import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../services/api';
import CourseCard from './CourseCard';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="course-list">
      <h2>Cursuri Disponibile</h2>
      <div className="courses-grid">
        {courses.slice(0, 3).map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList; 