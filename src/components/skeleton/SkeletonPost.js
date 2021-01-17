import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonPost = () => {
  return (
    <div>
      <section>
        <Skeleton height={500} width={3000} duration={1} />
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">
                  <Skeleton height={30} width={150} duration={1} />
                </h1>
                <Skeleton height={20} width={300} duration={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section pt-5" id="next-section">
        <div className="container">
          <form method="post">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-6">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>

                  <div className="col-md-6">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={80} width={200} duration={1} />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Skeleton height={30} width={300} duration={1} />
                    <Skeleton height={30} width={200} duration={1} />
                  </div>
                </div>
              </div>
            </div>
            <p>
              <Skeleton height={20} width={250} duration={1} />
            </p>
            <p>
              <Skeleton height={20} width={250} duration={1} />
            </p>
            <div className="row form-group">
              <div className="col-md-12 mt-3 text-center">
                <Skeleton height={50} width={90} duration={1} />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SkeletonPost;
