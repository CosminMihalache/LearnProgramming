import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://newfolder-7mxe.onrender.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error.response?.data || error.message);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error.response?.data || error.message);
    throw error;
  }
};

export const uploadCoursePDF = async (courseId, pdfFile) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    
    const response = await api.post(`/courses/${courseId}/pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const downloadCoursePDF = async (pdfUrl) => {
  try {
    const response = await api.get(pdfUrl, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}; 