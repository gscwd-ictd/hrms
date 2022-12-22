import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const EducationalBackgroundView = props => {
  const { educationInfo } = props
  return (
    <Row>
      <Col>
        <h5>Elementary</h5>
        {!isEmpty(educationInfo.elementary) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name of School"}
                  value={educationInfo.elementary.schoolName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Basic Education/Degree/Course"}
                  value={educationInfo.elementary.degree || "N/A"}
                />
              </Col>
              <Col md={12} className="mt-3">
                <h6>Period of Attendance</h6>
                <Row>
                  <Col className="mt-1">
                    <OutlinedBox
                      label={"From"}
                      value={educationInfo.elementary.from || "N/A"}
                    />
                  </Col>
                  <Col className="mt-1">
                    <OutlinedBox
                      label={"To"}
                      value={educationInfo.elementary.to || "N/A"}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Highest Level/Units Earned"}
                  value={educationInfo.elementary.units || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Year Graduated"}
                  value={educationInfo.elementary.yearGraduated || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Scholarship/Academic Honors Recieved"}
                  value={educationInfo.elementary.awards || "N/A"}
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

        <hr className="my-4"></hr>

        <h5>Secondary</h5>
        {!isEmpty(educationInfo.secondary) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name of School"}
                  value={educationInfo.secondary.schoolName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Basic Education/Degree/Course"}
                  value={educationInfo.secondary.degree || "N/A"}
                />
              </Col>
              <Col md={12} className="mt-3">
                <h6>Period of Attendance</h6>
                <Row>
                  <Col className="mt-1">
                    <OutlinedBox
                      label={"From"}
                      value={educationInfo.secondary.from || "N/A"}
                    />
                  </Col>
                  <Col className="mt-1">
                    <OutlinedBox
                      label={"To"}
                      value={educationInfo.secondary.to || "N/A"}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Highest Level/Units Earned"}
                  value={educationInfo.secondary.units || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Year Graduated"}
                  value={educationInfo.secondary.yearGraduated || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Scholarship/Academic Honors Recieved"}
                  value={educationInfo.secondary.awards || "N/A"}
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

        <hr className="my-4"></hr>

        <h5>Vocational/Trade Course</h5>
        {!isEmpty(educationInfo.vocational) ? (
          <>
            {educationInfo.vocational.map((vocation, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
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
                      <OutlinedBox label={"To"} value={vocation.to || "N/A"} />
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

        <hr className="my-4"></hr>

        <h5>College</h5>
        {!isEmpty(educationInfo.college) ? (
          <>
            {educationInfo.college.map((college, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
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
                      <OutlinedBox label={"To"} value={college.to || "N/A"} />
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

        <hr className="my-4"></hr>

        <h5>Graduate</h5>
        {!isEmpty(educationInfo.graduate) ? (
          <>
            {educationInfo.graduate.map((graduate, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
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
                      <OutlinedBox label={"To"} value={graduate.to || "N/A"} />
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

        <hr className="my-4"></hr>
      </Col>
    </Row>
  )
}

EducationalBackgroundView.propTypes = {
  educationInfo: PropTypes.object.isRequired,
}

export default EducationalBackgroundView
