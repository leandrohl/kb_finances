import axios from 'axios';

// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'JWT fefege...',
// }

const apiConfig = axios.create({
  baseURL: 'http://localhost:5000'
});

// apiConfig.interceptors.request.use(async (config) => {
//   const token = getToken();

//   if (token) config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

export default apiConfig;
