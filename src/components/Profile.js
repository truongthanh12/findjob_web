import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Profile = () => {
  const { accountName } = JSON.parse(
    localStorage.getItem("dataLogged") || "{}"
  );

  const {
    companyName,
    accountID,
    cityName,
    email,
    address,
    companyDescription,
  } = JSON.parse(localStorage.getItem("dataRegisted") || "{}");

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
          `https://webjobfinder.azurewebsites.net/api/Employee/Get-image-by-AccountID?AccountID=${accountID}`,
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

    console.log(new_file);
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
          setAvatarCompany(res.data.data)
          setGetFile(getFile);
          swal({
            title: "Success",
            text: "Please reload page!",
            button: "OK",
            icon: "success",
            timer: 2200,
          });
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

  // change state
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
            src={getFile.image || 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}
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
        </div>
      );
    } else {
      return (
        <div>
          <img
            src={getFile.image || 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}
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

  return (
    <div>
      <section
        className="home-section section-hero inner-page overlay bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
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

      <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              {showUpload()}
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{accountID || ""}</h5>
              <h6>{companyName || ""}</h6>
              <span className="icon-room pr-2" />
              {cityName || ""}
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
                    <p>{accountID || ""}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{companyName || ""}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{email || ""}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <p>{address || ""}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Description about company</label>
                  </div>
                  <div className="col-md-6">
                    <p>{companyDescription || ""}</p>
                  </div>
                </div>
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
    </div>
  );
};

export default Profile;
