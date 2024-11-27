import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import './HomePage.css';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllCourses();
        setCourses(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Learn Programming for Free!</h1>
        <p>Discover our latest programming courses</p>
        <Link to="/courses" className="view-course">View All Courses</Link>
      </div>

      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          {courses.length > 0 ? (
            courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="no-courses">No courses available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 