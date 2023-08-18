import { Link, useParams } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useState } from 'react';
import BlogNav from '../Navbar/BlogNav';

function SingleBlog(props) {
    const [blog, setBlog] = useState();
    const [likeCount, setLikeCount] = useState();
    const [isLike, setIsLike] = useState();
    let style = { color: 'rgb(255, 229, 182)' };

    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        // if (localStorage.getItem('user')) {
        BlogService.getBlog(id).then(
            (response) => {
                console.log(response.data);
                setBlog(response.data);
                setIsLike(response.data.like_users.map((user) => user.username).includes(localStorage.getItem('username')));
            }, (error) => {
                console.log(error);
            }
        )
        // }
    }, [likeCount]);

    // useEffect(() => {
    //     if (blog) {
    //         console.log(blog.like_users.map((user) => user.username))
    //         console.log(localStorage.getItem('username'))
    //         setIsLike(blog.like_users.map((user) => user.username).includes(localStorage.getItem('username')));
    //     }
    // }, [blog])

    const handleLike = () => {
        BlogService.likeBlog(id).then(
            (response) => {
                console.log(response.data);
                setLikeCount(response.data.like_count);
            }
        )
    }
    return (
        <main>
            <div className="container my-5 bg-light">
                <BlogNav style={style} explore={true} myblog={true} />
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
                                    style={{ maxWidth: '80%', maxHeight: '60vh' }}
                                    alt="Blog"
                                />
                                <div className="my-2"></div>
                                <div className="row">
                                    <div className="col-12 text-justify">{blog.description}</div>
                                </div>
                                <div className="my-4">


                                    {localStorage.getItem('user') &&
                                        (<button
                                            id="like-button"
                                            className="btn btn-outline-success text-muted mr-2"
                                            type="button"
                                            onClick={handleLike}
                                        >
                                            {localStorage.getItem('username') in blog.like_users.map(x => x.username) || isLike ? (
                                                <i className="fas fa-heart like-active">
                                                    {/* {loading && (<span className="spinner-border spinner-border-sm"></span>)} */}
                                                    Like </i>
                                            ) :
                                                <i className="fas fa-heart">
                                                    {/* {loading && (<span className="spinner-border spinner-border-sm"></span>)} */}
                                                    Like </i>

                                            }
                                        </button>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <span></span>}
            </div>
        </main >

    );
}

export default SingleBlog;
