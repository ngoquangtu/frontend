import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchCourses = () => API.get('/courses');
export const fetchCourse = (id) => API.get(`/courses/${id}`);
export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
export const resetpassword=(data) => API.post('/resetpassword',data);
export default API;
