import { useNavigate } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useState } from 'react';
import Message from '../Message.js';
import BlogNav from '../Navbar/BlogNav';

const getCurrentDateTime = () => {


    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Format the date
    const formattedDateTime = currentDate.toLocaleDateString(undefined, options);
    return formattedDateTime;

}
const CreateBlog = () => {


    let navigate = useNavigate();


    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const response = await BlogService.createBlog(title, description, photo)
            setLoading(false);
            console.log(response.data);
            navigate('/blogs/explore/', { state: { message: 'Blog created successfully', type: "success" } })

        }
        catch (error) {
            console.error(error)
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.detail) ||
                error.message ||
                error.toString();
            setLoading(false);
            console.log(error);
            const resMessageString = resMessage.toString();
            setTimeout(() => { setMessage(resMessageString) }, 3000)

        }

    }

    return (
        <main>
            <div className="container my-5 bg-light">
                <BlogNav create={false} explore={true} myblog={false} />

                <div className="px-4 py-5">
                    <h3 className="mb-4">Create Post</h3>

                    <form encType="multipart/form-data">
                        {/* {% csrf_token %} */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="Title">Blog Title</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    autoComplete="off"
                                    onChange={(e) => setTitle(e.target.value)}

                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Date">Date</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={getCurrentDateTime()}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="custom-file">Blog Post Image</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        id="blog_pic"
                                        className="custom-file-input"
                                        name="photo"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        required
                                    />
                                    <label className="custom-file-label" htmlFor="blog_pic">
                                        Choose File
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="blog_content">Blog Content</label>
                                    <textarea
                                        className="form-control"
                                        id="blog_content"
                                        rows="10"
                                        name="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12 d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    value="Publish Blog"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                                    <span> Publish Blog</span>
                                </button>
                            </div>

                            {message && (
                                <Message message={message} type="danger" />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </main >
    );
};

export default CreateBlog;

