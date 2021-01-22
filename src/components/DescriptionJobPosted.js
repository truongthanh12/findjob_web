/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import BackTop from "./BackTop";
import LoadWait from "./skeleton/LoadWait";

const DescriptionJob = () => {
  const [waiting, setWaiting] = useState(false);
  // DescriptionJob
  const history = useHistory();

  const { token, userType } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const { id } = useParams();
  const [jobId, setJobId] = useState([]);
  useEffect(() => {
    const getJobId = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-job-detail?jobID=${id}`
      );
      setJobId(result.data.data);
    };
    getJobId();
  }, [id]);

  // Delete
  const onDelete = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setWaiting(true);
        axios.delete(
          `https://webjobfinder.azurewebsites.net/api/Job/Delete-job?jobID=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => {
          setWaiting(false)
          if (res.data.success) {
              history.push("/job-posted");
              swal("Poof! Your job has been deleted!", {
                timer: 1500,
                icon: "success",
              });
            } else {
            }
          })
          .catch(
            swal({
              title: "Fail",
              text: "You can't delete!",
              button: "OK",
              icon: "warning",
              timer: 2200,
            })
          );
      } else {
      }
    });
  };

  const saveJob = () => {
    swal({
      title: "Warning",
      text: "hmm! Feature will be update later",
      button: "OK",
      icon: "warning",
      timer: 2200,
    });
  };
  return (
    <div>
      {waiting ? (
        <LoadWait />
      ) : (
        <div>
          <section
            className="home-section section-hero inner-page overlay bg-image"
            style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-white font-weight-bold text-center">
                    {jobId.companyName}
                  </h1>
                  <p className="text-center">We are hiring {jobId.jobName}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-10 col-12 mb-4 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        jobId.image ||
                        "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                      }
                      alt="Image"
                      className="img-fluid pr-5 img-description"
                    />
                    <div className="info-company-description">
                      <h2>{jobId.companyName}</h2>
                      <div>
                        <span className="text-primary">
                          <span className="icon-briefcase mr-2"></span>
                          {jobId.jobName}
                        </span>
                        <br />
                        <span className="text-primary">
                          <span className="icon-room mr-2" />
                          {jobId.city}
                        </span>
                        <span className="m-2">
                          <span className="icon-clock-o mr-2" />
                          <span className="text-primary">{jobId.jobType}</span>
                        </span>
                        <span className="m-2">
                          <span className="icon-clock-o mr-2" />
                          <span className="text-primary">
                            {jobId.jobCategory}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-12">
                  {userType === "Employer" ? (
                    <div className="row">
                      <a
                        style={{ color: "#fff", cursor: "pointer" }}
                        onClick={onDelete}
                        className="btn btn-block btn-primary btn-md"
                        data-toggle="modal"
                        data-target="#AcceptModal"
                      >
                        Delete
                      </a>
                    </div>
                  ) : (
                    <div className="row">
                      <a
                        className="btn btn-block btn-light btn-md"
                        onClick={saveJob}
                      >
                        <span className="icon-heart-o mr-2 text-danger"></span>
                        Save Job
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7">
                  <div className="mb-5">
                    <figure className="mb-5">
                      <img
                        style={{ width: "100%" }}
                        src="https://salt.topdev.vn/1BcK47h8CrD7IgjKBORAzL3J8Ix0ZtPkA2qYj4-F7Ks/auto/500/357/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL3N0YXRpYy9hc3NldHMvZGVza3RvcC9pbWFnZXMvY29tcGFueS1zY2VuZS02LnBuZw/company-scene-6.png"
                        alt="Free Website"
                        className="img-fluid rounded"
                      />
                    </figure>
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-align-left mr-3" />
                      Job Description
                    </h3>
                    <span className="icon-check_circle mr-2 text-muted" />
                    {jobId.jobDescription}

                    <h3 className="h5 d-flex align-items-center my-4 mt-5 text-primary">
                      <span className="icon-turned_in mr-3"></span>
                      Job Requirements
                    </h3>
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>{jobId.experience}</span>
                    <br />
                    <span className="icon-check_circle mr-2 text-muted" />
                    {jobId.jobRequire}
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="bg-light p-3 border rounded mb-4">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                      Job Summary
                    </h3>
                    <ul className="list-unstyled pl-3 mb-0">
                      <li className="mb-2">
                        <strong className="text-black">Email:</strong>{" "}
                        {jobId.email}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Published on:</strong>{" "}
                        {jobId.postDate}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">DueDate on:</strong>{" "}
                        {jobId.requireDate}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Vacancy:</strong>{" "}
                        {jobId.jobName}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">
                          Employment Status:
                        </strong>{" "}
                        {jobId.jobType}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Experience:</strong>{" "}
                        {jobId.experience}(s)
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Job Location:</strong>{" "}
                        {jobId.address}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Salary:</strong>{" "}
                        {jobId.salary}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Gender:</strong> Any
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">
                          Application Deadline:
                        </strong>{" "}
                        {jobId.requireDate}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-light p-3 border rounded">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Share</h3>
                    <div className="px-3">
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-facebook" />
                      </a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-twitter" />
                      </a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-linkedin" />
                      </a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-pinterest" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      <BackTop />
    </div>
  );
};

export default DescriptionJob;
