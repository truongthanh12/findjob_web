import React, { useState, useEffect } from "react";
import Member from "./Member";
import axios from "axios";
import { NavLink } from "react-router-dom";

const JobList = () => {
  const [jobList, setJobList] = useState([]);
  const [totalJob, setTotalJob] = useState([]);

  // pagination load more
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-all_jobs?page=${page}`
      );
      setJobList(result.data.data);
      // setPage(result.data);
      setTotalJob(result.data);
      console.log(result.data);
      setTotalPages(result.data);
    };
    fetchJobList();
  }, []);

  const onClickPage = () => {
    setPage(page + 1);
    const fetchNewPage = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-all_jobs?page=${page}`
      );

      const cursorCurrent = window.pageYOffset;

      setJobList([...jobList, ...result.data.data]);
      window.scrollTo(0, cursorCurrent);
    };
    fetchNewPage();
  };

  // getImage
  const { accountName } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const { accountID } = JSON.parse(
    localStorage.getItem("dataRegisted") || "{}"
  );
  console.log(accountID);
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
          `https://webjobfinder.azurewebsites.net/api/Employee/Get-image-by-AccountID?AccountID=${accountID}`,
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
  }, [accountID]);

  return (
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
                <h1 className="text-white font-weight-bold">JobList</h1>
                <p>You want to have partners to accompany you?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">
                {jobList.length === 0 ? (
                  "No job yet! Add now"
                ) : (
                  <div>{totalJob.totalRecord} career opportunities </div>
                )}
              </h2>
            </div>
          </div>
          {(jobList || []).map((item, index) => {
            return (
              <div className="mb-5" key={index}>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <img
                      src={
                        getFile.image ||
                        "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                      }
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
                      <strong>Post: {item.postDate || ""}</strong>
                      <br />
                      <strong>Due Date: {item.requireDate || ""}</strong>
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
                    <p>
                      <NavLink to={`/job-applied/${item.jobID}`}>
                        <button className="btn-apply btn--apply">
                          Aplied list
                        </button>
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="row pagination-wrap">
            <div className="col-md-12 text-center">
              <div className="custom-pagination ml-auto">
                {page < totalPages.totalPages && (
                  <button className="btn-apply btn--info" onClick={onClickPage}>
                    Load More...
                  </button>
                )}
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
      <Member />
    </div>
  );
};

export default JobList;
