/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackTop from "./BackTop";

const ApplyList = () => {
  const { id } = useParams();
  const [jobApplied, setJobApplied] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

    const fetchJobApplied = async () => {
      axios
        .get(
          `https://webjobfinder.azurewebsites.net/api/Employee/Get-list-Employee-by-JobID?jobID=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setJobApplied(res.data.data);
          }
        })
        .catch((error) => {})
        .then(function () {
          // always executed
        });
    };
    fetchJobApplied();
  }, [id]);
  return (
    <div>
      <section
        className="home-section section-hero inner-page overlay bg-image"
        style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">Employees applied </h1>
                <p>
                  Find your dream jobs in our powerful career website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="text-center">
            <h2>
              {jobApplied.length === 0 ? (
                "No employee apply yet! Please wait"
              ) : (
                <div>{jobApplied.length} career opportunities </div>
              )}
            </h2>
          </div>

          <div className="mb-5">
            <div
              className="row d-flex align-items-center job-item border-bottom pb-3 mb-3 pt-3 mobile-none"
              style={{ color: "black", fontWeight: "bold" }}
            >
              <div className="col-md-1">STT</div>
              <div className="col-md-1">Avatar</div>
              <div className="col-md-7 text-center">Infomation Employee</div>
              <div className="col-md-3 text-md-right">Link</div>
            </div>
            {(jobApplied || []).map((item, index) => {
              return (
                <div
                  className="row d-flex align-items-center job-item border-bottom pb-3 mb-3 pt-3"
                  key={index}
                  style={{ color: "black" }}
                >
                  <div className="col-md-1">
                    <span className="badge px-2 py-1 mb-3">{index + 1} /</span>
                  </div>
                  <div className="col-md-1">
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "100%",
                        objectFit: "cover",
                      }}
                      src="https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                      alt="Image employee"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">
                      {item.employeeName}
                    </span>

                    <p> {item.phone}</p>
                  </div>
                  <div className="col-md-3">
                    Email:
                    <span> {item.email}</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <a href={item.cv} target="_blank">
                      Download CV
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <BackTop />
    </div>
  );
};

export default ApplyList;
