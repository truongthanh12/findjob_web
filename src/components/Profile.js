import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import BackTop from "./BackTop";
import SkeletonProfile from "./skeleton/SkeletonProfile";

const Profile = () => {
  const { accountName, employerID, userType, employeeID } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );
  const [skeleton, setSkeleton] = useState(false);

  const { accountID } = JSON.parse(
    localStorage.getItem("dataRegisted") || "{}"
  );

  const [avatarCompany, setAvatarCompany] = useState({
    File: null,
    accountID: accountName,
  });

  // get api file imgae
  const [getFile, setGetFile] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

    const fetchJobApplied = async () => {
      axios
        .get(
          `https://webjobfinder.azurewebsites.net/api/Employee/Get-image-by-AccountID?AccountID=${avatarCompany.accountID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setGetFile(res.data.data);
          }
        })
        .catch((error) => {})
        .then(function () {
          // always executed
        });
    };
    fetchJobApplied();
  }, [accountID]);

  // submit file
  const handleFiles = (e) => {
    setAvatarCompany({ ...avatarCompany, [e.target.name]: e.target.files[0] });
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");
    const new_file = new FormData();

    new_file.append("File", avatarCompany.File);
    new_file.append("accountID", avatarCompany.accountID);

    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Employers/Upload-Image`,
        new_file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          setAvatarCompany(res.data.data);
          console.log(res);
          setGetFile(getFile);
          swal({
            title: "Success",
            text: "Please reload page!",
            button: "OK",
            icon: "success",
            timer: 2200,
          });
          window.location.reload();
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

  // get employee
  const [jobApplied, setJobApplied] = useState([]);
  // get job by employerID
  const [jobList, setJobList] = useState({});
  const [totalJob, setTotalJob] = useState([]);
  // pagination load more

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getListJobByEmployer = async (employerID) => {
      setSkeleton(true)
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-listjob-by-employerID?employerID=${employerID}&page=${page}`
      );
      setJobList(result.data.employer);
      setTotalJob(result.data);
      console.log(result.data);
      setTotalPages(result.data);
      setSkeleton(false)
    };

    const getListJobByEmployee = async (employeeID) => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Employee/Get-employee-by-id?EmployeeID=${employeeID}`
      );
      setJobApplied(result.data.data);
    };
    const { userType, employeeID, employerID } = JSON.parse(
      localStorage.getItem("dataLogged") || "{}"
    );

    switch (userType) {
      case "Employee":
        getListJobByEmployee(employeeID);
        break;
      case "Employer":
        getListJobByEmployer(employerID);
        break;
      default:
        break;
    }
  }, [page]);

  // change status
  const [changeStatus, setChangeStatus] = useState({ editing: false });

  const upload = () => {
    setChangeStatus({ ...changeStatus, editing: true });
  };
  const changePhoto = () => {
    setChangeStatus({ ...changeStatus, editing: true });
  };

  const showUpload = () => {
    if (changeStatus.editing === false) {
      return (
        <div>
          <img
            src={
              jobList.image ||
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
            alt="user avatar"
          />
          {userType === "Employer" ? (
            <div className="file btn btn-lg btn-primary">
              Change Photo
              <input
                type="file"
                name="File"
                className="upload-file"
                defaultValue={avatarCompany.File || ""}
                onChange={(e) => handleFiles(e)}
                onClick={changePhoto}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <div>
          <img
            src={
              jobList.image ||
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
            alt="user avatar"
          />
          <div className="file btn btn-lg btn-primary">
            Change Photo
            <input
              type="file"
              name="File"
              className="upload-file"
              defaultValue={avatarCompany.File || ""}
              onChange={(e) => handleFiles(e)}
              onClick={changePhoto}
            />
          </div>
          <form
            action="post"
            onSubmit={handleSubmitFile}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <button className="btn-apply btn--info" onClick={upload}>
              Upload
            </button>
          </form>
        </div>
      );
    }
  };

  // update employer
  const [updateEmployer, setUpdateEmployer] = useState({
    employerID: employerID,
    companyName: jobList.companyName,
    email: jobList.email,
    address: jobList.address,
    companyDescription: jobList.companyDescription,
  });

  const handleChangeUpdate = (e) => {
    setUpdateEmployer({ ...updateEmployer, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdateEmployer = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

    const update_employer = {
      employerID: employerID,
      companyName: updateEmployer.companyName,
      email: updateEmployer.email,
      address: updateEmployer.address,
      companyDescription: updateEmployer.companyDescription,
    };
console.log(update_employer);
    return;
    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Employers/Update-employer`,
        update_employer,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          setUpdateEmployer({update_employer, ...updateEmployer });
          setJobList({...jobList})
          console.log(jobList);
          swal({
            title: "Success",
            text: "Update your profile!",
            button: "OK",
            icon: "success",
            timer: 2000,
          });
          window.location.reload();
        } else {
        }
      })

      .catch((error) => {
        swal({
          title: "Fail",
          text: "Failed!",
          button: "OK",
          icon: "warning",
          timer: 1500,
        });
      });
  };

  // update employee
  const [updateEmployee, setUpdateEmployee] = useState({
    employeeID: employeeID,
    employeeName: jobApplied.employeeName,
    email: jobApplied.email,
    phone: jobApplied.phone,
    coverLetter: jobApplied.coverLetter,
  });

  const handleChangeUpdateEmployee = (e) => {
    setUpdateEmployee({ ...updateEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdateEmployee = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("dataLogged") || "{}");

    const update_employee = {
      employeeID: employeeID,
      employeeName: updateEmployee.employeeName,
      email: updateEmployee.email,
      phone: updateEmployee.phone,
      coverLetter: updateEmployee.coverLetter,
    };
    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Employee/Update-employee`,
        update_employee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          setUpdateEmployee({ ...update_employee });
          setUpdateEmployer({update_employee, ...updateEmployee });
          setJobApplied({...jobApplied})
          swal({
            title: "Success",
            text: "Update your profile!",
            button: "OK",
            icon: "success",
            timer: 2000,
          });
          window.location.reload();
        } else {
        }
      })

      .catch((error) => {
        swal({
          title: "Fail",
          text: "Failed!",
          button: "OK",
          icon: "warning",
          timer: 1500,
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
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">Profile page </h1>
                <p>
                  Find your dream jobs in our powerful career website template.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {skeleton ? (
        <SkeletonProfile />
      ) : (
      <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">{showUpload()}</div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{jobList.accountID || jobApplied.employeeName}</h5>
              <h6>{jobList.companyName || ""}</h6>
              <span className="icon-room pr-2" />
              {jobList.cityName || jobApplied.email}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input
              type="submit"
              className="profile-edit-btn"
              name="btnAddMore"
              value="Edit Profile"
              data-toggle="modal"
              data-target="#editProfile"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <p>WORK LINK</p>
              <a href="">Website Link</a>
              <br />
              <a href="">Bootsnipp Profile</a>
              <br />
              <a href="">Web Designer</a>
              <br />
              <a href="">Web Developer</a>
              <br />
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>{jobList.accountID || jobApplied.accountID}</p>
                  </div>
                </div>

                <div className="row">
                  {userType === "Employee" ? (
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <label>Company Name</label>
                    </div>
                  )}
                  <div className="col-md-6">
                    <p>{jobList.companyName || jobApplied.employeeName}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{jobList.email || jobApplied.email}</p>
                  </div>
                </div>
                {userType === "Employee" ? (
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{jobApplied.phone || ""}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Address</label>
                      </div>
                      <div className="col-md-6">
                        <p>{jobList.address || ""}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Description about company</label>
                      </div>
                      <div className="col-md-6">
                        <p>{jobList.companyDescription || ""}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>Not update</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Hourly Rate</label>
                  </div>
                  <div className="col-md-6">
                    <p>Not update</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Total Projects</label>
                  </div>
                  <div className="col-md-6">
                    <p>Not update</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>English Level</label>
                  </div>
                  <div className="col-md-6">
                    <p>Not update</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Availability</label>
                  </div>
                  <div className="col-md-6">
                    <p>Not update</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      {/* modal edit profile  */}
      <div
        className="modal fade"
        id="editProfile"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editProfile"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfile">
                Edit Profile
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {userType === "Employer" ? (
              <div>
                <div className="modal-body">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label
                        className="text-black"
                        name="companyName"
                        htmlFor="companyName"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        className="form-control"
                        name="companyName"
                        defaultValue={jobList.companyName || ""}
                        onChange={(value) => handleChangeUpdate(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        name="email"
                        defaultValue={jobList.email || ""}
                        onChange={(value) => handleChangeUpdate(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        name="address"
                        defaultValue={jobList.address || ""}
                        onChange={(value) => handleChangeUpdate(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="description">
                        Company Description
                      </label>
                      <textarea
                        name="companyDescription"
                        id="companyDescription"
                        cols={20}
                        rows={4}
                        className="form-control"
                        placeholder="Write your description here..."
                        defaultValue={jobList.companyDescription || ""}
                        onChange={(value) => handleChangeUpdate(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitUpdateEmployer}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            ) : (
              // employee
              <div>
                <div className="modal-body">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label
                        className="text-black"
                        name="employeeName"
                        htmlFor="employeeName"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="employeeName"
                        className="form-control"
                        name="employeeName"
                        defaultValue={jobApplied.employeeName || ""}
                        onChange={(value) => handleChangeUpdateEmployee(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        name="email"
                        defaultValue={jobApplied.email || ""}
                        onChange={(value) => handleChangeUpdateEmployee(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        name="phone"
                        defaultValue={jobApplied.phone || ""}
                        onChange={(value) => handleChangeUpdateEmployee(value)}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="description">
                        Cover Letter
                      </label>
                      <textarea
                        name="coverLetter"
                        id="coverLetter"
                        cols={20}
                        rows={4}
                        className="form-control"
                        placeholder="Write your description here..."
                        defaultValue={jobApplied.coverLetter || ""}
                        onChange={(value) => handleChangeUpdateEmployee(value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmitUpdateEmployee}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BackTop />
    </div>
  );
};

export default Profile;
