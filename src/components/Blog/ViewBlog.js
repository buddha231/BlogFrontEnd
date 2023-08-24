import { Link, useLocation } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useState } from 'react';
import BlogNav from '../Navbar/BlogNav';
import Message from '../Message';

function ViewBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [isExplore, setIsExplore] = useState(true);
    const [message, setMessage] = useState({})
    const location = useLocation();
    let style = { color: 'rgb(255, 229, 182)' };
    useEffect(() => {
        setMessage(location.state ? { "message": location.state.message, "type": location.state.type } : {})
        setTimeout(() => { setMessage('') }, 3000)
        const fetchData = async () => {
            if (localStorage.getItem('user') || isExplore) {
                try {
                    const response = await BlogService.getBlogs(isExplore);
                    console.log(response.data);
                    setBlogs(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [isExplore]);

    const titleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase());
    const handleDelete = async (id) => {

        try {
            const response = await BlogService.deleteBlog(id);
            console.log(response);
            setMessage({ message: "blog deleted successfully", type: "success" })
            setTimeout(() => { setMessage('') }, 3000)
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <div className="container my-5 bg-light">
                {/* <BlogNav /> */}
                <div className="row bg-theme py-3">
                    <div id="blog-nav" className="col-md-4 col-6 d-flex align-items-center">
                        {localStorage.getItem('user') ? (
                            <Link className="px-md-3 px-2 blog__nav"
                                onClick={() => { setIsExplore(!isExplore) }}
                                style={isExplore ? { color: 'white' } : style}
                            >
                                My Blog
                            </Link>) : <span> </span>
                        }
                        <Link onClick={() => setIsExplore(true)}
                            className="blog__nav"
                            style={isExplore ? style : { color: 'white' }}
                        >
                            Explore
                        </Link>
                    </div>
                    {localStorage.getItem('user') ? (
                        <div className="col-md-8 col-6 text-right d-flex justify-content-end">
                            <Link to="/blogs/create" className="btn btn-danger mr-3">
                                <i className="fas fa-pen"></i>
                                Create Blog
                            </Link>
                        </div>
                    ) : <span> </span>
                    }
                </div>
                <section className="main-content px-md-4 px-3 py-5">
                    {message && (
                        <Message message={message.message} type={message.type} />
                    )}
                    {blogs.length === 0 ? (
                        <h3 className="mb-4">Explore Blogs From Other Bloggers</h3>
                    ) : (
                        <div className="blogs">
                            {blogs.map(blog => (
                                <div className="card mb-4" key={blog.id}>
                                    <img
                                        className="card-img-top"
                                        style={{
                                            width: '100%',
                                            height: '30vh',
                                            objectFit: 'cover',
                                        }}
                                        src={blog.photo}
                                        alt="Loading..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        <div style={{ fontSize: '0.9rem' }} className="card-subtitle text-muted">
                                            <i className="fas fa-pen"></i>
                                            {' '}{titleCase(blog.author.first_name)} {titleCase(blog.author.last_name)}<br />
                                            {blog.date}
                                        </div>
                                        <Link to={`/blog/${blog.id}`} className="btn btn-danger my-2" style={{ fontSize: '0.8rem' }}>
                                            Read More
                                        </Link>
                                        <span> </span>
                                        {
                                            localStorage.getItem('user') && localStorage.getItem('username') === blog.author.username ?
                                                (
                                                    <>
                                                        <Link
                                                            className="btn btn-danger my-2"
                                                            onClick={() => { handleDelete(blog.id) }}
                                                            style={{ fontSize: "0.8rem" }}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </Link>
                                                        <span> </span>
                                                        <Link
                                                            to={`/blog/edit/${blog.id}`}
                                                            edit={true}
                                                            className="btn btn-danger my-2"

                                                            style={{ fontSize: "0.8rem" }}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                    </>
                                                ) : (<span></span>)
                                        }

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}

export default ViewBlogs;
