import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const VoluntaryWorkView = props => {
  const { voluntaryWorkInfo, formatDate } = props
  return (
    <Row>
      <Col>
        {!isEmpty(voluntaryWorkInfo) ? (
          <>
            {voluntaryWorkInfo.map((voluntaryWork, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
                <Col md={12} className="mt-3">
                  <OutlinedBox
                    label={"Name & Address of Organization"}
                    value={voluntaryWork.organizationName || "N/A"}
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <h6>Inclusive Dates</h6>
                  <Row>
                    <Col md={6} className="mt-1">
                      <OutlinedBox
                        label={"From"}
                        value={formatDate(voluntaryWork.from) || "N/A"}
                      />
                    </Col>
                    <Col md={6} className="mt-1">
                      <OutlinedBox
                        label={"To"}
                        value={formatDate(voluntaryWork.to) || "N/A"}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} className="mt-3">
                  <OutlinedBox
                    label={"Number of numberOfHours"}
                    value={voluntaryWork.numberOfHours || "N/A"}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <OutlinedBox
                    label={"Position/Nature of Work"}
                    value={voluntaryWork.position || "N/A"}
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

VoluntaryWorkView.propTypes = {
  voluntaryWorkInfo: PropTypes.arrayOf(
    PropTypes.shape({
      organizationName: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      numberOfHours: PropTypes.number,
      position: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default VoluntaryWorkView
