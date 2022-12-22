import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const LearningAndDevelopmentView = props => {
  const { learningDevelopmentInfo, formatDate } = props
  return (
    <Row>
      <Col>
        {!isEmpty(learningDevelopmentInfo) ? (
          <>
            {learningDevelopmentInfo.map((training, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
                <Col md={12} className="mt-3">
                  <OutlinedBox
                    label={"Title"}
                    value={training.title || "N/A"}
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <h6>Inclusive Dates</h6>
                  <Row>
                    <Col md={6} className="mt-1">
                      <OutlinedBox
                        label={"From"}
                        value={formatDate(training.from) || "N/A"}
                      />
                    </Col>
                    <Col md={6} className="mt-1">
                      <OutlinedBox
                        label={"To"}
                        value={formatDate(training.to) || "N/A"}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Number of hours"}
                    value={training.numberOfHours || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Type of LD"}
                    value={training.type || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Conducted/Sponsored By"}
                    value={training.conductedBy || "N/A"}
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

LearningAndDevelopmentView.propTypes = {
  learningDevelopmentInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      type: PropTypes.string,
      numberOfHours: PropTypes.number,
      conductedBy: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default LearningAndDevelopmentView
