import axiosInstance from '../axios';
import authHeaders from '../auth/auth-header';


const BlogPath = 'blogs/';
const getBlogs = async (isExplore = true) => {
    try {
        if (isExplore) {
            return await axiosInstance.get(BlogPath, { headers: authHeaders() });
        } else {
            return await axiosInstance.get(BlogPath + 'self/', { headers: authHeaders() });
        }
    } catch (error) {
        console.log(error)
    }

};

const getBlog = async (id) => {
    try {
        return await axiosInstance.get(BlogPath + id + '/', { headers: authHeaders() });
    } catch (error) {
        console.log(error)
    }
};

const deleteBlog = async (id) => {
    try {
        return await axiosInstance.delete(BlogPath + id + '/', { headers: authHeaders() });
    } catch (error) {
        console.log(error)
    }
};

const updateBlog = async (id, title, description, photo = null) => {
    try {
        if (photo === null) {
            return await axiosInstance.put(
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
        return await axiosInstance.put(
            BlogPath + id + '/', formData,
            {
                headers: {
                    'Authorization': authHeaders()['Authorization'],
                    'Content-Type': 'multipart/form-data',
                },
            });
    } catch (error) {
        console.log(error)
    }
};

const createBlog = async (title, description, photo) => {
    try {
        if (photo === null) {
            return await axiosInstance.post(
                BlogPath + '/', { title, description },
                {
                    headers: {
                        'Authorization': authHeaders()['Authorization'],
                        'Content-Type': 'multipart/form-data',
                    },
                });
        }
        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)

        formData.append('photo', photo)
        formData.append('fileName', photo.name)
        console.log(formData)
        return await axiosInstance.post(
            BlogPath, formData,
            {
                headers: {
                    'Authorization': authHeaders()['Authorization'],
                    'Content-Type': 'multipart/form-data',
                },
            });
    } catch (error) {
        console.log(error)
    }
};

const likeBlog = async (id) => {
    try {
        return await axiosInstance.get(BlogPath + id + '/like/', { headers: authHeaders() });
    } catch (error) {
        console.log(error)
    }
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
