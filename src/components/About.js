import React from 'react'
import BackTop from './BackTop'

const About = () => {
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
                  <h1 className="text-white font-weight-bold">About Us</h1>
                  <p>
                    Find your dream jobs in our powerful career website
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <a
                  data-fancybox
                  data-ratio={2}
                  href="https://vimeo.com/317571768"
                  className="block__96788"
                >
                  <span className="play-icon">
                    <span className="icon-play" />
                  </span>
                  <img
                    src="images/about_1.jpg"
                    alt="Image"
                    className="img-fluid img-shadow"
                  />
                </a>
              </div>
              <div className="col-lg-5 ml-auto">
                <h2 className="section-title mb-3">Careers for Your Careers</h2>
                <p className="lead">
                  Eveniet voluptatibus voluptates suscipit minima, cum
                  voluptatum ut dolor, sed facere corporis qui, ea quisquam quis
                  odit minus nulla vitae. Sit, voluptatem.
                </p>
                <p>
                  Ipsum harum assumenda in eum vel eveniet numquam, cumque vero
                  vitae enim cupiditate deserunt eligendi officia modi
                  consectetur. Expedita tempora quos nobis earum hic ex
                  asperiores quisquam optio nostrum sit!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center" data-aos="fade">
                <h2 className="section-title mb-3">Our Team</h2>
              </div>
            </div>
            <div className="row align-items-center block__69944">
              <div className="col-md-6">
                <img
                  src="https://scontent-hkt1-2.xx.fbcdn.net/v/t1.0-9/61936266_941832282815726_6375181572777181184_n.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=igXbWnBQijIAX-SegZb&_nc_ht=scontent-hkt1-2.xx&oh=36f1a6ff2f74086419ad2394aadef5cb&oe=60293EF2"
                  alt="Image"
                  className="img-fluid mb-4 rounded"
                />
                <h3>Nguyen Truong Thanh</h3>
                <p className="text-muted">Front-End Developer</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis temporibus laborum vel tempora ipsam voluptas?
                </p>
                <div className="social mt-4">
                  <a href="https://www.facebook.com/profile.php?id=100009668899108" target="_blank">
                    <span className="icon-facebook" />
                  </a>
                  <a href="#">
                    <span className="icon-twitter" />
                  </a>
                  <a href="#">
                    <span className="icon-instagram" />
                  </a>
                  <a href="#">
                    <span className="icon-linkedin" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 order-md-2">
                <img
                  src="https://lh3.googleusercontent.com/proxy/MqEWYRvUhB4pdWU6N7FnjMjUySDN5zlN948RGWib3yL2qDwQScD7yOVmeNCtSJ1XEU5GWw0htXBP_I-HZli-O_G7EGWd_9dRZiE3jT2xOQdMauRIasrFVS8C1OMaBzKknf6h0EGbhYKiJsE0"
                  alt="Image"
                  className="img-fluid mb-4 rounded"
                />
                <h3>Nguyen Kiet</h3>
                <p className="text-muted">Back-End Developer</p>
                <p>
                  Soluta quasi cum delectus eum facilis recusandae nesciunt
                  molestias accusantium libero dolores repellat id in dolorem
                </p>
                <div className="social mt-4">
                  <a href target="_blank">
                    <span className="icon-facebook" />
                  </a>
                  <a href="#">
                    <span className="icon-twitter" />
                  </a>
                  <a href="#">
                    <span className="icon-instagram" />
                  </a>
                  <a href="#">
                    <span className="icon-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BackTop />
      </div>
    );
}

export default About
