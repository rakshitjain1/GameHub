// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: "8fc77a60883a421eadd1242ea649dfd8" // Store your RAWG API key in `.env`
  },
});

export default axiosInstance;
