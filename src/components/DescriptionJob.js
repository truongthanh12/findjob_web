/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import BackTop from "./BackTop";
import SkeletonDescription from "./skeleton/SkeletonDescription";

const DescriptionJob = () => {
  // DescriptionJob
  const [skeleton, setSkeleton] = useState(false);
  const history = useHistory();

  const { token, employeeID, accountName, userType } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );
  const { id } = useParams();
  const [jobId, setJobId] = useState([]);
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/EmployeeJob/Get-listjob-employee-applied?employeeID=${employeeID}&page=1`
      );
      setJobList(result.data.listJob);
    };
    fetchJobList();
  }, [employeeID]);

  useEffect(() => {
    const getJobId = async () => {
      setSkeleton(true)
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-job-detail?jobID=${id}`
      );
      setJobId(result.data.data);
      setSkeleton(false)
    };
    getJobId();
  }, [id]);

  // apply job
  const handleSubmit = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

    const new_file = new FormData();
    // new_file.append("EmployeeName", applyForm.EmployeeName);
    // new_file.append("email", applyForm.email);
    // new_file.append("phone", applyForm.phone);
    // new_file.append("coverLetter", applyForm.coverLetter);
    new_file.append("JobId", id);
    new_file.append("EmployeeId", employeeID);
    new_file.append("CV", applyForm.CV);

    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/EmployeeJob/Apply-job`,
        new_file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            body: "formData",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          setApplyForm(!new_file);
          swal({
            title: "Success",
            text: "Applied success! Good luck",
            button: "OK",
            icon: "success",
            timer: 2000,
          });
        } else {
        }
      })

      .catch((error) => {
        swal({
          title: "Fail",
          text: "Failed!",
          button: "OK",
          icon: "warning",
          timer: 1200,
        });
      });
    };

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
        axios
          .delete(
            `https://webjobfinder.azurewebsites.net/api/Job/Delete-job?jobID=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              swal({
                title: "Success",
                text: "Deleted!",
                button: "OK",
                icon: "success",
                timer: 1200,
              });
              history.push("/");
              swal("Poof! Your imaginary file has been deleted!", {
                timer: 1500,
                icon: "success",
              });
            } else {
              
            }
          });
      } else {
      }
    });
  };

  // modal apply

  const [applyForm, setApplyForm] = useState({
    // EmployeeName: accountName,
    EmployeeId: employeeID,
    // email: "",
    // phone: "",
    // coverLetter: "",
    JobId: id,
    CV: null,
  });
  const handleChangeValue = (e) => {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.files[0] });
  };

  // getImage

  const [avatarCompany, setAvatarCompany] = useState({
    File: null,
    accountID: accountName,
  });

  const saveJob = () => {
    swal({
      title: "Warning",
      text: "hmm! Feature will be update later",
      button: "OK",
      icon: "warning",
      timer: 2200,
    });
  };

  const [jobApplied, setJobApplied] = useState([]);
  useEffect(() => {
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Employee/Get-employee-by-id?EmployeeID=${employeeID}`
      );
      setJobApplied(result.data.data);
    };
    fetchJobList();
  }, [employeeID]);

  const LoginToApply = () => {
    swal({
      title: "Unauthorized",
      text: "Please login with employee account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("dataLogged");
        history.push("/login");
        window.location.reload();
      } else {
        swal("Canceled!", { icon: "warning", time: 1300 });
      }
    });
  };
  return (
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
      {skeleton ? (
        <SkeletonDescription />
      ) : (
     <section className="site-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8 col-12 mb-4 mb-lg-0">
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
                      <span className="text-primary">{jobId.jobCategory}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {token ===  "" && (
              <div className="col-lg-4 col-12">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-block btn-light btn-md"
                      onClick={saveJob}
                    >
                      <span className="icon-heart-o mr-2 text-danger"></span>
                      Save Job
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      className="btn btn-block btn-primary btn-md"
                      onClick={LoginToApply}
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            )}
            {userType === "Employee" ? (
              <div className="col-lg-4 col-12">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-block btn-light btn-md"
                      onClick={saveJob}
                    >
                      <span className="icon-heart-o mr-2 text-danger"></span>
                      Save Job
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="#"
                      className="btn btn-block btn-primary btn-md"
                      data-toggle="modal"
                      data-target="#AcceptModal"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-4 col-12">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-block btn-light btn-md"
                      onClick={saveJob}
                    >
                      <span className="icon-heart-o mr-2 text-danger"></span>
                      Save Job
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="#"
                      className="btn btn-block btn-primary btn-md"
                      onClick={LoginToApply}
                    >
                      Apply Now
                    </a>
                  </div>
                  
                </div>
              </div>
            )}
            {/* {accountName === false && (
            <div className="col-lg-4 col-12">
              <div className="row">
                <div className="col-6">
                  <a
                    className="btn btn-block btn-light btn-md"
                    onClick={saveJob}
                  >
                    <span className="icon-heart-o mr-2 text-danger"></span>
                    Save Job
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="#"
                    className="btn btn-block btn-primary btn-md"
                    data-toggle="modal"
                    data-target="#AcceptModal"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          )} */}
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="mb-5">
                <figure className="mb-5">
                  <img
                    style={{ width: "100%" }}
                    src="https://salt.topdev.vn/1BcK47h8CrD7IgjKBORAzL3J8Ix0ZtPkA2qYj4-F7Ks/auto/500/357/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL3N0YXRpYy9hc3NldHMvZGVza3RvcC9pbWFnZXMvY29tcGFueS1zY2VuZS02LnBuZw/company-scene-6.png"
                    alt="Free Website Template by Free-Template.co"
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
                    <strong className="text-black">Email:</strong> {jobId.email}
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
                    <strong className="text-black">Employment Status:</strong>{" "}
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
      )}
      {/* Modal apply*/}
      <div
        className="modal fade"
        id="AcceptModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="AcceptModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="AcceptModalLabel">
                  Submit Curriculum Vitae Form
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row form-group">
                        <div className="col-md-12 mb-3">
                          <label className="text-black" htmlFor="CV">
                            Add Curriculum Vitae
                          </label>
                          <input
                            type="file"
                            id="CV"
                            name="CV"
                            defaultValue={applyForm.CV || ""}
                            onChange={(e) => handleFile(e)}
                          />
                          <div style={{ fontSize: "13px" }}>
                            <strong style={{ color: "red" }}>Note: </strong>-
                            The system currently supports only one uploaded file
                            in <span style={{ fontWeight: "bold" }}>.pdf</span>
                          </div>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-md-12">
                          <label
                            className="text-black"
                            name="fullname"
                            htmlFor="fullname"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="lname"
                            className="form-control"
                            name="JobId"
                            defaultValue={jobApplied.employeeName || ""}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <label className="text-black" htmlFor="phone">
                            Phone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="form-control"
                            name="phone"
                            defaultValue={jobApplied.phone || ""}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <label className="text-black" htmlFor="description">
                            Cover Letter
                          </label>
                          <textarea
                            name="coverLetter"
                            id="coverLetter"
                            cols={20}
                            rows={4}
                            className="form-control"
                            placeholder="Write your description here..."
                            defaultValue={jobApplied.coverLetter || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-apply btn--info">Cancel</button>
                <button
                  className="btn-apply btn--apply"
                  data-toggle="modal"
                  data-target="#AcceptModal"
                  onClick={handleSubmit}
                >
                  accept
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <BackTop />
    </div>
  );
};

export default DescriptionJob;
