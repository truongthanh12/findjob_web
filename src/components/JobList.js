import React, { useState, useEffect } from "react";
import Member from "./Member";
import Partner from "./Partner";
import axios from "axios";
import HomeSection from "./HomeSection";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

const JobList = () => {
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
      console.log(result.data);  

    };
    fetchJobList();
  }, []);

  const onDelete = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      const { jobID } = JSON.parse(
        localStorage.getItem("dataLogged") || "{}"
      );
      if (willDelete) {
        axios.delete(
          `https://webjobfinder.azurewebsites.net/api/Job/Delete-job?jobID=${jobID}`
        );
        swal("Poof! Your imaginary file has been deleted!", {
          timer: 1500,
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!", {timer: 1500});
      }
    });
  };
  return (
    <div>
      <HomeSection />
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">job list</h2>
            </div>
          </div>
          {(jobList || []).map((item, index) => {
            return (
              <div className="mb-5" key={index}>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">
                      {item.companyName || ""}
                    </span>
                    <h2>
                      <NavLink to={`/job-detail/${item.jobID}`}>
                        <span className="icon-briefcase mr-2" />{" "}
                        {item.jobName || ""}
                      </NavLink>
                    </h2>
                    <h2 className="my-2">
                      <NavLink to={`/job-detail/${item.jobID}`}>
                        <span className="icon-room pr-2" /> {item.city || ""}
                      </NavLink>
                    </h2>
                    <p className="meta">
                      <strong>
                        Post: {item.postDate || ""}
                      </strong>
                      <br />
                      <strong>
                        Due Date: {item.requireDate || ""}
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-3 p-4">
                    Experience: {item.experience || ""}
                    <p>
                      <strong className="text-black">
                        {item.salary || ""}
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-3 text-md-right mt-3">
                    <p>
                      <NavLink to={`/job-detail/${item.jobID}`}>
                        <button className="btn-apply btn--info">
                          Detail Job
                        </button>
                      </NavLink>
                    </p>
                    <button
                      className="btn-apply btn--apply"
                      data-toggle="modal"
                      data-target="#DeleteModal"
                      onClick={onDelete}
                    >
                      Delete
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

      <section className="site-section py-4 mb-5 border-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center mt-4 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-7">
                  <h2 className="section-title mb-2">
                    Our Candidates Work In Company
                  </h2>
                  <p className="lead">
                    Porro error reiciendis commodi beatae omnis similique
                    voluptate rerum ipsam fugit mollitia ipsum facilis expedita
                    tempora suscipit iste
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_mailchimp.svg"
                alt="Image"
                className="img-fluid logo-1"
              />
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_paypal.svg"
                alt="Image"
                className="img-fluid logo-2"
              />
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_stripe.svg"
                alt="Image"
                className="img-fluid logo-3"
              />
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_visa.svg"
                alt="Image"
                className="img-fluid logo-4"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <Partner /> */}
      <Member />
    </div>
  );
};

export default JobList;
