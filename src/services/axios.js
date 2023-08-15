import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/api/',
    baseURL: 'http://webapp231.pythonanywhere.com/api/',
});

export default axiosInstance;