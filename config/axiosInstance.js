const axios = require('axios');

function axiosInstance(baseURL) {
  const instance = axios.create({
    baseURL,
    timeout: 180000, // 3 Menit,
    // withCredentials: true,
  });
  return instance;
}

module.exports = axiosInstance;
