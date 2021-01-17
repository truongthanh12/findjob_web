import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { accountName, employerID, userType } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const history = useHistory();

  // const [infoUser, getInfoUser] = useEffect([])
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}&page=${page}`
      );
      setJobList(result.data.employer);
      setTotalPages(result.data);
    };
    fetchJobList();
  }, [employerID, page]);

  const onClickLogOut = () => {
    swal({
      title: "Are you sure log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("dataLogged");
        history.push("/");
        swal({
          title: "Success",
          text: "Post your job!",
          button: "OK",
          icon: "success",
          timer: 1200,
        });
        window.location.reload();
      } else {
        swal({
          title: "Fail",
          text: "Failed!",
          button: "OK",
          icon: "warning",
          timer: 1200,
        });
      }
    });
  };

  return (
    <div>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>
      {/* .site-mobile-menu */}
      {/* NAVBAR */}
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="site-logo col-6">
              <NavLink to="/">Careers</NavLink>
            </div>
            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li>
                  <NavLink exact={true} to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/job-listing">Job listing</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                {/* <li><a href="services.html">Services</a></li>
        <li><a href="blog.html">Blog</a></li> */}
                <li className="d-lg-none">
                  <NavLink to="/post-a-job">Post a job</NavLink>
                </li>
              </ul>
            </nav>
            <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
              <div
                className="ml-auto"
                style={{ display: "flex", alignItems: "center" }}
              >
                {accountName ? (
                  <div className="dropdown mr-3">
                    <div
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={
                          // jobList.image ||
                          "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                        }
                        alt="avatar"
                      ></img>
                      <span className="dropdown-toggle pl-2 mb-2">
                        {accountName}
                      </span>
                    </div>
                    {userType === "Employer" ?(
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      style={{ marginTop: "10px", width: "70%" }}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div>
                        <div
                          className="d-flex pl-2 align-items-center"
                          style={{
                            borderBottom: "1px solid",
                            paddingBottom: "6px",
                          }}
                        >
                          <NavLink to="/profile" className="text-black">
                            <img
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "100%",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                              src="https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                              alt="avatar"
                            ></img>
                            Profile
                          </NavLink>
                        </div>
                        <NavLink to="/job-posted" className="text-black">
                          <div
                            className="d-flex pl-2 align-items-center job-posted"
                            style={{
                              borderBottom: "1px solid",
                              paddingBottom: "6px",
                              paddingTop: "6px",
                            }}
                          >
                            <span className="text-black job-posted">
                              <i
                                className="fab fa-ups mr-2 pl-2"
                                style={{ fontSize: "22px", color: "#0062cc" }}
                              ></i>
                              Job posted
                            </span>
                          </div>
                        </NavLink>
                        <div
                          className="d-flex pl-2 align-items-center"
                          style={{ paddingTop: "6px" }}
                        >
                          <span
                            onClick={onClickLogOut}
                            className="text-black"
                            style={{ cursor: "pointer" }}
                          >
                            <i
                              className="fas fa-sign-out-alt mr-2 pl-2"
                              style={{ fontSize: "22px" }}
                            ></i>
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                    ) : (
                      <div
                      className="dropdown-menu dropdown-menu-right"
                      style={{ marginTop: "10px", width: "70%" }}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div>
                        <div
                          className="d-flex pl-2 align-items-center"
                          style={{
                            borderBottom: "1px solid",
                            paddingBottom: "6px",
                          }}
                        >
                          <NavLink to="/profile" className="text-black">
                            <img
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "100%",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                              src="https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                              alt="avatar"
                            ></img>
                            Profile
                          </NavLink>
                        </div>
                        <NavLink to="/job-applied" className="text-black">
                          <div
                            className="d-flex pl-2 align-items-center job-posted"
                            style={{
                              borderBottom: "1px solid",
                              paddingBottom: "6px",
                              paddingTop: "6px",
                            }}
                          >
                            <span className="text-black job-posted">
                              <i
                                className="fab fa-ups mr-2 pl-2"
                                style={{ fontSize: "22px", color: "#0062cc" }}
                              ></i>
                              Job Applied
                            </span>
                          </div>
                        </NavLink>
                        <div
                          className="d-flex pl-2 align-items-center"
                          style={{ paddingTop: "6px" }}
                        >
                          <span
                            onClick={onClickLogOut}
                            className="text-black"
                            style={{ cursor: "pointer" }}
                          >
                            <i
                              className="fas fa-sign-out-alt mr-2 pl-2"
                              style={{ fontSize: "22px" }}
                            ></i>
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                    )}
                  
                  </div>
                ) : (
                  <div
                    className="site-navigation"
                    style={{
                      position: "unset",
                      left: "unset",
                      transform: "unset",
                    }}
                  >
                    <div className="site-menu js-clone-nav d-none d-xl-block log-group">
                      <span className="pr-3">
                        <NavLink to="/login">Login</NavLink>
                      </span>

                      <span className="dropdown">
                        <NavLink to="/register" className="dropdown-toggle" id="dropdownRegister" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Register</NavLink>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownRegister">
                          <NavLink className="dropdown-item text-black" to="/register-user">Employee</NavLink>
                          <NavLink className="dropdown-item text-black" to="/register">Employer</NavLink>
                        </div>
                      </span>
                    </div>
                    
                  </div>
                )}

                <NavLink
                  to="/post-a-job"
                  className="btn btn-primary border-width-2 d-none d-lg-inline-block ml-2"
                >
                  <span className="mr-2 icon-paper-plane" />
                  Post a job
                </NavLink>
              </div>
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
              >
                <span className="icon-menu h3 m-0 p-0 mt-2" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
