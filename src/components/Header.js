import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const onClickLogOut = () => {
    swal({
      title: "Are you sure log out?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        history.push("/");
        swal({
          title: "Success",
          text: "Logged out!",
          button: "OK",
          icon: "success",
          timer: 1200,
        });
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
  const colorWhite = {
    color: "white",
  };

  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const { employerID } = JSON.parse(
      localStorage.getItem("dataLogged") || "{}"
    );
    console.log(employerID);

    const fetchJobList = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}`
      );
      setJobList(result.data.data);
    };
    fetchJobList();
  }, []);

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
              <NavLink to="/home">Careers</NavLink>
            </div>
            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li>
                  <NavLink exact={true} to="/home">
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
                <div className="dropdown">
                  <span
                    className="pr-3"
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
                      }}
                      src="https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                      alt="avatar"
                    ></img>
                    {(jobList || []).map((item, index) => {
                      return (
                        <span className="dropdown-toggle pl-2 mb-2" key={index}>
                          {item.companyName}
                        </span>
                      );
                    })}
                  </span>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    style={{ marginTop: "10px", width: "70%" }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        borderBottom: "1px solid",
                        paddingBottom: "6px"
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
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ paddingTop: "6px" }}
                    >
                      <span
                        onClick={onClickLogOut}
                        className="text-black"
                        style={{ cursor: "pointer" }}
                      >
                        <span className="mr-4 icon-paper-plane" />
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
                {/* <NavLink
                  style={colorWhite}
                  to="/login"
                >
                  Sign in
                </NavLink>
                <NavLink style={colorWhite} to="/register" className="px-2">
                  Register
                </NavLink> */}

                <NavLink
                  to="/post-a-job"
                  className="btn btn-primary border-width-2 d-none d-lg-inline-block"
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
