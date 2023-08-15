import axiosInstance from '../axios';
import authHeaders from '../auth/auth-header';

// const  "http://localhost:8000/api/blogs/";

const BlogPath = 'blogs/';
const getBlogs = (isExplore = true) => {
    if (isExplore) {
        return axiosInstance.get(BlogPath, { headers: authHeaders() });
    } else {
        return axiosInstance.get(BlogPath + 'self/', { headers: authHeaders() });
    }

};

const getBlog = (id) => {
    return axiosInstance.get(BlogPath + id + '/', { headers: authHeaders() });
};

const deleteBlog = (id) => {
    return axiosInstance.delete(BlogPath + id + '/', { headers: authHeaders() });
};

const updateBlog = (id, title, description, photo = null) => {
    if (photo === null) {
        return axiosInstance.put(
            BlogPath + id + '/', { title, description },
            {
                headers: {
                    'Authorization': authHeaders()['Authorization'],
                    'Content-Type': 'multipart/form-data',
                },
            });
    }
    const formData = new FormData();
    formData.append('photo', photo)
    formData.append('fileName', photo.name)
    formData.append('title', title)
    formData.append('description', description)

    console.log(formData)
    return axiosInstance.put(
        BlogPath + id + '/', formData,
        {
            headers: {
                'Authorization': authHeaders()['Authorization'],
                'Content-Type': 'multipart/form-data',
            },
        });
};

const createBlog = (title, description, photo) => {
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)

    formData.append('photo', photo)
    formData.append('fileName', photo.name)
    console.log(formData)
    return axiosInstance.post(
        BlogPath, formData,
        {
            headers: {
                'Authorization': authHeaders()['Authorization'],
                'Content-Type': 'multipart/form-data',
            },
        });
};

const likeBlog = (id) => {
    return axiosInstance.get(BlogPath + id + '/like/', { headers: authHeaders() });
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
