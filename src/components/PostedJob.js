import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import BackTop from "./BackTop";

const PostedJob = () => {
  const { employerID } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

  //get images
  const [getAvatar, setGetAvatar] = useState([]);

  // get job by employerID
  const [jobList, setJobList] = useState([]);
  const [totalJob, setTotalJob] = useState([]);
  // pagination load more

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}&page=${page}`
      );
      setJobList(result.data.listJob);
      console.log(result.data);
      setTotalJob(result.data);
      setTotalPages(result.data);
      setGetAvatar(result.data.employer);
    };
    fetchJobList();
  }, [employerID]);

  // Delete
  //   const onDelete = () => {
  //     swal({
  //       title: "Are you sure?",
  //       text:
  //         "Once deleted, you will not be able to recover this imaginary file!",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         axios
  //           .delete(
  //             `https://webjobfinder.azurewebsites.net/api/Job/Delete-job?jobID=${id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             if (res.data.success) {
  //               swal({
  //                 title: "Success",
  //                 text: "Post your job!",
  //                 button: "OK",
  //                 icon: "success",
  //                 timer: 1200,
  //               });
  //               history.push("/");
  //               swal("Poof! Your imaginary file has been deleted!", {
  //                 timer: 1500,
  //                 icon: "success",
  //               });
  //             } else {
  //             }
  //           });
  //       } else {
  //         swal("Your imaginary file is safe!", { timer: 1500 });
  //       }
  //     });
  //   };

  const onClickPage = () => {
    setPage(page + 1);
    const fetchNewPage = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}&page=${page}`
      );

      const cursorCurrent = window.pageYOffset;

      // setJobList([...jobList, ...result.data.data]);
      window.scrollTo(0, cursorCurrent);
    };
    fetchNewPage();
  };

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
                <h1 className="text-white font-weight-bold">Job posted page</h1>
                <p>
                  Find your dream jobs in our powerful career website template.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2 pt-5">
                {jobList.length === 0 ? (
                  "No job posted yet! Post now"
                ) : (
                  <div>You posted {totalJob.totalRecord} jobs </div>
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
                        getAvatar.image ||
                        "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                      }
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>

                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">
                      {getAvatar.companyName || ""}
                    </span>
                    <h2>
                      <NavLink to={`/job-detail-posted/${item.jobID}`}>
                        <span className="icon-briefcase mr-2" />{" "}
                        {item.jobName || ""}
                      </NavLink>
                    </h2>
                    <h2 className="my-2">
                      <NavLink to={`/job-detail-posted/${item.jobID}`}>
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
                    <p style={{ marginBottom: 0 }}>
                      <strong className="text-black">
                        {item.jobType || ""}
                      </strong>
                    </p>
                    <p>
                      <strong className="text-black">
                        {item.salary || ""}
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-3 text-md-right mt-3">
                    <p>
                      <NavLink to={`/job-detail-posted/${item.jobID}`}>
                        <button className="btn-apply btn--info">
                          Detail Job
                        </button>
                      </NavLink>
                    </p>
                    <NavLink to={`/job-applied/${item.jobID}`}>
                      <button className="btn-apply btn--apply">
                        Aplied list
                      </button>
                    </NavLink>
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
      <BackTop />
    </div>
  );
};

export default PostedJob;
