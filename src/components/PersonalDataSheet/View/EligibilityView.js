import React, { useEffect } from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const EligibilityView = props => {
  const { eligibilityInfo, formatDate } = props

  return (
    <Row>
      <Col>
        {!isEmpty(eligibilityInfo) ? (
          <>
            {eligibilityInfo.map((eligibility, index) => {
              return (
                <Row key={index} className="mt-3 py-2 bordered-box">
                  <Col md={6} className="mt-3">
                    <OutlinedBox label={"Name"} value={eligibility.name || "N/A"} />
                  </Col>
                  <Col md={6} className="mt-3">
                    <OutlinedBox label={"Rating"} value={eligibility.rating || "N/A"} />
                  </Col>
                  <Col md={6} className="mt-3">
                    <OutlinedBox
                      label={"Date of Examination"}
                      value={eligibility.examDate || "N/A"}
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <OutlinedBox
                      label={"Place of Examination"}
                      value={eligibility.examPlace || "N/A"}
                    />
                  </Col>
                  <Col md={12} className="mt-3">
                    <h6>License</h6>
                    <Row>
                      <Col md={6} className="mt-1">
                        <OutlinedBox
                          label={"Number"}
                          value={eligibility.licenseNumber || "N/A"}
                        />
                      </Col>
                      <Col md={6} className="mt-1">
                        <OutlinedBox
                          label={"Date of Validity"}
                          value={formatDate(eligibility.validity) || "N/A"}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
            })}
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

EligibilityView.propTypes = {
  eligibilityInfo: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      examDate: PropTypes.string,
      examPlace: PropTypes.string,
      licenseNumber: PropTypes.string,
      validity: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default EligibilityView
