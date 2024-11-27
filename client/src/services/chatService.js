import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://newfolder-7mxe.onrender.com/api'
  : 'http://localhost:5000/api';

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}; 