import React, { useState } from "react"
import classnames from "classnames"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import { Row, Col, Collapse } from "reactstrap"
import OutlinedBox from "components/OutlinedBox"

const EducationalBackgroundView = props => {
  const { elementary, secondary, vocational, college, graduate } = props

  // State for accordion sectins if open/close
  const [colElementary, setColElementary] = useState(false)
  const [colSecondary, setColSecondary] = useState(false)
  const [colVocational, setColVocational] = useState(false)
  const [colCollege, setColCollege] = useState(false)
  const [colGraduate, setColGraduate] = useState(false)

  // On click actions for accordions
  const t_colElementary = () => {
    setColElementary(!colElementary)
    setColSecondary(false)
    setColVocational(false)
    setColCollege(false)
    setColGraduate(false)
  }

  const t_colSecondary = () => {
    setColSecondary(!colSecondary)
    setColElementary(false)
    setColVocational(false)
    setColCollege(false)
    setColGraduate(false)
  }

  const t_colVocational = () => {
    setColVocational(!colVocational)
    setColElementary(false)
    setColSecondary(false)
    setColCollege(false)
    setColGraduate(false)
  }

  const t_colCollege = () => {
    setColCollege(!colCollege)
    setColElementary(false)
    setColSecondary(false)
    setColVocational(false)
    setColGraduate(false)
  }

  const t_colGraduate = () => {
    setColGraduate(!colGraduate)
    setColElementary(false)
    setColSecondary(false)
    setColCollege(false)
    setColVocational(false)
  }

  return (
    <Row>
      <Col>
        <div className="accordion accordion-flush">
          {/* ELEMENTARY */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFlushElementary">
              <button
                className={classnames("accordion-button", "fw-medium", {
                  collapsed: !colElementary,
                })}
                type="button"
                onClick={t_colElementary}
                style={{ cursor: "pointer" }}
              >
                Elementary Education
              </button>
            </h2>

            <Collapse isOpen={colElementary} className="accordion-collapse">
              <div className="accordion-body">
                {!isEmpty(elementary) ? (
                  <>
                    <Row className="mt-2 mb-4">
                      <Col md={6} className="mt-3">
                        <OutlinedBox
                          label={"Name of School"}
                          value={elementary.schoolName || "N/A"}
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <OutlinedBox
                          label={"Basic Education/Degree/Course"}
                          value={elementary.degree || "N/A"}
                        />
                      </Col>
                      <Col md={12} className="mt-3">
                        <h6>Period of Attendance</h6>
                        <Row>
                          <Col className="mt-1">
                            <OutlinedBox
                              label={"From"}
                              value={elementary.from || "N/A"}
                            />
                          </Col>
                          <Col className="mt-1">
                            <OutlinedBox
                              label={"To"}
                              value={elementary.to || "N/A"}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md={4} className="mt-3">
                        <OutlinedBox
                          label={"Highest Level/Units Earned"}
                          value={elementary.units || "N/A"}
                        />
                      </Col>
                      <Col md={4} className="mt-3">
                        <OutlinedBox
                          label={"Year Graduated"}
                          value={elementary.yearGraduated || "N/A"}
                        />
                      </Col>
                      <Col md={4} className="mt-3">
                        <OutlinedBox
                          label={"Scholarship/Academic Honors Recieved"}
                          value={elementary.awards || "N/A"}
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Row className="mt-2">
                    <Col md={12}>
                      <p className="text-danger">Not Applicable</p>
                    </Col>
                  </Row>
                )}
              </div>
            </Collapse>
          </div>

          {/* SECONDARY */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFlushSecondary">
              <button
                className={classnames("accordion-button", "fw-medium", {
                  collapsed: !colSecondary,
                })}
                type="button"
                onClick={t_colSecondary}
                style={{ cursor: "pointer" }}
              >
                Secondary Education
              </button>
            </h2>

            <Collapse isOpen={colSecondary} className="accordion-collapse">
              <div className="accordion-body">
                {!isEmpty(secondary) ? (
                  <>
                    <Row className="mt-2 mb-4">
                      <Col md={6} className="mt-3">
                        <OutlinedBox
                          label={"Name of School"}
                          value={secondary.schoolName || "N/A"}
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <OutlinedBox
                          label={"Basic Education/Degree/Course"}
                          value={secondary.degree || "N/A"}
                        />
                      </Col>
                      <Col md={12} className="mt-3">
                        <h6>Period of Attendance</h6>
                        <Row>
                          <Col className="mt-1">
                            <OutlinedBox
                              label={"From"}
                              value={secondary.from || "N/A"}
                            />
                          </Col>
                          <Col className="mt-1">
                            <OutlinedBox
                              label={"To"}
                              value={secondary.to || "N/A"}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md={4} className="mt-3">
                        <OutlinedBox
                          label={"Highest Level/Units Earned"}
                          value={secondary.units || "N/A"}
                        />
                      </Col>
                      <Col md={4} className="mt-3">
                        <OutlinedBox
                          label={"Year Graduated"}
                          value={secondary.yearGraduated || "N/A"}
                        />
                      </Col>
                      <Col md={4} className="mt-3">
                        <OutlinedBox
                          label={"Scholarship/Academic Honors Recieved"}
                          value={secondary.awards || "N/A"}
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Row className="mt-2">
                    <Col md={12}>
                      <p className="text-danger">Not Applicable</p>
                    </Col>
                  </Row>
                )}
              </div>
            </Collapse>
          </div>

          {/* VOCATIONAL */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFlushVocational">
              <button
                className={classnames("accordion-button", "fw-medium", {
                  collapsed: !colVocational,
                })}
                type="button"
                onClick={t_colVocational}
                style={{ cursor: "pointer" }}
              >
                Vocational/Trade Course
              </button>
            </h2>

            <Collapse isOpen={colVocational} className="accordion-collapse">
              <div className="accordion-body">
                {!isEmpty(vocational) ? (
                  <>
                    {vocational.map((vocation, index) => (
                      <Row
                        key={index}
                        className="mt-2 mb-3 py-2 pb-4 border shadow-none card-body"
                      >
                        <Col md={6} className="mt-3">
                          <OutlinedBox
                            label={"Name of School"}
                            value={vocation.schoolName || "N/A"}
                          />
                        </Col>
                        <Col md={6} className="mt-3">
                          <OutlinedBox
                            label={"Basic Education/Degree/Course"}
                            value={vocation.degree || "N/A"}
                          />
                        </Col>
                        <Col md={12} className="mt-3">
                          <h6>Period of Attendance</h6>
                          <Row>
                            <Col className="mt-1">
                              <OutlinedBox
                                label={"From"}
                                value={vocation.from || "N/A"}
                              />
                            </Col>
                            <Col className="mt-1">
                              <OutlinedBox
                                label={"To"}
                                value={vocation.to || "N/A"}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Highest Level/Units Earned"}
                            value={vocation.units || "N/A"}
                          />
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Year Graduated"}
                            value={vocation.yearGraduated || "N/A"}
                          />
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Scholarship/Academic Honors Recieved"}
                            value={vocation.awards || "N/A"}
                          />
                        </Col>
                      </Row>
                    ))}
                  </>
                ) : (
                  <Row className="mt-2">
                    <Col md={12}>
                      <p className="text-danger">Not Applicable</p>
                    </Col>
                  </Row>
                )}
              </div>
            </Collapse>
          </div>

          {/* COLLEGE */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFlushCollege">
              <button
                className={classnames("accordion-button", "fw-medium", {
                  collapsed: !colCollege,
                })}
                type="button"
                onClick={t_colCollege}
                style={{ cursor: "pointer" }}
              >
                College Education
              </button>
            </h2>

            <Collapse isOpen={colCollege} className="accordion-collapse">
              <div className="accordion-body">
                {!isEmpty(college) ? (
                  <>
                    {college.map((college, index) => (
                      <Row
                        key={index}
                        className="mt-2 mb-3 py-2 pb-4 border shadow-none card-body"
                      >
                        <Col md={6} className="mt-3">
                          <OutlinedBox
                            label={"Name of School"}
                            value={college.schoolName || "N/A"}
                          />
                        </Col>
                        <Col md={6} className="mt-3">
                          <OutlinedBox
                            label={"Basic Education/Degree/Course"}
                            value={college.degree || "N/A"}
                          />
                        </Col>
                        <Col md={12} className="mt-3">
                          <h6>Period of Attendance</h6>
                          <Row>
                            <Col className="mt-1">
                              <OutlinedBox
                                label={"From"}
                                value={college.from || "N/A"}
                              />
                            </Col>
                            <Col className="mt-1">
                              <OutlinedBox
                                label={"To"}
                                value={college.to || "N/A"}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Highest Level/Units Earned"}
                            value={college.units || "N/A"}
                          />
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Year Graduated"}
                            value={college.yearGraduated || "N/A"}
                          />
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Scholarship/Academic Honors Recieved"}
                            value={college.awards || "N/A"}
                          />
                        </Col>
                      </Row>
                    ))}
                  </>
                ) : (
                  <Row className="mt-2">
                    <Col md={12}>
                      <p className="text-danger">Not Applicable</p>
                    </Col>
                  </Row>
                )}
              </div>
            </Collapse>
          </div>

          {/* GRADUATE */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFlushGraduate">
              <button
                className={classnames("accordion-button", "fw-medium", {
                  collapsed: !colGraduate,
                })}
                type="button"
                onClick={t_colGraduate}
                style={{ cursor: "pointer" }}
              >
                Graduate Studies
              </button>
            </h2>

            <Collapse isOpen={colGraduate} className="accordion-collapse">
              <div className="accordion-body">
                {!isEmpty(graduate) ? (
                  <>
                    {graduate.map((graduate, index) => (
                      <Row
                        key={index}
                        className="mt-2 mb-3 py-2 pb-4 border shadow-none card-body"
                      >
                        <Col md={6} className="mt-3">
                          <OutlinedBox
                            label={"Name of School"}
                            value={graduate.schoolName || "N/A"}
                          />
                        </Col>
                        <Col md={6} className="mt-3">
                          <OutlinedBox
                            label={"Basic Education/Degree/Course"}
                            value={graduate.degree || "N/A"}
                          />
                        </Col>
                        <Col md={12} className="mt-3">
                          <h6>Period of Attendance</h6>
                          <Row>
                            <Col md={6} className="mt-1">
                              <OutlinedBox
                                label={"From"}
                                value={graduate.from || "N/A"}
                              />
                            </Col>
                            <Col md={6} className="mt-1">
                              <OutlinedBox
                                label={"To"}
                                value={graduate.to || "N/A"}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Highest Level/Units Earned"}
                            value={graduate.units || "N/A"}
                          />
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Year Graduated"}
                            value={graduate.yearGraduated || "N/A"}
                          />
                        </Col>
                        <Col md={4} className="mt-3">
                          <OutlinedBox
                            label={"Scholarship/Academic Honors Recieved"}
                            value={graduate.awards || "N/A"}
                          />
                        </Col>
                      </Row>
                    ))}
                  </>
                ) : (
                  <Row className="mt-2">
                    <Col md={12}>
                      <p className="text-danger">Not Applicable</p>
                    </Col>
                  </Row>
                )}
              </div>
            </Collapse>
          </div>
        </div>
      </Col>
    </Row>
  )
}

EducationalBackgroundView.propTypes = {
  elementary: PropTypes.object.isRequired,
  secondary: PropTypes.object.isRequired,
  vocational: PropTypes.array.isRequired,
  college: PropTypes.array.isRequired,
  graduate: PropTypes.array.isRequired,
}

export default EducationalBackgroundView
