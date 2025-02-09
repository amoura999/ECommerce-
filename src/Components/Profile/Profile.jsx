import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner';

export default function Profile() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (token) {
      const data = jwtDecode(token);
      setName(data.name);
      setEmail(data.email);
    }
  }, []);

  if (name === null || email === null) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#ffffff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="container-fluid py-5 bg-dark-subtle">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="card bg-dark text-white border-0">
                <div className="card-body">
                  <div className="">
                    <div className="profile-photo me-4">
                      <img src={require('../../imgs/images/profile-pic.png')} alt="Profile" className="img-fluid rounded-circle w-25" />
                    </div>
                    <div>
                      <h2 className="card-title mb-0">{name}</h2>
                      <p className="card-text text-info fw-bold pointer">{email}</p>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#contactModal">Edit Profile</button>
                    </div>
                  </div>
                  <div className="desc main-color fw-light fs-5 pointer mt-4">
                    <p>Hi, I'm a Web Developer from Egypt. I have rich experience in web site design and building, and also I am good at web development. I love to talk with you about our unique.</p>
                    <p>My skills: HTML, CSS, SASS, Bootstrap, JavaScript, React, Redux, Node.js, Express.js, MongoDB, MySQL, Git, GitHub, Heroku, Netlify, Firebase, Figma, Adobe XD, Photoshop, Illustrator, and more.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="contactModalLabel">Edit Profile</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
