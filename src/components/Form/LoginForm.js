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

          history.push({
            pathname: "/",
          });
          swal({
            title: "Success",
            text: "Login success!",
            button: "OK",
            icon: "success",
            timer: 1200,
          });
          setDataLogin([...dataLogin], res.data.data);
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
                              className="form-control input-special"
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
                              className="form-control input-special"
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

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";

// export default () => {
//   const [formState, setFormState] = useState({
//     formValues: {
//       email: "",
//       password: ""
//     },
//     formErrors: {
//       email: "",
//       password: ""
//     },
//     formValidity: {
//       email: false,
//       password: false
//     }
//   });

//   const handleChange = ({ target }) => {
//     const { formValues } = formState;
//     formValues[target.name] = target.value;
//     setFormState({ formValues });
//     handleValidation(target);
//   };

//   const handleValidation = target => {
//     const { name, value } = target;
//     const fieldValidationErrors = formState.formErrors;
//     const validity = formState.formValidity;
//     const isEmail = name === "email";
//     const isPassword = name === "password";
//     const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//     validity[name] = value.length > 0;
//     fieldValidationErrors[name] = validity[name]
//       ? ""
//       : `${name} is required and cannot be empty`;

//     if (validity[name]) {
//       if (isEmail) {
//         validity[name] = emailTest.test(value);
//         fieldValidationErrors[name] = validity[name]
//           ? ""
//           : `${name} should be a valid email address`;
//       }
//       if (isPassword) {
//         validity[name] = value.length >= 3;
//         fieldValidationErrors[name] = validity[name]
//           ? ""
//           : `${name} should be 3 characters minimum`;
//       }
//     }

//     setFormState({
//       ...formState,
//       formErrors: fieldValidationErrors,
//       formValidity: validity
//     });
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     const { formValues, formValidity } = formState;
//     if (Object.values(formValidity).every(Boolean)) {
//       // Form is valid
//       console.log(formValues);
//     } else {
//       for (let key in formValues) {
//         let target = {
//           name: key,
//           value: formValues[key]
//         };
//         handleValidation(target);
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row mb-5">
//         <div className="col-lg-12 text-center">
//           <h1 className="mt-5">React regular form</h1>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-lg-12">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 name="email"
//                 className={`form-control ${
//                   formState.formErrors.email ? "is-invalid" : ""
//                 }`}
//                 placeholder="Enter email"
//                 onChange={handleChange}
//                 value={formState.formValues.email}
//               />
//               <div className="invalid-feedback">
//                 {formState.formErrors.email}
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className={`form-control ${
//                   formState.formErrors.password ? "is-invalid" : ""
//                 }`}
//                 placeholder="Password"
//                 onChange={handleChange}
//                 value={formState.formValues.password}
//               />
//               <div className="invalid-feedback">
//                 {formState.formErrors.password}
//               </div>
//             </div>
//             <button type="submit" className="btn btn-primary btn-block">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
