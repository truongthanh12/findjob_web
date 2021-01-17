import React from "react";

const LoadingApp = () => {
  return (
      <div className="loading-app">
    <div class="wrapper-loading">
    <div class="loader-outer">
        <div class="loader-inner">
        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
        </div>
    </div>
    <h1>
        <span>LOADING</span>
    </h1>
    </div></div>
  );
};

export default LoadingApp;
