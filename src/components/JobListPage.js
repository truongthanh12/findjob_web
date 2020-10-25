import React, { useState, useEffect } from "react";
import FindJobSignup from "./FindJobSignup";
import Member from "./Member";
import Partner from "./Partner";
import axios from "axios";
import HomeSection from "./HomeSection";
import { NavLink, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

const JobList = () => {
  const { id } = useParams();
  // console.log(id)
  // const history = useHistory();

  // const getDataJob = useHistory();
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const { employerID } = JSON.parse(
      localStorage.getItem("dataLogged") || "{}"
    );
    console.log(employerID);
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}&page=1`
      );
      setJobList(result.data.data);
      console.log(result.data);
    };
    fetchJobList();
  }, []);

  // set Page
  // const [listData, setListData] = useState([]);

  // const [page, setPage] = useState(1);
  // const fetchData = () => {
  //   axios
  //     .post(
  //       `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}page=1`,
  //       {
  //         page: page,
  //         size: 5,
  //         id: 0,
  //         type: "dfsd",
  //         keyword: "stdsfsring",
  //       }
  //     )
  //     .then((res) => {
  //       setListData(listData.concat(res.data.data.data));
  //       setPage(page + 1);
  //     });
  // };

  const onDelete = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
       const { employerID } = JSON.parse(
         localStorage.getItem("dataLogged") || "{}"
       );
      if (willDelete) {
        axios.delete(
          `https://webjobfinder.azurewebsites.net/api/Job/Delete-job?jobID=${employerID}`
        );
        swal("Poof! Your imaginary file has been deleted!", {
          timer: 1500,
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!", { timer: 1500 });
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
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">
                  Job Listings
                </h1>
                <p>
                  Find your dream jobs in our powerful career website template.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">12214124 job list</h2>
            </div>
          </div>
          {(jobList || []).map((item, index) => {
            return (
              <div className="mb-5" key={index}>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">
                      {item.companyName || ""}
                    </span>
                    <h2>
                      <NavLink exact={true} to="/job-detail">
                        {/* {getDataJob.location.state.postJob?.jobCategoryName} */}
                        <span className="icon-briefcase mr-2" />{" "}
                        {item.jobName || ""}
                      </NavLink>
                    </h2>
                    <h2 className="my-2">
                      <NavLink exact={true} to="/job-detail">
                        {/* {getDataJob.location.state.postJob?.jobCategoryName} */}
                        <span className="icon-room pr-2" /> {item.city || ""}
                      </NavLink>
                    </h2>
                    <p className="meta">
                      Date:{" "}
                      <strong className="pr-2">
                        {/* {getDataJob.location.state.postJob?.titleName} */}
                      </strong>
                      <strong>
                        From: {item.postDate || ""} - To:{" "}
                        {item.requireDate || ""}
                        {/* {getDataJob.location.state.postJob?.requireDate} */}
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-3">
                    Experience: {item.experience || ""}
                    {/* <h3>{getDataJob.location.state.postJob?.cityName}</h3> */}
                    {/* <span className="meta">Australia</span> */}
                    <p>
                      <strong className="text-black">
                        {/* {getDataJob.location.state.postJob?.salary} */}
                        {item.salary || ""}
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <p>
                      <NavLink to={`/job-detail/${item.jobID}`}>
                        <button className="btn-apply btn--info">
                          Detail Job
                        </button>
                      </NavLink>
                    </p>
                    <button
                      className="btn-apply btn--apply"
                      data-toggle="modal"
                      data-target="#DeleteModal"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="row pagination-wrap">
            <div className="col-md-6 text-center text-md-left">
              <div className="custom-pagination ml-auto">
                <a href="#" className="prev">
                  Previous
                </a>
                <div className="d-inline-block">
                  <a href="#" className="active">
                    1
                  </a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">4</a>
                </div>
                <a href="#" className="next">
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Partner />
      <Member />
    </div>
  );
};

export default JobList;
