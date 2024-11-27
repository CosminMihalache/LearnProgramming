import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById, downloadCoursePDF } from '../services/api';
import DOMPurify from 'dompurify';
import './CourseDetailPage.css';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      if (course.pdfUrl) {
        window.open(course.pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  const convertYouTubeLinks = (html) => {
    // Match YouTube URLs (both regular and shortened)
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:&\S+)?/g;
    
    return html.replace(youtubeRegex, (match, videoId) => {
      return `
        <div class="video-container">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    });
  };

  const sanitizedHTML = DOMPurify.sanitize(
    convertYouTubeLinks(course.body || ''),
    { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }
  );

  return (
    <div className="course-detail">
      <div className="course-header">
        <img 
          src={course.imageUrl || 'https://via.placeholder.com/800x400'} 
          alt={course.title} 
          className="course-image"
        />
        <h1>{course.title}</h1>
      </div>

      <div className="course-content">
        <div className="course-info">
          <p className="course-description">{course.description}</p>
          
          {course.pdfUrl && (
            <button 
              onClick={handleDownloadPDF}
              className="download-pdf-button"
            >
              Download Course PDF
            </button>
          )}
        </div>

        <div 
          className="course-body"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      </div>
    </div>
  );
};

export default CourseDetailPage; 