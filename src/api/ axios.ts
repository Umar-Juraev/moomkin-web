import axios from 'axios';

// Create axios instance with common configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,   
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor for handling common errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;
    
//     if (response?.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
    
//     return Promise.reject(error);
//   }
// );

export default api;
