import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonProfile = () => {
  return (
    <div>
      {Array(1)
        .fill()
        .map((item, index) => (
          <div className="container emp-profile" key={index}>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <Skeleton
                    circle={true}
                    height={100}
                    width={100}
                    duration={1}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <Skeleton height={30} width={100} duration={1} />
                    </li>
                    <li className="nav-item">
                      <Skeleton height={30} width={100} duration={1} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <Skeleton height={20} width={100} duration={1} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <Skeleton height={30} width={100} duration={1} />
                  <a href="">
                    <Skeleton height={30} width={100} duration={1} />
                  </a>
                  <br />
                  <a href="">
                    <Skeleton height={20} width={100} duration={1} />
                  </a>
                  <br />
                  <a href="">
                    <Skeleton height={20} width={100} duration={1} />
                  </a>
                  <br />
                  <a href="">
                    <Skeleton height={20} width={100} duration={1} />
                  </a>
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
                        <Skeleton height={20} width={100} duration={1} />
                      </div>
                      <div className="col-md-6">
                        <Skeleton height={20} width={100} duration={1} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>
                          <Skeleton height={20} width={100} duration={1} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label>
                          <Skeleton height={20} width={100} duration={1} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <Skeleton height={20} width={100} duration={1} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>
                          <Skeleton height={20} width={100} duration={1} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <Skeleton height={20} width={100} duration={1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonProfile;
