import React from 'react'
import { NavLink } from "react-router-dom";

const JobListPage = () => {
    return (
      <div>
        <div>
          <section
            className="home-section section-hero inner-page overlay bg-image"
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">
                      Job Listings
                    </h1>
                    <p>
                      Find your dream jobs in our powerful career website
                      template.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">109,234 Job Listed</h2>
                </div>
              </div>
              <div className="mb-5">
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a href="job-single.html">
                      <img
                        src="images/featured-listing-1.jpg"
                        alt="Image"
                        className="img-fluid"
                      />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">
                      Freelancer
                    </span>
                    <h2>
                      <a href="job-single.html">Dropbox Product Designer</a>{" "}
                    </h2>
                    <p className="meta">
                      Publisher: <strong>John Stewart</strong> In:{" "}
                      <strong>Design</strong>
                    </p>
                  </div>
                  <div className="col-md-3 text-left">
                    <h3>Melbourn</h3>
                    <span className="meta">Australia</span>
                    <strong className="text-black">$60k — $100k</strong>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <div className="col-md-3 text-md-right">
                      <p>
                        <a href="job-single.html">
                          <NavLink to="/job-detail">
                            <button className="btn-apply btn--info">
                              Detail Job
                            </button>
                          </NavLink>
                        </a>
                      </p>
                      <button
                        className="btn-apply btn--apply"
                        data-toggle="modal"
                        data-target="#AcceptModal"
                      >
                        accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left">
                  <div className="custom-pagination ml-auto">
                    <a href="#" className="prev">
                      Previous
                    </a>
                    <div className="d-inline-block">
                      <a href="#" className="active">
                        1
                      </a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                    </div>
                    <a href="#" className="next">
                      Next
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
}

export default JobListPage
