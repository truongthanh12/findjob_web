import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

const PostJobForm = () => {
  const { accountName } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const [cityName, setCityName] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [position, setPosition] = useState([]);
  const [salary, setSalary] = useState([]);

  const [dataForm, setDataForm] = useState({
    jobName: "",
    jobDescription: "",
    salary: "",
    experience: "",
    jobTypeName: "",
    jobCategoryName: "",
    cityName: "",
    titleName: "",
    requireDate: "",
    // logo: "",
    // jobTitle: "",
    jobRequire: "",
    employerID: "",
  });

  const history = useHistory();

  const [postJob, setPostJob] = useState([]);
  const [dataFormAddEmail, setDataFormAddEmail] = useState({
    address: "",
  });
  const [logoCompany, setLogoCompany] = useState({
    logo: "",
  });

  const handleChangeLogo = (e) => {
    setLogoCompany({ ...logoCompany, [e.target.name]: e.target.files[0] });
  };
  const handleChangeValue = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    setDataFormAddEmail({
      ...dataFormAddEmail,
      [e.target.name]: e.target.value,
    });
  };

  // post job

  const handleSubmit = (e) => {
    e.preventDefault();
    const { employerID, token } = JSON.parse(
      localStorage.getItem("dataLogged") || "{}"
    );
    
    const post_job = {
      jobName: dataForm.jobName,
      jobDescription: [dataForm.jobDescription],
      jobRequire: [dataForm.jobRequire],
      salary: dataForm.salary,
      requireDate: dataForm.requireDate,
      experience: dataForm.experience,
      employerID: employerID,
      titleName: dataForm.titleName,
      jobCategoryName: dataForm.jobCategoryName,
      jobTypeName: dataForm.jobTypeName,
      cityName: dataForm.cityName,
      logo: dataForm.logo,
      jobTitle: dataForm.jobTitle,
    };

    fetch("https://webjobfinder.azurewebsites.net/api/Job/Add-jobs", {
      method: "POST",
      body: JSON.stringify(post_job),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setPostJob(post_job);
        swal({
          title: "Success",
          text: "Post your job!",
          button: "OK",
          icon: "success",
          timer: 1500,
        });
        history.push("/", { postJob: post_job });
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

  // get api select
  useEffect(() => {
    const fetchCity = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/City/Get-list-city`
      );
      setCityName(result.data.data);
    };
    fetchCity();
  }, []);

  useEffect(() => {
    const fetchSalary = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-list-Salary-for-add-job`
      );
      setSalary(result.data.data);
    };
    fetchSalary();
  }, []);

  useEffect(() => {
    const fetchPosition = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/JobCategory/Get-list-Category`
      );
      setPosition(result.data.data);
    };
    fetchPosition();
  }, []);

  useEffect(() => {
    const fetchEmployeeType = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Title/Get-list-Title`
      );
      setEmployeeType(result.data.data);
    };
    fetchEmployeeType();
  }, []);

  useEffect(() => {
    const fetchJobType = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/JobType/Get-list-jobtype`
      );
      setJobType(result.data.data);
    };
    fetchJobType();
  }, []);
  return (
    <div>
      <section
        className="home-section section-hero inner-page overlay bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          {accountName ? (
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">
                    Post Your Jobs
                  </h1>
                  <p>You want to have partners to accompany you?</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">
                    Please log in when posting job
                  </h1>
                  <div className="col-md-12 text-center">
                    <NavLink to="/login">
                      <button className="btn-apply btn--apply">Log in</button>
                    </NavLink>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {accountName ? (
        <section className="site-section" id="next-section">
          <div className="container">
            <form method="post">
              <div className="row">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="lname">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        required
                        className="form-control"
                        placeholder="Enter your company name"
                        value={postJob.jobTitle}
                        onChange={(value) => handleChangeValue(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="lname">
                        Job Name
                      </label>
                      <input
                        type="text"
                        name="jobName"
                        required
                        className="form-control"
                        placeholder="Enter your Job Name"
                        value={postJob.jobName}
                        onChange={(value) => handleChangeValue(value)}
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="typejob">
                        Job Type
                      </label>
                      <select
                        className="form-control"
                        name="jobTypeName"
                        required
                        value={postJob.jobTitle}
                        onChange={(value) => handleChangeValue(value)}
                      >
                        <option selected disabled hidden>
                          Choose here
                        </option>
                        {jobType.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-6">
                      <label className="text-black">Employee Type</label>
                      <select
                        className="form-control"
                        name="titleName"
                        required
                        value={postJob.titleName}
                        onChange={(value) => handleChangeValue(value)}
                      >
                        <option selected disabled hidden>
                          Choose here
                        </option>
                        {employeeType.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="text-black">Category</label>
                      <select
                        className="form-control"
                        name="jobCategoryName"
                        required
                        value={postJob.jobCategoryName}
                        onChange={(value) => handleChangeValue(value)}
                      >
                        <option selected disabled hidden>
                          Choose position
                        </option>
                        {position.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="description">
                        Job Requirements
                      </label>
                      <textarea
                        name="jobRequire"
                        id="jobRequire"
                        cols={30}
                        rows={8}
                        required
                        className="form-control"
                        placeholder="Write your description here..."
                        value={postJob.jobRequire}
                        onChange={(value) => handleChangeValue(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="experience">
                        Experience
                      </label>
                      <input
                        type="subject"
                        name="experience"
                        className="form-control"
                        placeholder="2 years...."
                        value={postJob.experience}
                        onChange={(value) => handleChangeValue(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="requireDate">
                        DueDate
                      </label>
                      <input
                        required
                        type="date"
                        name="requireDate"
                        className="form-control"
                        placeholder="Date"
                        value={postJob.requireDate}
                        onChange={(value) => handleChangeValue(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="city">
                        City
                      </label>
                      <select
                        name="cityName"
                        className="form-control"
                        required
                        value={postJob.cityName}
                        onChange={(value) => handleChangeValue(value)}
                      >
                        <option selected disabled hidden>
                          Choose city
                        </option>
                        {cityName.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="salary">
                        Salary
                      </label>
                      <select
                        name="salary"
                        className="form-control"
                        required
                        value={postJob.salary}
                        onChange={(value) => handleChangeValue(value)}
                      >
                        <option selected disabled hidden>
                          Choose salary
                        </option>
                        {salary.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="description">
                        Job Description
                      </label>
                      <textarea
                        name="jobDescription"
                        id="description"
                        cols={30}
                        rows={8}
                        className="form-control"
                        required
                        placeholder="Write your description here..."
                        value={postJob.jobDescription}
                        onChange={(value) => handleChangeValue(value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p>{postJob.requireDate}</p>
              <p>{postJob.jobDescription}</p>
              <div className="row form-group">
                <div className="col-md-12 mt-3 text-center">
                  <input
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary btn-md text-white"
                    style={{ padding: "1rem 3rem" }}
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default PostJobForm;
