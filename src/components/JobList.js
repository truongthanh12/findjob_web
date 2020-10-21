import React, { useState, useEffect } from "react";
import FindJobSignup from "./FindJobSignup";
import Member from "./Member";
import Partner from "./Partner";
import axios from "axios";
import HomeSection from "./HomeSection";
import { NavLink, useHistory } from "react-router-dom";

const JobList = () => {
  // const history = useHistory();

  // const getDataJob = useHistory();
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=0&page=3`
      );
      setJobList(result.data.data);
      console.log(result.data);
    };
    fetchJobList();
  }, []);

  // const getDataJob = useHistory();
  const [jobList2, setJobList2] = useState([]);

  useEffect(() => {
    const fetchJobList2 = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Employers/Get-employer-by-id?EmployerID=0`
      );
      setJobList2(result.data.data);
      console.log(result.data);
    };
    fetchJobList2();
  }, []);

  return (
    <div>
      <HomeSection />
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">12214124 job list</h2>
            </div>
          </div>
          {(jobList || []).map((item, index) => {

            return (
              <div className="mb-5">
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <img src={item.image} alt="Image" className="img-fluid" />
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">
                      {item.jobName || ""}
                    </span>
                    <h2>
                      <a href="job-single.html">
                        {/* {getDataJob.location.state.postJob?.jobCategoryName} */}
                      </a>
                    </h2>
                    <p className="meta">
                      Required:{" "}
                      <strong className="pr-2">
                        {/* {getDataJob.location.state.postJob?.titleName} */}
                      </strong>
                      <div>
                        <strong>
                          From: {item.postDate || ""} - To:{" "}
                          {item.requireDate || ""}
                          {/* {getDataJob.location.state.postJob?.requireDate} */}
                        </strong>
                      </div>
                    </p>
                  </div>
                  <div className="col-md-3 text-left">
                    {/* <h3>{getDataJob.location.state.postJob?.cityName}</h3> */}
                    <span className="meta">Australia</span>
                    <p>
                      <strong className="text-black">
                        {/* {getDataJob.location.state.postJob?.salary} */}
                      </strong>
                    </p>
                  </div>
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
            );
          })}
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
      <Partner />
      <Member />
      <FindJobSignup />
    </div>
  );
};

export default JobList;
