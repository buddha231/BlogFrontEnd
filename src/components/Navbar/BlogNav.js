
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useState } from 'react';
function BlogNav() {
    return (
        <div className="row bg-theme py-3">
            {/* <div id="blog-nav" className="col-md-4 col-6 d-flex align-items-center">
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
            <div className="col-md-8 col-6 text-right d-flex justify-content-end">
                <Link to="/blogs/create" className="btn btn-danger mr-3">
                    <i className="fas fa-pen"></i>
                    Create Blog
                </Link>
            </div> */}
        </div>
    )
}

export default BlogNav
