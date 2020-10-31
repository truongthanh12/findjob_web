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
    cityName: "",
    companyName: "",
    address: "",
    companyDescription: "",
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
      cityName: registerForm.cityName,
      companyName: registerForm.companyName,
      address: registerForm.address,
      companyDescription: registerForm.companyDescription,
    };

    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Account/Create`,
        register,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setDataRegister(register);
          swal({
            title: "Success",
            text: "Logged success!",
            button: "OK",
            icon: "success",
            timer: 1200,
          });
          console.log(res);
          history.push("/login");
          localStorage.setItem("dataRegisted", (res.config.data));
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

    // fetch("https://webjobfinder.azurewebsites.net/api/Account/Create", {
    //   method: "POST",
    //   body: JSON.stringify(register),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // }).then((res) => {
    //   if (res && res.status === 200) {
    //     setDataRegister(register);
    //     swal({
    //       title: "Success",
    //       text: "Post your job!",
    //       button: "OK",
    //       icon: "success",
    //       timer: 1200,
    //     });
    //     console.log(res)
    //     history.push("/home");
    //   } else {
    //     swal({
    //       title: "Fail",
    //       text: "Failed!",
    //       button: "OK",
    //       icon: "warning",
    //       timer: 1200,
    //     });
    //   }
    // });
  };

  // get api select
  useEffect(() => {
    const fetchCity = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/City/Get-list-city`
      );
      setCityName(result.data.data);
    };
    fetchCity();
  }, []);
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
                <form id="login-form" className="form" onSubmit={handleSubmit}>
                  <h3 className="text-center text-info">Register</h3>
                  <p className="text-center">
                    Please enter all the field below, the system will save your
                    data when you post a job.
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
                      className="form-control"
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
                      className="form-control"
                      value={dataRegister.accountID}
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
                      className="form-control"
                      value={dataRegister.accountID}
                      onChange={(value) => handleChange(value)}
                    />
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-info" htmlFor="city">
                        City
                      </label>
                      <select
                        name="cityName"
                        className="form-control"
                        required
                        value={dataRegister.accountID}
                        onChange={(value) => handleChange(value)}
                      >
                        <option selected disabled hidden>
                          Choose city
                        </option>
                        {cityName.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="companyName" className="text-info">
                      companyName
                    </label>
                    <br />
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      required
                      className="form-control"
                      value={dataRegister.accountID}
                      onChange={(value) => handleChange(value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address" className="text-info">
                      address
                    </label>
                    <br />
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      className="form-control"
                      value={dataRegister.accountID}
                      onChange={(value) => handleChange(value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyDescription" className="text-info">
                      companyDescription
                    </label>
                    <br />
                    <textarea
                      type="text"
                      name="companyDescription"
                      id="companyDescription"
                      cols={30}
                      required
                      rows={5}
                      className="form-control"
                      value={dataRegister.accountID}
                      onChange={(value) => handleChange(value)}
                    />
                  </div>
                  <div className="form-group">
                    {/* <label for="remember-me" class="text-info"><span>Remember me</span> <span><input
                                      id="remember-me" name="remember-me" type="checkbox"></span></label><br> */}
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
  );
};

export default Register;
