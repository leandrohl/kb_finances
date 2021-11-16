import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'JWT fefege...',
  'mode': 'cors'
}

const apiConfig = axios.create({
  baseURL: 'https://kbfinances.herokuapp.com',
  headers: headers
});

// apiConfig.interceptors.request.use(async (config) => {
//   const token = getToken();

//   if (token) config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

export default apiConfig;
