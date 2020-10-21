import React from 'react'

const ModalApplyForm = () => {
    return (
      <div>
        {/* Modal apply*/}
        <div
          className="modal fade"
          id="AcceptModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="AcceptModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AcceptModalLabel">
                  Submit Curriculum Vitae Form
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <form action="#" className>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label
                              className="text-black"
                              name="fullname"
                              htmlFor="fullname"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="lname"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="phone">
                              Phone
                            </label>
                            <input
                              type="text"
                              id="phone"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="Locate">
                              Address
                            </label>
                            <input
                              type="text"
                              id="Locate"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12 mb-3">
                            <label className="text-black" htmlFor="cv">
                              Add Curriculum Vitae
                            </label>
                            <input type="file" id="cv" />
                            <div style={{ fontSize: "12px" }}>
                              <strong style={{ color: "red" }}>Note: </strong>-
                              The system currently supports only one uploaded
                              file in .pdf
                              
                            </div>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="description">
                              Job Description
                            </label>
                            <textarea
                              name="description"
                              id="description"
                              cols={30}
                              rows={8}
                              className="form-control"
                              placeholder="Write your description here..."
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <form action="/action_page.php">
                  <button className="btn-apply btn--info">Cancel</button>
                  <button
                    className="btn-apply btn--apply"
                    data-toggle="modal"
                    data-target="#AcceptModal"
                  >
                    accept
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ModalApplyForm
