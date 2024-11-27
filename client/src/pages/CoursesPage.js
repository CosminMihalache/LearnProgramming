import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/api';
import './CoursesPage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
        
        // Extract unique categories from courses
        const uniqueCategories = [...new Set(data.map(course => course.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="courses-page">
      <div className="filter-section">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <Link to={`/course/${course._id}`} key={course._id} className="course-card">
            <img src={course.imageUrl} alt={course.title} />
            <div className="course-info">
              <h3>{course.title}</h3>
              <span className="category-tag">{course.category}</span>
              <p>{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage; 