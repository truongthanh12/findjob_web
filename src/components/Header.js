import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const colorWhite = {
    color: 'white',
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
      </div>{" "}
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
              <div className="ml-auto">
                <NavLink
                  style={colorWhite}
                  to="/login"
                  // className="btn btn-primary border-width-2 d-none d-lg-inline-block"
                >
                  Sign in
                </NavLink>
                <NavLink style={colorWhite} to="/register" className="px-2">
                  Register
                </NavLink>
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
