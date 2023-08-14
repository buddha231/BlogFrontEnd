import { Link, useNavigate, useParams } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useRef, useState } from 'react';

const getCurrentDateTime = () => {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date
  const formattedDateTime = currentDate.toLocaleDateString(undefined, options);
  return formattedDateTime;

}
const CreateBlog = ({ present_time }) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    BlogService.createBlog(title, description, photo).then(
      (response) => {
        console.log(response.data);
        alert('Blog created successfully');
        navigate('/blogs/explore/')
      }, (error) => {
        console.error(error)
      }
    )

  }


  return (
    <main>
      <div className="container my-5 bg-light">
        <div className="row bg-theme py-3">
          <div id="blog-nav" className="col-md-4 col-6 d-flex align-items-center">
            <Link to={'/explore'} className="text-light blog__nav">
              Explore
            </Link>
          </div>
        </div>

        <div className="px-4 py-5">
          <h3 className="mb-4">Create Post</h3>

          <form onSubmit={() => { return false; }} encType="multipart/form-data">
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
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Publish Blog"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main >
  );
};

export default CreateBlog;
