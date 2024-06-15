// src/axios.js
import axios from 'axios';

// Tạo một instance của axios
const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Thêm interceptor để thêm token vào mỗi yêu cầu
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // hoặc từ một nơi lưu trữ khác
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
