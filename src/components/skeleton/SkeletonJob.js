import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonJob = () => {
  return (
    <div className="site-section">
      {Array(10)
        .fill()
        .map((item, index) => (
          <div className="container" key={index}>
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">
                  <div>
                    <Skeleton height={30} width={300} duration={1}/>
                  </div>
                </h2>
              </div>
            </div>
            <div className="mb-5">
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <Skeleton circle={true} height={100} width={100} duration={1}/>
                </div>

                <div className="col-md-4">
                  <Skeleton height={30} width={300} duration={1} />
                  <h2>
                    <Skeleton height={30} width={300} duration={1} />
                  </h2>
                  <h2 className="my-2">
                    <Skeleton height={30} width={300} duration={1} />
                  </h2>
                  <p className="meta">
                    <strong>
                      <Skeleton height={30} width={100} duration={1} />
                    </strong>
                    <br />
                    <strong>
                      <Skeleton height={30} width={100} duration={1} />
                    </strong>
                  </p>
                </div>
                <div className="col-md-3 p-4">
                  <p style={{ marginBottom: 0 }}>
                    <strong className="text-black">
                      <Skeleton height={30} width={200} duration={1} />
                    </strong>
                  </p>
                  <strong className="text-black">
                    <Skeleton height={30} width={200} duration={1} />
                  </strong>
                </div>
                <div className="col-md-3 text-md-right mt-3">
                  <p>
                    <Skeleton height={30} width={100} duration={1} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonJob;
