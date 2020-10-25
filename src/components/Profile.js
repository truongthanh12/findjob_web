import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const { employerID } = JSON.parse(
      localStorage.getItem("dataLogged") || "{}"
    );
    console.log(employerID);

    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}`
      );
      setJobList(result.data.data);
      console.log(result.data.data);
    };
    fetchJobList();
  }, []);

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
                  <h1 className="text-white font-weight-bold">Profile page </h1>
                  <p>
                    Find your dream jobs in our powerful career website
                    template.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container emp-profile">
          {(jobList || []).map((item, index) => {
            return (
              <form method="post" key={index}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="profile-img">
                      <img
                        src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                        alt="user avatar"
                      />
                      <div className="file btn btn-lg btn-primary">
                        Change Photo
                        <input type="file" name="file" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="profile-head">
                      <h5>{item.companyName || ""}</h5>
                      <h6>{item.jobName || ""}</h6>
                      <span className="icon-room pr-2" />
                      {item.city || ""}
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Timeline
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="profile-work">
                      <p>WORK LINK</p>
                      <a href="">Website Link</a>
                      <br />
                      <a href="">Bootsnipp Profile</a>
                      <br />
                      <a href="">Web Designer</a>
                      <br />
                      <a href="">Web Developer</a>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <label>User Id</label>
                          </div>
                          <div className="col-md-6">
                            <p>{item.employerID || ""}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Name</label>
                          </div>
                          <div className="col-md-6">
                            <p>{item.companyName || ""}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p>kshitighelani@gmail.com</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div className="col-md-6">
                            <p>123 456 7890</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Profession</label>
                          </div>
                          <div className="col-md-6">
                            <p>{item.jobName || ""}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <label>Experience</label>
                          </div>
                          <div className="col-md-6">
                            <p>Expert</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Hourly Rate</label>
                          </div>
                          <div className="col-md-6">
                            <p>10$/hr</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Total Projects</label>
                          </div>
                          <div className="col-md-6">
                            <p>230</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>English Level</label>
                          </div>
                          <div className="col-md-6">
                            <p>Expert</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Availability</label>
                          </div>
                          <div className="col-md-6">
                            <p>6 months</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
