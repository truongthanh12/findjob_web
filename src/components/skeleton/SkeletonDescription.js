import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonDescription = () => {
  return (
    <div>
      {Array(1)
        .fill()
        .map((item, index) => (
            
            <section className="site-section" key={index}>
              <div className="container">
                <div className="row align-items-center mb-5">
                  <div className="col-lg-8 col-12 mb-4 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <Skeleton
                        circle={true}
                        height={100}
                        width={100}
                        duration={1}
                      />

                      <div className="info-company-description">
                        <h2>
                          <Skeleton height={30} width={300} duration={1} />
                        </h2>
                        <div>
                          <span className="text-primary">
                            <Skeleton height={10} width={300} duration={1} />
                          </span>
                          <br />
                          <span className="text-primary">
                            <Skeleton height={10} width={300} duration={1} />
                          </span>
                          <span className="m-2">
                            <span className="text-primary">
                              <Skeleton height={10} width={300} duration={1} />
                            </span>
                          </span>
                          <span className="m-2">
                            <span className="text-primary">
                              <Skeleton height={10} width={300} duration={1} />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="row">
                      <div className="col-6">
                        <Skeleton height={50} width={70} duration={1} />
                      </div>
                      <div className="col-6">
                        <Skeleton height={50} width={70} duration={1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="mb-5">
                      <figure className="mb-5">
                        <Skeleton
                          circle={true}
                          height={100}
                          width={100}
                          duration={1}
                        />
                      </figure>
                      <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                        <Skeleton height={30} width={200} duration={1} />
                      </h3>

                      <h3 className="h5 d-flex align-items-center my-4 mt-5 text-primary">
                        <Skeleton height={10} width={300} duration={1} />
                      </h3>
                      <Skeleton height={10} width={300} duration={1} />
                      <br />
                      <span className="icon-check_circle mr-2 text-muted" />
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="bg-light p-3 border rounded mb-4">
                      <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                        <Skeleton height={30} width={200} duration={1} />
                      </h3>
                      <ul className="list-unstyled pl-3 mb-0">
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                        <li className="mb-2">
                          <Skeleton height={10} width={100} duration={1} />
                        </li>
                      </ul>
                    </div>
                    <div className="bg-light p-3 border rounded">
                      <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                        <Skeleton height={20} width={50} duration={1} />
                      </h3>
                      <div className="px-3">
                        <Skeleton height={50} width={50} duration={1} />
                        <Skeleton height={50} width={50} duration={1} />
                        <Skeleton height={50} width={50} duration={1} />
                        <Skeleton height={50} width={50} duration={1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        ))}
    </div>
  );
};

export default SkeletonDescription;
