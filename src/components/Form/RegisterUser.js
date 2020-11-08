import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Register = () => {
  const [cityName, setCityName] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    accountID: "",
    password: "",
    email: "",
    employeeName: "",
    phone: "",
    coverLetter: ""
  });
  const history = useHistory();
  const [dataRegister, setDataRegister] = useState([]);

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const register = {
      accountID: registerForm.accountID,
      password: registerForm.password,
      email: registerForm.email,
      employeeName: registerForm.employeeName,
      phone: registerForm.phone,
      coverLetter: registerForm.coverLetter,
    };

    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Account/Create-Account-Employee`,
        register,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res) {
          setDataRegister(register);
          swal({
            title: "Success",
            text: "Register success! Log in now",
            button: "OK",
            icon: "success",
            timer: 1200,
          });
          
          history.push("/login");
          localStorage.setItem("dataRegisted", res.config.data);
        } else {
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
                          onSubmit={handleSubmit}
                        >
                         <h2 className="text-center text-info pb-2">Register for employee</h2>
                          <div style={{display: "flex", justifyContent: "center", fontSize: "20px"}}>
                            <NavLink to="/register" className="text-center text-info">For employer</NavLink>
                          </div>
                          <p className="text-center pt-2" style={{fontSize: "15px"}}>
                            Please enter all the field below, the system will
                            save your data when you post a job.
                          </p>
                          <div className="form-group">
                            <label htmlFor="username" className="text-info">
                              Username:
                            </label>
                            <br />
                            <input
                              type="text"
                              name="accountID"
                              id="username"
                              required
                              className="form-control input-special"
                              value={dataRegister.accountID}
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
                              className="form-control input-special"
                              value={dataRegister.password}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email" className="text-info">
                              Email
                            </label>
                            <br />
                            <input
                              type="text"
                              name="email"
                              id="email"
                              required
                              className="form-control input-special"
                              value={dataRegister.email}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="employeeName" className="text-info">
                              Full Name
                            </label>
                            <br />
                            <input
                              type="text"
                              name="employeeName"
                              id="employeeName"
                              required
                              className="form-control input-special"
                              value={dataRegister.employeeName}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone" className="text-info">
                              Phone
                            </label>
                            <br />
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              required
                              className="form-control input-special"
                              value={dataRegister.phone}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="coverLetter" className="text-info">
                              Cover Letter
                            </label>
                            <br />
                            <input
                              type="text"
                              name="coverLetter"
                              id="coverLetter"
                              required
                              className="form-control input-special"
                              value={dataRegister.coverLetter}
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <div className="form-group">
                            
                            <input
                              style={{ margin: "auto", display: "block" }}
                              type="submit"
                              name="SUBMIT"
                              className="btn btn-info btn-md"
                              defaultValue="submit"
                            />
                          </div>
                          <div id="register-link" className="text-center pr-2">
                            You have accout already!{" "}
                            <NavLink to="/login" className="text-info">
                              Sign in
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

export default Register;
