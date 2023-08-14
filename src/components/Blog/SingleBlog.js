import { Link, useParams } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useState } from 'react';

function SingleBlog(props) {
    const [blog, setBlog] = useState();
    const [likeCount, setLikeCount] = useState();
    const [isLike, setIsLike] = useState(false);
    let style = { color: 'rgb(255, 229, 182)' };

    const { slug } = useParams();
    console.log(slug)
    useEffect(() => {
        if (localStorage.getItem('user')) {
            BlogService.getBlog(slug).then(
                (response) => {
                    console.log(response.data);
                    setBlog(response.data);
                    setIsLike(response.data.like_users.map(user => user.username).includes(localStorage.getItem("username")));
                }, (error) => {
                    console.log(error);
                }
            )
        }
    }, [likeCount, isLike]);

    const handleLike = () => {
        BlogService.likeBlog(slug).then(
            (response) => {
                console.log(response.data);
                setLikeCount(response.data.like_count);
            }
        )
    }
    return (
        <main>
            <div className="container my-5 bg-light">
                <div className="row bg-theme py-3">
                    <div id="blog-nav" className="col-md-4 col-6 d-flex align-items-center">
                        {localStorage.getItem('user') ? (
                            <Link className="px-md-3 px-2 blog__nav"
                                style={style}
                                to="/blogs/explore"
                            >
                                My Blog
                            </Link>) : <span> </span>
                        }
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
                {blog ? (
                    <div className="p-2 px-md-4 py-5">
                        <h2 className="mb-0">{blog.title}</h2>
                        <div className="border border-info my-4 p-3" style={{ width: 'fit-content' }}>
                            <p className="text-muted m-0" style={{ fontSize: '0.9rem' }}>
                                <i className="fas fa-pen"></i>
                                <span className="pl-1 pr-3 mr-n2">
                                    {blog.author.first_name} {blog.author.last_name}
                                </span>
                                <br />
                                <i className="fas fa-table"></i> {blog.date}
                            </p>
                            <div style={{ fontFamily: 'Poppins', fontWeight: 'normal' }}>
                                <i className="fas fa-heart text-muted">
                                    Liked by <span id="like-count">{blog.like_users.length}</span> people
                                </i>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <img
                                    src={blog.photo}
                                    className="image-fluid"
                                    style={{ maxWidth: '50%', maxHeight: '42vh' }}
                                    alt="Blog Image"
                                />
                                <div className="my-2"></div>
                                <div className="row">
                                    <div className="col-12 text-justify">{blog.description}</div>
                                </div>
                                <div className="my-4">
                                    <a
                                        id="like-button"
                                        className="btn btn-outline-success text-muted mr-2"
                                        type="button"
                                        onClick={handleLike}
                                    >
                                        {isLike ? (
                                            <i className="fas fa-heart like-active">
                                                Like </i>
                                        ) :
                                            <i className="fas fa-heart">
                                                Like </i>

                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <span></span>}
            </div>
        </main>

    );
}

export default SingleBlog;
