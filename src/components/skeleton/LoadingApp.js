import React from "react";

const LoadingApp = () => {
  return (
      <div className="loading-app">
    <div className="wrapper-loading">
    <div className="loader-outer">
        <div className="loader-inner">
        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
        </div>
    </div>
    <h1>
        <span>LOADING</span>
    </h1>
    </div></div>
  );
};

export default LoadingApp;
