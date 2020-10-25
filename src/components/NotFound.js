import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
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
                <h1 className="text-white font-weight-bold">
                  Oops, PAGE NOT FOUND!
                </h1>

                <p>
                  You can look for more at{" "}
                  <NavLink to="/home" style={{ color: "white" }}>
                    home
                  </NavLink>
                </p>
                <NavLink to="/home">
                  <button className="btn-apply btn--apply">Back Home</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
