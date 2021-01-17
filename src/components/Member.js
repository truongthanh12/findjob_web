import React from 'react'

const Member = () => {
    return (
      <section className="bg-light pt-5 testimony-full">
        <div className="owl-carousel single-carousel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <img
                  className="img-fluid mx-auto"
                  src="images/person.jpg"
                  alt="Image"
                />
                <blockquote>
                  <p>
                    “The harder you work the better you achieve”
                  </p>
                  <p>
                    <cite> — Nguyen Truong Thanh (Front-End)</cite>
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <img
                  className="img-fluid mx-auto"
                  src="https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                  alt="Image"
                />
                <blockquote>
                  <p>
                    “Updating ...”
                  </p>
                  <p>
                    <cite> — Nguyen Kiet (Back-End)</cite>
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <img
                  className="img-fluid mx-auto"
                  src="https://media-exp1.licdn.com/dms/image/C5103AQH0Ozk_IO8-2g/profile-displayphoto-shrink_100_100/0/1562221456953?e=1616630400&v=beta&t=nUt3BEXaYosmuAYEhjrGMtTZjiJZ6rZS1nUFB7kdAhA"
                  alt="Image"
                />
                <blockquote>
                  <p>
                  "When I die, I will be remembered for the life I live, not the money I made"
                  </p>
                  <p>
                    <cite> — Nguyen Phu Trong (Supporter)</cite>
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Member
