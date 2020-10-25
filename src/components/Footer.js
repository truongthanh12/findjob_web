import React from 'react'

const Footer = () => {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="row mb-5">
            <div className="col-4 col-md-4 mb-4 mb-md-0">
              <h3>Company</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Resources</a>
                </li>
              </ul>
            </div>
            <div className="col-4 col-md-4 mb-4 mb-md-0">
              <h3>Support</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="col-4 col-md-4 mb-4 mb-md-0">
              <h3>Contact Us</h3>
              <div className="footer-social">
                <a href="#">
                  <span className="icon-facebook" />
                </a>
                <a href="#">
                  <span className="icon-twitter" />
                </a>
                <a href="#">
                  <span className="icon-instagram" />
                </a>
                <a href="#">
                  <span className="icon-linkedin" />
                </a>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
              <p>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="icon-heart-o" aria-hidden="true" /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer
