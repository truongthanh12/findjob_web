import React from "react";
import { NavLink } from "react-router-dom";

const HomeChoose = () => {
  return (
    <div>
      <div className="full-background flex-column">
        <div className="row my-3">
          <div className="col-12">
            <h3>You have to log in to use...</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12 text-center">
            <h6>You have account already?</h6>
            <NavLink to="/login" style={{ color: "#fff" }}>
              <button className="btn-apply btn--apply my-1">Login</button>
            </NavLink>
          </div>

          <div className="col-md-6 col-12 text-center">
            <h6>You do not have account?</h6>
            <NavLink to="/register" style={{ color: "#fff" }}>
              <button className="btn-apply btn--info my-1">Register</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeChoose;
