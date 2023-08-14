import axios from 'axios';
import authHeaders from '../auth/auth-header';

const API_URL = "http://localhost:8000/api/blogs/";

const getBlogs = (isExplore = true) => {
    if (isExplore) {
        return axios.get(API_URL, { headers: authHeaders() });
    } else {
        return axios.get(API_URL + 'self/', { headers: authHeaders() });
    }

};

const getBlog = (id) => {
    return axios.get(API_URL + id + '/', { headers: authHeaders() });
};

const deleteBlog = (id) => {
    return axios.delete(API_URL + id + '/');
};

const updateBlog = (id, data) => {
    return axios.put(API_URL + id + '/', data);
};

const likeBlog = (id) => {
    return axios.get(API_URL + id + '/like/', { headers: authHeaders() });
};

const createBlog = (title, description, photo) => {
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)

    formData.append('photo', photo)
    formData.append('fileName', photo.name)
    console.log(formData)
    return axios.post(
        API_URL,
        formData,
        {
            headers: {
                'Authorization': authHeaders()['Authorization'],
                'Content-Type': 'multipart/form-data',
            },
        });
};

const BlogService = {
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
    createBlog,
    likeBlog,
};

export default BlogService;
