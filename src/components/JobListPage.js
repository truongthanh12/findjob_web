import React, { useState, useEffect } from "react";
import Member from "./Member";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SkeletonJob from "./skeleton/SkeletonJob";
import BackTop from "./BackTop";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const JobList = () => {
  const [jobList, setJobList] = useState([]);
  const [totalJob, setTotalJob] = useState([]);

  // pagination load more
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [skeleton, setSkeleton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchJobList = async () => {
      setSkeleton(true)
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-all_jobs?page=${page}`
      );
      setJobList(result.data.data);
      setTotalJob(result.data);
      setTotalPages(result.data);
      setSkeleton(false)
    };
    fetchJobList();
  }, [page]);

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
  }, [accountID, avatarCompany.accountID]);

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
                <h1 className="text-white font-weight-bold">
                {t("header_menu_job.header_menu_job")}
                </h1>
                <p>
                {t("list_desc.list_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {skeleton ? (
        <SkeletonJob />
      ) : (
      <section className="site-section" id="searchResults">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">
                {jobList.length === 0 ? (
                  "Can't find what you are looking for"
                ) : (
                  <div>{totalJob.totalRecord} {t("home_mount_job.home_mount_job")} </div>
                  
                  )}
              </h2>
            </div>
          </div>
          <div>
            {(jobList || []).map((item, index) => {
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
                          <span className="icon-room pr-2" /> {item.city || ""}
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
                  <button className="btn-apply btn--info" onClick={onClickPage}>
                    {t("btn_more.btn_more")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      <BackTop />
      <Member />
    </div>
  );
};

export default JobList;
