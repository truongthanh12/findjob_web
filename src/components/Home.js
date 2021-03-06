/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import Member from "./Member";
import axios from "axios";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import BackTop from "./BackTop";
import SkeletonJob from "./skeleton/SkeletonJob";
import { Spinner } from "react-bootstrap";
import { Button } from "bootstrap";
import Oclock from "./oclock/Oclock";
import Toggle from "react-toggle";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [cityName, setCityName] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [salary, setSalary] = useState([]);
  const [totalJob, setTotalJob] = useState([]);
  const [skeleton, setSkeleton] = useState(false);

  const [loading, setLoading] = useState(false);
  // search
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    keyWord: "",
    city: "",
    jobType: "",
    salary: "",
    page: 0,
  });
  const { t } = useTranslation();

  const handleChange = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const search_job = {
      keyWord: searchTerm.keyWord,
      city: searchTerm.city,
      jobType: searchTerm.jobType,
      salary: searchTerm.salary,
      page: searchTerm.page,
    };
    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Job/Filter-list-job`,
        search_job,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        if (res && res.status === 200) {
          setSearchResults(res.data.data);

          window.scroll({
            top: 900,
            behavior: "smooth",
          });
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

  // getImage
  const { accountName } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const { accountID } = JSON.parse(
    localStorage.getItem("dataRegisted") || "{}"
  );

  const [avatarCompany, setAvatarCompany] = useState({
    File: null,
    accountID: accountName,
  });

  // get api file imgae
  const [getFile, setGetFile] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

    const fetchJobApplied = async () => {
      axios
        .get(
          `https://webjobfinder.azurewebsites.net/api/Employee/Get-image-by-AccountID?AccountID=${avatarCompany.accountID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setGetFile(res.data.data);
          }
        })
        .catch((error) => {})
        .then(function () {
          // always executed
        });
    };
    fetchJobApplied();
  }, [avatarCompany.accountID]);

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
    const fetchJobType = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/JobType/Get-list-jobtype`
      );
      setJobType(result.data.data);
    };
    fetchJobType();
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

  // pagination load more
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchJobList = async () => {
      setSkeleton(true);
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-all_jobs?page=${page}`
      );
      setSearchResults(result.data.data);
      // setPage(result.data);
      setTotalJob(result.data);
      setSkeleton(false);
      setTotalPages(result.data);
    };
    fetchJobList();
  }, []);

  const onClickPage = () => {
    setPage(page + 1);
    const fetchNewPage = async () => {
      setLoading(true);
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-all_jobs?page=${page}`
      );

      const cursorCurrent = window.pageYOffset;

      setSearchResults([...searchResults, ...result.data.data]);
      window.scrollTo(0, cursorCurrent);
      setLoading(false);
    };
    fetchNewPage();
  };
  return (
    <div>
      <section
        className="home-section section-hero overlay bg-image"
        style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">
                  {/* A Powerful Career Website */}
                  {t("home_title.home_title")}
                </h1>
                <p>{t("desc.desc")}</p>
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                className="search-jobs-form"
              >
                <div className="containerHomeSection">
                  <div className="row mb-5">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 mb-lg-0">
                      <p>
                        <input
                          type="text"
                          name="keyWord"
                          className="form-control form-control-lg"
                          placeholder= {t("home_ip-placeholder.home_ip-placeholder")}
                          value={searchTerm.keyWord}
                          onChange={(value) => handleChange(value)}
                        />
                      </p>

                      <select
                        name="city"
                        className="form-control"
                        required
                        value={searchTerm.city}
                        onChange={(value) => handleChange(value)}
                      >
                        <option selected disabled hidden>
                          {t("city.city")}
                        </option>
                        {cityName.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 mb-lg-0">
                      <p>
                        <select
                          className="form-control"
                          name="jobType"
                          required
                          value={searchTerm.jobType}
                          onChange={(value) => handleChange(value)}
                        >
                          <option selected disabled hidden>
                            {t("post_type.post_type")}
                          </option>
                          {jobType.map((value, index) => (
                            <option value={value} key={index}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </p>
                      <select
                        name="salary"
                        className="form-control"
                        required
                        value={searchTerm.salary}
                        onChange={(value) => handleChange(value)}
                      >
                        <option selected disabled hidden>
                          {t("salary.salary")}
                        </option>
                        {salary.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4 mb-lg-0 mt-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block text-white btn-search"
                      >
                        <span className="icon-search icon mr-2" />
                        {t("home_btn_search.home_btn_search")}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {skeleton ? (
        <SkeletonJob />
      ) : (
        <section className="site-section" id="searchResults">
          {/* <Oclock size={400} timeFormat="24hour" hourFormat="standard" /> */}

          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">
                  {searchResults.length === 0 ? (
                    "Can't find what you are looking for"
                  ) : (
                    <div>
                      {totalJob.totalRecord} 
                       {t("home_mount_job.home_mount_job")}
                    </div>
                  )}
                </h2>
              </div>
            </div>
            <div>
              {(searchResults || []).map((item, index) => {
                return (
                  <div className="mb-5" key={index}>
                    <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                      <div className="col-md-2">
                        <img
                          src={
                            item.image ||
                            "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                          }
                          alt="Image"
                          className="img-fluid"
                        />
                      </div>

                      <div className="col-md-4">
                        <NavLink to={`/job-detail/${item.jobID}`}>
                          <span className="badge badge-primary px-2 py-1 mb-3">
                            {item.companyName || ""}
                          </span>
                        </NavLink>
                        <h2>
                          <NavLink to={`/job-detail/${item.jobID}`}>
                            <span className="icon-briefcase mr-2" />{" "}
                            {item.jobName || ""}
                          </NavLink>
                        </h2>
                        <h2 className="my-2">
                          <NavLink to={`/job-detail/${item.jobID}`}>
                            <span className="icon-room pr-2" />{" "}
                            {item.city || ""}
                          </NavLink>
                        </h2>
                        <p className="meta">
                          <strong>
                            {t("home_date.home_date")} {item.postDate || ""}
                          </strong>
                          <br />
                          <strong>
                            {t("home_due_date.home_due_date")}{" "}
                            {item.requireDate || ""}
                          </strong>
                        </p>
                      </div>
                      <div className="col-md-3 p-4">
                        {t("home_exp.home_exp")} {item.experience || ""}
                        <p style={{ marginBottom: 0 }}>
                          <strong className="text-black">
                            {item.jobType || ""}
                          </strong>
                        </p>
                        <strong className="text-black">
                          {item.salary || ""}
                        </strong>
                      </div>
                      <div className="col-md-3 text-md-right mt-3">
                        <p>
                          <NavLink to={`/job-detail/${item.jobID}`}>
                            <button className="btn-apply btn--info">
                              {t("btn_detail.btn_detail")}
                            </button>
                          </NavLink>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row pagination-wrap">
              <div className="col-md-12 text-center">
                <div className="custom-pagination ml-auto">
                  {page < totalPages.totalPages && (
                    <button
                      className="btn-apply btn--info"
                      onClick={onClickPage}
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
                        <div>{t("btn_more.btn_more")}</div>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Member />
      <BackTop />
    </div>
  );
};

export default Home;
