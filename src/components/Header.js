/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Header = () => {
  const { t } = useTranslation();
  const { accountName, employerID, userType } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );


  function handleChangeLanguage(lang) {
    i18next.changeLanguage(lang);
  }
  // const [toggle, setToggle] = React.useState(localStorage.getItem('toggle') === "true")
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
        <div className="site-mobile-menu-body">
          <ul className="site-menu js-clone-nav site-drop-menu">
            <li>
              <NavLink exact={true} to="/">
                {t("header_menu_home.header_menu_home")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/job-listing">
                {t("header_menu_job.header_menu_job")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                {t("header_menu_about.header_menu_about")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">{t("login.login")}: </NavLink>
            </li>
            <li>
              <NavLink to="/register-user">
                {t("register.register")}:{" "}
                {t("register_employee.register_employee")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                {t("register.register")}:{" "}
                {t("register_employer.register_employer")}
              </NavLink>
            </li>
            {userType === "Employer" ? (
              <NavLink
                to="/post-a-job"
                className="btn btn-primary border-width-2 ml-2"
              >
                <span className="mr-2 icon-paper-plane" />
                {t("button_post_job.button_post_job")}
              </NavLink>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
      {/* .site-mobile-menu */}
      {/* NAVBAR */}
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="site-logo col-6">
              <NavLink to="/">Careers</NavLink>
              <label className="switch">
        <input type="checkbox" id="togBtn" />
        <div className="slider round">
          {/* <span className="on" onClick={() => handleChangeLanguage("vn")}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAhFBMVEXIEC7///8BIWnFABjrvcEAHmgAAFnICSvKKD3HACalqb0AAGAABWHGACDEAACiqL/02NvUWWfehpD88vPEAA3eh5HEAAcAHGkAGGcAF2fTVGPUXGr99fbFABPGABkAEWUAAE7txcido7ve4OiRmLP29/rgkZry0tbPPlH56evadYHWYm+GvczdAAAG3ElEQVR4nO2dfXfTOgyHDaOMtex9K2NsF9bLGC/f//vdctsuiSslsvXmnqPfXzucUCtPbFmxHDn9uXgzpefVbDF7q6eP866tD8dpRMcfuivnHxVNmi3uVs+vTT38gIw5Wd6/pJOb+2mAb+ZvFQE2h2/dW867hq6vHk8heJdrbq9/OAJsDF8O7x8I3rbT9UhOAvykBLApfLPF5x68B6Tn7Ubs7h/OSENYxwc2hG/t8/o97/YGgtdjBRAd07nGEG4GH93n7eFLxElEAWAj+DJ4t0cjPg/AR/WB59JDuAl8s8Un8oSB4CMP4c+iABvAN1t87U8Ykz4PwUedRESHsDu+3OeB8MCRCdhoHkg748uG7e30hNHDd1pw8VBiPdAVHy1Ixnikh4Kummt+JwLQEV9ZkAzgK3GU+xKZhd3w5cMW7khjHNKGOm2aBgHyh7ATvvIgGcFHDRKVALrgqwmSUXy19LcAeUPYAd/w3fbhCoRHiIFT92fN2H+9F04gbY4vg8fw/ekra+bpxBjCxvjqg+Rc87tUsjg48WO1AE3x5T6v3mX9vd8k+YOVPdAQn3RnSdCPLuufSI0PNMOXLwyAHYW2cLztKAn+4XpnWjGEjfDlQXJ9J+lWnBLy45Y+0ASfRJC8hde7v4Q2gASSCj7QAJ/WBJnGGmHMSiVZOXV8UkHyfsdIYw1NZ5pGGqIDVManeU9pvDHJJ+WDT3dE7eHT8xMe+LT9OYBPa5ayx6cfTYD4dGIka3wWsSyCTyNCt8Vn8yaF4jP0gQr4rN7jR/BJr07Y4bOb/Ebxia6N4XGgMD5u9qzT9MQ3gW/PGI2snCg+UpBMW0EnpGEn8RkE0oL4BEMuUv6GgE8qK4UCFMOnbGctPuWnKoRvGKva5K6J+CQy8q/3nfsUEXxyQXJJ2pWMT3FGE8AnmT0rWasswKcWT7Hx+SW7ivDx9sKhhjLxeaZaC/GpDBMWvsznwS5FbcdsMT7RlYyNk2bgo60M6e3XrsAnvo5Wjc86SBbCJ7mKuwa4qMO3yGzw2KNYiU80kF6savCtFtY5GUl8khmsf2vw9f4Tp23ed3oMfJKBdAW+Dp7OMpo+PsmYqxYf4neNvlFm4pP0gTX4XPYj9vG95+vb++/dd//XV2egfj7J4/v1G26LAO/5+9psvtJkQ7aq8H2eCnwsBT6WAh9LgY+lwMdS4GMp8LEU+FgKfCyld03paQrfk7eFQ6WjtjRKb83P275M49aGQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhQ5f3HqVMh7bDynuH3FAHt7/Pe39mpkPbXeptQKbAx1LgYynwsRT4WAp8LAU+lgIfS4GPpUPDJ1BOYlBJA9PFJVz14vevwWUi+F5+wm1dXb9eIlVJQ7aOCw7v5mSfxulR74YE8a3b+7KE2nvstydSx8UE3hcQ3uMePMHBS3lgzlWEhjWscHhgT7gB4In6votLQg/0q2E1rKCG38QZdBPL/k1wK6hx2naqoEb1edM9QKJ+H9o+oec71O+TmzCkqkdybDCuHjmsXYoaTp39hGqXsgDa1S4dVs7FjQbhQX5HrHIubgvoA4dD2KZyLvWJTxusUbcZtQceCUvuEGZVDcfhFfkb0arhhQCZgTSjZr2YocI161G7FCaR6hMTCuGNhQriJybgAEGX8gi6FFl8ck7a4ryOQvuWtbNw1WkxuHFgz5sKEVROi0FtJLgW4dNilH2L4FlFChMbFx/x3bb+qaqdlIUDrBolNfiIEwbHpyie08axV+CcNrmFAa9TAlGbRRYTCs6oxOExFyaVz6gsBFgUSJNPSFU0Qv2EVNR29iRCPJ+3EN6y6FXI4HxeHCAhTi0/n9d0JcPkdGj8HjgdgHA2Od6wUPxkdDY5eh8M9wPgY8GrWcFQw6ffEfbwsYLkuhyCIj7t0CvljUkFnef0FKAqPt17SsOGDIJkc3yaIyr1G3FadFTHp+fPU9eA9izliU+rc6Tdj+vHSL74dGLZVPJkeBG6Nz6NN6nkmWixxif/Hp8803z2+KRXkRKjO0tttDHFJxqe3RH2NpNWZqu2OPjgkwykJ/HJ5QXawSeXv5nAp7u9yw+flA8cxSebE20Ln0xWbgSfdEa+NXwSgTSKT34/SHv4+Fk5BJ+Jz9vJER8zkD4F8Vl9VLKVKz7e1g4An9ZOTFTO+Fjv/KSLRPYBo3LHx1hxyi/Q24WOqgF81eudxfAkh+1GTeCrDKRHyG7giX2Bg6oRfFWBdPeP2t9/oWoGX8ViAkC0gyf69SGqhvAVB9IbeBbfvqJqCl/hN8rmQfK+GsNXNIm83EPw0vGP3nf/Kx2ft1Nz+P73gStCfYY//wEigYBdwuNHrgAAAABJRU5ErkJggg==" alt="EN"/> EN</span>
          <span className="off" onClick={() => handleChangeLanguage("en")}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png" alt="Viet Nam"/> VN</span> */}
          <span className="on" onClick={() => handleChangeLanguage("vn")}>
            VN
          </span>
          <span className="off" onClick={() => handleChangeLanguage("en")}>
            EN
          </span>
        </div>
      </label>

            </div>
            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li>
                  <NavLink exact={true} to="/">
                    {t("header_menu_home.header_menu_home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/job-listing">
                    {t("header_menu_job.header_menu_job")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about">
                    {t("header_menu_about.header_menu_about")}
                  </NavLink>
                </li>
                <li className="d-lg-none">
                  <NavLink to="/post-a-job">
                    {t("button_post_job.button_post_job")}
                  </NavLink>
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
                    {userType === "Employer" ? (
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
                              {t("profile_text.profile_text")}
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
                                {t("job_posted1.job_posted1")}
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
                              {t("logout.logout")}
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
                              {t("profile_text.profile_text")}
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
                                {t("applied.applied")}
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
                              {t("logout.logout")}
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
                        <NavLink to="/login">{t("login.login")}</NavLink>
                      </span>

                      <span className="dropdown">
                        <NavLink
                          to="/register"
                          className="dropdown-toggle"
                          id="dropdownRegister"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {t("register.register")}
                        </NavLink>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownRegister"
                        >
                          <NavLink
                            className="dropdown-item text-black"
                            to="/register-user"
                          >
                            {t("register_employee.register_employee")}
                          </NavLink>
                          <NavLink
                            className="dropdown-item text-black"
                            to="/register"
                          >
                            {t("register_employer.register_employer")}
                          </NavLink>
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
                  {t("button_post_job.button_post_job")}
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
