import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    // baseURL: 'https://webapp231.pythonanywhere.com/api/',
});

export default axiosInstance;
