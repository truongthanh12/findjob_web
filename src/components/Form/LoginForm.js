import React, { useState,useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";

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
    
    fetch("https://webjobfinder.azurewebsites.net/api/Account/Check", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setDataLogin(!login);
        swal({
          title: "Success",
          text: "Post your job!",
          button: "OK",
          icon: "success",
          timer: 1200,
        });
        console.log(res);
        localStorage.setItem("res", JSON.stringify(res));
        history.push("/");
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

  const [userData, setUserData] = useState();
  useEffect(() => {
    setUserData(localStorage.getItem("userData"));
  }, [localStorage.getItem("userData")]);
  window.onload = function () {
    if (localStorage) {
      document
        .getElementById("login-form")
        .addEventListener("submit", function () {
          var login = document.getElementById("login").value;
          localStorage.setItem("login", login);
          console.log(login)
        });
    }
  };
  return (
    <div className="login-form">
      <div id="login">
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
                  <h3 className="text-center text-info">Sign in</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">
                      Username:
                    </label>
                    <br />
                    <input
                      type="text"
                      name="accountID"
                      id="accountid"
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
                      type="text"
                      name="password"
                      id="password"
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
                    You don't have accout!
                    <NavLink to="/register" className="text-info">
                      Sign up
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
