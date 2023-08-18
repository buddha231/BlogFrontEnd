
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function BlogNav(props) {
    let style = { color: 'rgb(255, 229, 182)' };
    BlogNav.defaultProps = {
        style: style
    };
    return (
        <div className="row bg-theme py-3">
            <div id="blog-nav" className="col-md-4 col-6 d-flex align-items-center">
                {props.myblog &&
                    (
                        localStorage.getItem('user') ? (
                            <Link className="px-md-3 px-2 blog__nav"
                                style={props.style}
                                to="/blogs/explore"
                            >
                                My Blog
                            </Link>) : <span> </span>
                    )
                }
                {props.explore &&
                    <Link to="/blogs/explore"
                        className="blog__nav"
                        style={style}
                    >
                        Explore
                    </Link>
                }
            </div>
            {
                localStorage.getItem('user') ? (
                    <div className="col-md-8 col-6 text-right d-flex justify-content-end">
                        {props.create &&
                            <Link to="/blogs/create" className="btn btn-danger mr-3">
                                <i className="fas fa-pen"></i>
                                Create Blog
                            </Link>
                        }
                    </div>
                ) : <span> </span>
            }
        </div >
    )
}

export default BlogNav
