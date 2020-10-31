import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const HomeSection = () => {
  const [cityName, setCityName] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [salary, setSalary] = useState([]);

  // search
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    keyWord: "",
    city: "",
    jobType: "",
    salary: "",
    page: 0,
  });

  const handleChange = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const search_job = {
      keyWord: searchTerm.keyWord,
      city: searchTerm.city,
      jobType: searchTerm.jobType,
      salary: searchTerm.salary,
      page: searchTerm.page,
    };
    axios
      .post(
        `https://webjobfinder.azurewebsites.net/api/Job/Filter-list-job`,
        search_job,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        if (res && res.status === 200) {
          setSearchResults(res.data.data);
          swal({
            title: "Success",
            text: "Post your job!",
            button: "OK",
            icon: "success",
            timer: 1500,
          });
          var elements = document.getElementById("searchResult");
          elements.scrollIntoView({ behavior: "smooth" });
        } else {
          swal({
            title: "Fail",
            text: "Failed!",
            button: "OK",
            icon: "warning",
            timer: 1500,
          });
        }
      });
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

  useEffect(() => {
    const fetchJobType = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/JobType/Get-list-jobtype`
      );
      setJobType(result.data.data);
    };
    fetchJobType();
  }, []);

  useEffect(() => {
    const fetchSalary = async () => {
      const result = await axios(
        `https://webjobfinder.azurewebsites.net/api/Job/Get-list-Salary-for-add-job`
      );
      setSalary(result.data.data);
    };
    fetchSalary();
  }, []);

  return (
    <section
      className="home-section section-hero overlay bg-image"
      style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
      id="home-section"
    >
      {(searchResults || []).map((item, index) => {
        return (
          <div key={index}>
            <p>{item.companyDescription}</p>
            <p>{item.companyName}</p>
            <p>{item.city}</p>
            <p>{item.address}</p>
            <p>{item.email}</p>
            <p>{item.jobName}</p>
            <p>{item.experience}</p>
          </div>
        );
      })}
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-12">
            <div className="mb-5 text-center">
              <h1 className="text-white font-weight-bold">
                A Powerful Career Website Template
              </h1>
              <p>
                Find your dream jobs in our powerful career website template.
              </p>
            </div>
            <form
              method="post"
              onSubmit={handleSubmit}
              className="search-jobs-form"
            >
              <div className="containerHomeSection">
                <div className="row mb-5">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 mb-lg-0">
                    <p>
                      <input
                        type="text"
                        name="keyWord"
                        className="form-control form-control-lg"
                        placeholder="Job title, keywords..."
                        value={searchTerm.keyWord}
                        onChange={(value) => handleChange(value)}
                      />
                    </p>

                    <select
                      name="city"
                      className="form-control"
                      required
                      value={searchTerm.city}
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
                  
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 mb-lg-0">
                    <p>
                      <select
                        className="form-control"
                        name="jobType"
                        required
                        value={searchTerm.jobType}
                        onChange={(value) => handleChange(value)}
                      >
                        <option selected disabled hidden>
                          Job type
                        </option>
                        {jobType.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </p>
                    <select
                      name="salary"
                      className="form-control"
                      required
                      value={searchTerm.salary}
                      onChange={(value) => handleChange(value)}
                    >
                      <option selected disabled hidden>
                        Choose salary
                      </option>
                      {salary.map((value, index) => (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4 mb-lg-0 mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block text-white btn-search"
                    >
                      <span className="icon-search icon mr-2" />
                      Search Job
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
