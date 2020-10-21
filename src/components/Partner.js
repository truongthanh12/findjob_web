import React from 'react'

const Partner = () => {
    return (
      <section className="site-section py-4 mb-5 border-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center mt-4 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-7">
                  <h2 className="section-title mb-2">
                    Our Candidates Work In Company
                  </h2>
                  <p className="lead">
                    Porro error reiciendis commodi beatae omnis similique
                    voluptate rerum ipsam fugit mollitia ipsum facilis expedita
                    tempora suscipit iste
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_mailchimp.svg"
                alt="Image"
                className="img-fluid logo-1"
              />
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_paypal.svg"
                alt="Image"
                className="img-fluid logo-2"
              />
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_stripe.svg"
                alt="Image"
                className="img-fluid logo-3"
              />
            </div>
            <div className="col-6 col-lg-3 col-md-6 text-center">
              <img
                src="images/logo_visa.svg"
                alt="Image"
                className="img-fluid logo-4"
              />
            </div>
          </div>
        </div>
      </section>
    );
}

export default Partner
