import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    accountID: "",
    password: "",
  });
  const history = useHistory();
  const [dataLogin, setDataLogin] = useState([]);

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const login = {
      accountID: loginForm.accountID,
      password: loginForm.password,
    };

    axios
      .post(`https://webjobfinder.azurewebsites.net/api/Account/Check`, login, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("dataLogged", JSON.stringify(res.data.data));
          setDataLogin(loginForm);
          swal({
            title: "Success",
            text: "Login success!",
            button: "OK",
            icon: "success",
            timer: 1200,
          });
          
          setDataLogin([...dataLogin], res.data.data);
          history.push({
            pathname: "/",
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
      })

      .catch((error) => {
        swal({
          title: "Fail",
          text: "Failed!",
          button: "OK",
          icon: "warning",
          timer: 1200,
        });
      });
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
              <div>
                <div className="container">
                  <div
                    id="login-row"
                    className="row justify-content-center align-items-center "
                  >
                    <div id="login-column" className="col-md-6">
                      <div id="login-box" className="col-md-12">
                        <form
                          id="login-form"
                          className="form"
                          onSubmit={onSubmit}
                        >
                          <h2 className="text-center text-info">Sign in</h2>
                          <div className="form-group">
                            <div>
                              <label htmlFor="username" className="text-info">
                                Username:
                              </label>
                            </div>
                            <input
                              type="text"
                              name="accountID"
                              id="accountid"
                              required
                              className="form-control"
                              value={dataLogin.accountID}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password" className="text-info">
                              Password:
                            </label>
                            <br />
                            <input
                              type="password"
                              name="password"
                              id="password"
                              required
                              className="form-control"
                              value={dataLogin.password}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="remember-me" className="text-info">
                              <span>Remember me</span>&nbsp;
                              <span>
                                <input
                                  id="remember-me"
                                  name="remember-me"
                                  type="checkbox"
                                />
                              </span>
                            </label>
                            <br />
                            <input
                              style={{ margin: "auto", display: "block" }}
                              type="submit"
                              name="SUBMIT"
                              className="btn btn-info btn-md"
                              defaultValue="submit"
                            />
                          </div>
                          <div id="register-link" className="text-center pr-2">
                            You don't have accout! {""}
                            <NavLink to="/register" className="text-info">
                              {""}Sign up
                            </NavLink>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
