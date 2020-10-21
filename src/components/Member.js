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
                  src="images/person_1.jpg"
                  alt="Image"
                />
                <blockquote>
                  <p>
                    “Soluta quasi cum delectus eum facilis recusandae nesciunt
                    molestias accusantium libero dolores repellat id in dolorem
                    laborum ad modi qui at quas dolorum voluptatem voluptatum
                    repudiandae.”
                  </p>
                  <p>
                    <cite> — Richard Anderson</cite>
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
                  src="images/person_2.jpg"
                  alt="Image"
                />
                <blockquote>
                  <p>
                    “Soluta quasi cum delectus eum facilis recusandae nesciunt
                    molestias accusantium libero dolores repellat id in dolorem
                    laborum ad modi qui at quas dolorum voluptatem voluptatum
                    repudiandae.”
                  </p>
                  <p>
                    <cite> — Chris Peters</cite>
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
