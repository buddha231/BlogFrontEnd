import { Link } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useState } from 'react';
import BlogNav from '../Navbar/BlogNav';

function ViewBlogs(props) {
    const [blogs, setBlogs] = useState([]);
    const [isExplore, setIsExplore] = useState(true);
    let style = { color: 'rgb(255, 229, 182)' };
    useEffect(() => {
        if (localStorage.getItem('user')) {
            BlogService.getBlogs(isExplore).then(
                (response) => {
                    console.log(response.data);
                    setBlogs(response.data);
                }, (error) => {
                    console.log(error);
                }
            )
        }
    }, [isExplore]);

    const handleDelete = (id) => {
        BlogService.deleteBlog(id).then(
            (response) => {
                console.log(response);
                setBlogs(blogs.filter(blog => blog.id !== id));
            }, (error) => {
                console.log(error);
            }
        )
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
                                style={isExplore ? {} : style}
                            >
                                My Blog
                            </Link>) : <span> </span>
                        }
                        <Link onClick={() => setIsExplore(true)}
                            className="blog__nav"
                            style={isExplore ? style : {}}
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
                                            {' '}{blog.author.first_name} {blog.author.last_name}<br />
                                            {blog.date}
                                        </div>
                                        <Link to={`/blog/${blog.id}`} className="btn btn-danger my-2" style={{ fontSize: '0.8rem' }}>
                                            Read More
                                        </Link>
                                        <span> </span>
                                        {localStorage.getItem('username') === blog.author.username ? (
                                            <a
                                                className="btn btn-danger my-2"
                                                onClick={() => { handleDelete(blog.id) }}
                                                style={{ fontSize: "0.8rem" }}
                                            > <span> </span>
                                                <i class="fas fa-trash"></i>
                                            </a>) : (<span></span>)}

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
