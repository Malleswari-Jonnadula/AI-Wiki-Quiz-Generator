import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const generateQuiz = (url) => API.post('/api/generate', { url });
export const previewUrl = (url) => API.get(`/api/preview?url=${encodeURIComponent(url)}`);
export const getHistory = () => API.get('/api/history');
export const getQuizById = (id) => API.get(`/api/history/${id}`);