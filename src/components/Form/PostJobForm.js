import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import FormPostJobDetail from "./FormPostJobDetail";
import { Spinner } from "react-bootstrap";
import SelectField from "../custom-field/SelectField";

const PostJobForm = (props) => {
=======
import SkeletonPost from "../skeleton/SkeletonPost";
import { Spinner } from "react-bootstrap";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const PostJobForm = () => {
  const { t } = useTranslation();
>>>>>>> 80d86b7f5e39fad20d3971882f87d5e5e918c42b
  const { accountName, userType } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const [skeleton, setSkeleton] = useState(false);
>>>>>>> 80d86b7f5e39fad20d3971882f87d5e5e918c42b
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
    setLoading(true);
    e.preventDefault();
    const { employerID, token } = JSON.parse(
      localStorage.getItem("dataLogged") || "{}"
    );
    setLoading(true);
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
        setLoading(false);
      }
      setLoading(false);
    });
  };

  // get api select
  useEffect(() => {
    const fetchCity = async () => {
      setSkeleton(true);
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/City/Get-list-city`
      );
      setCityName(result.data.data);
      setSkeleton(false);
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
      {skeleton ? (
        <SkeletonPost />
      ) : (
        <div>
          <section
            className="home-section section-hero inner-page overlay bg-image"
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              {userType === "Employer" && (
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12">
                    <div className="mb-5 text-center">
                      <h1 className="text-white font-weight-bold">
                        {t("post.post")}
                      </h1>
                      <p>{t("desc.desc")}</p>
                    </div>
                  </div>
                </div>
              )}
              {!userType && (
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12">
                    <div className="mb-5 text-center">
                      <h2 className="text-white font-weight-bold">
                        {t("Post_warning.Post_warning")}
                      </h2>
                      <div className="col-md-12 text-center">
                        <NavLink to="/login">
                          <button className="btn-apply btn--apply">
                            {t("login.login")}
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              )}
              {userType === "Employee" && (
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12">
                    <div className="mb-5 text-center">
                      <h2 className="text-white font-weight-bold">
                        {t("alert_login_acc_emp.alert_login_acc_emp")}
                      </h2>
                      <div className="col-md-12 text-center">
                        <NavLink to="/login">
                          <button className="btn-apply btn--apply">
                            {t("login.login")}
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {userType === "Employer" ? (
            <section className="site-section" id="next-section">
              <div className="container">
                <form method="post">
                  <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                      <div className="row form-group">
                        <div className="col-md-12">
                          <label className="text-black" htmlFor="lname">
                            {t("company_name.company_name")}
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
                            {t("post_job.post_job")}
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
                      {/* <label className="text-black" htmlFor="typejob">
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
                      </select> */}
                      <SelectField name={"jobTypeName"} value={postJob.jobTitle} label={"Job Type"} options={jobType} defaultValue={"choose"} />
                    </div>
                  </div>

                      <div className="row form-group">
                        <div className="col-md-6">
                          <label className="text-black">
                            {t("post_empp_type.post_empp_type")}
                          </label>
                          <select
                            className="form-control"
                            name="titleName"
                            required
                            value={postJob.titleName}
                            onChange={(value) => handleChangeValue(value)}
                          >
                            <option selected disabled hidden>
                              {t("choose.choose")}
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
                              {t("choose.choose")}
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
                            {t("desc_req.desc_req")}
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
                            {t("home_exp.home_exp")}
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
                            {t("home_due_date.home_due_date")}
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
                            {t("city.city")}
                          </label>
                          <select
                            name="cityName"
                            className="form-control"
                            required
                            value={postJob.cityName}
                            onChange={(value) => handleChangeValue(value)}
                          >
                            <option selected disabled hidden>
                              {t("choose.choose")}
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
                            {t("salary.salary")}
                          </label>
                          <select
                            name="salary"
                            className="form-control"
                            required
                            value={postJob.salary}
                            onChange={(value) => handleChangeValue(value)}
                          >
                            <option selected disabled hidden>
                              {t("choose.choose")}
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
                            {t("desc_job.desc_job")}
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
                      <button
                        onClick={handleSubmit}
                        className="btn-apply btn--info"
                      >
                        {loading ? (
                          <div variant="primary">
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            {t("loading.loading")}
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostJobForm;
