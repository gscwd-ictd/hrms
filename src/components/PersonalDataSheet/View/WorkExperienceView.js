import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const WorkExperienceView = props => {
  const { workExperienceInfo, formatDate } = props

  return (
    <Row>
      <Col>
        {!isEmpty(workExperienceInfo) ? (
          <>
            {workExperienceInfo.map((experience, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
                <Col md={12} className="mt-3">
                  <h6>Inclusive Dates</h6>
                  <Row>
                    <Col md={6} className="mt-1">
                      <OutlinedBox
                        label={"From"}
                        value={formatDate(experience.from) || "N/A"}
                      />
                    </Col>
                    <Col md={6} className="mt-1">
                      <OutlinedBox
                        label={"To"}
                        value={formatDate(experience.to) || "N/A"}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Position Title"}
                    value={experience.positionTitle || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Department/Agency/Office/Company"}
                    value={experience.companyName || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Month Salary"}
                    value={"₱" + experience.monthlySalary || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Salary Grade & Step Increment"}
                    value={experience.salaryGrade || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Status of Appointment"}
                    value={experience.appointmentStatus || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Goverment Service"}
                    value={experience.isGovernmentService ? "Yes" : "No"}
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

WorkExperienceView.propTypes = {
  workExperienceInfo: PropTypes.arrayOf(
    PropTypes.shape({
      positionTitle: PropTypes.string,
      companyName: PropTypes.string,
      monthlySalary: PropTypes.number,
      salaryGrade: PropTypes.string,
      appointmentStatus: PropTypes.string,
      isGovernmentService: PropTypes.bool,
      from: PropTypes.string,
      to: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default WorkExperienceView
