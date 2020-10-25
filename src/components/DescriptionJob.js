import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const DescriptionJob = () => {
  // DescriptionJob

  const { id } = useParams();
  const [jobId, setJobId] = useState([]);

  useEffect(() => {
    const getJobId = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-job-detail?jobID=${id}`
      );
      setJobId(result.data.data);
      console.log(result.data);
    };
    getJobId();
  }, []);

  // modal apply

  const [applyForm, setApplyForm] = useState({
    employeeName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobID: "",
    cv: "",
  });
  const handleChangeValue = (e) => {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
    console.log(e.target.value)
  };

  const handleFile = (e) => {
    setApplyForm({ cv: e.target.files[0] });
    console.log(e.target.value);
  };

  // apply job

  const handleSubmit = (e) => {
    e.preventDefault();

    let new_file = new FormData();
    new_file.append("employeeName", applyForm.employeeName);
    new_file.append("email", applyForm.email);
    new_file.append("phone", applyForm.phone);
    new_file.append("coverLetter", applyForm.coverLetter);
    new_file.append("jobID", applyForm.jobID);
    new_file.append("cv", applyForm.cv);

    console.log(new_file);

    fetch(
      `https://webjobfinder.azurewebsites.net/api/Employee/Apply-job?jobID=${id}`,
      {
        method: "POST",
        body: new_file,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      if (res && res.status === 200) {
        setApplyForm(!applyForm);
        swal({
          title: "Success",
          text: "Post your job!",
          button: "OK",
          icon: "success",
          timer: 1500,
        });
        console.log(res);
      } else {
        swal({
          title: "Fail",
          text: "Failed!",
          button: "OK",
          icon: "warning",
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <section
        className="home-section section-hero inner-page overlay bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-white font-weight-bold text-center">
                {jobId.jobName}
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="d-flex align-items-center">
                <div className="p-2 d-inline-block mr-3">
                  <img
                    style={{ width: "70%" }}
                    src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
                <div>
                  <h2>{jobId.companyName}</h2>
                  <div>
                    <span className="text-primary">{jobId.jobName}</span>
                    <br />
                    {/* <span className="ml-0 mr-2 mb-2">
                      <span className="icon-briefcase mr-2" />
                      Puma
                    </span> */}
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
            <div className="col-lg-4">
              <div className="row">
                <div className="col-6">
                  <a href="#" className="btn btn-block btn-light btn-md">
                    <span className="icon-heart-o mr-2 text-danger" />
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
                <p>{jobId.jobDescription}</p>
                {/* <p>
                    Velit unde aliquam et voluptas reiciendis non sapiente
                    labore, deleniti asperiores blanditiis nihil quia officiis
                    dolor vero iste dolore vel molestiae saepe. Id nisi,
                    consequuntur sunt impedit quidem, vitae mollitia!
                  </p> */}
              </div>
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-rocket mr-3" />
                  Responsibilities
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>Necessitatibus quibusdam facilis</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Velit unde aliquam et voluptas reiciendis n Velit unde
                      aliquam et
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>Commodi quae ipsum quas est itaque</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Deleniti asperiores blanditiis nihil quia officiis dolor
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-book mr-3" />
                  Education + Experience
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>{jobId.experience}</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Velit unde aliquam et voluptas reiciendis non sapiente
                      labore
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>Commodi quae ipsum quas est itaque</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Deleniti asperiores blanditiis nihil quia officiis dolor
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-turned_in mr-3" />
                  Other Benifits
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>Necessitatibus quibusdam facilis</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Velit unde aliquam et voluptas reiciendis non sapiente
                      labore
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>Commodi quae ipsum quas est itaque</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Deleniti asperiores blanditiis nihil quia officiis dolor
                    </span>
                  </li>
                </ul>
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
            <form action="post" onSubmit={handleSubmit}>
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
                          <label className="text-black" htmlFor="cv">
                            Add Curriculum Vitae
                          </label>
                          <input
                            type="file"
                            id="cv"
                            name="cv"
                            defaultValue={applyForm.cv || ""}
                            onChange={(value) => handleFile(value)}
                          />
                          <div style={{ fontSize: "12px" }}>
                            <strong style={{ color: "red" }}>Note: </strong>-
                            The system currently supports only one uploaded file
                            in .pdf
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
                            name="employeeName"
                            value={applyForm.employeeName || ""}
                            onChange={(value) => handleChangeValue(value)}
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
                            value={applyForm.phone || ""}
                            onChange={(value) => handleChangeValue(value)}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <label className="text-black" htmlFor="Locate">
                            Email
                          </label>
                          <input
                            type="text"
                            id="Locate"
                            className="form-control"
                            name="email"
                            value={applyForm.email || ""}
                            onChange={(value) => handleChangeValue(value)}
                          />
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-md-12">
                          <label className="text-black" htmlFor="description">
                            Job Description
                          </label>
                          <textarea
                            name="coverletter"
                            id="description"
                            cols={30}
                            rows={8}
                            className="form-control"
                            placeholder="Write your description here..."
                            value={applyForm.coverletter || ""}
                            onChange={(value) => handleChangeValue(value)}
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
                >
                  accept
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionJob;
