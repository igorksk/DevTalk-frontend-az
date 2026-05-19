import axios from 'axios';

// All API calls go through this configured Axios instance
// In development, Vite's proxy forwards /api/* to http://localhost:5000
const apiClient = axios.create({
  baseURL: 'https://devtalk-backend-afftbndvehgzfqah.canadaeast-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
