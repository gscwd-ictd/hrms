import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const FamilyBackgroundView = props => {
  const { spouse, parents, childrenInfo, formatDate } = props

  return (
    <Row>
      <Col>
        <h5>Spouse Details</h5>
        {!isEmpty(spouse) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={spouse.lastName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={spouse.firstName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={spouse.middleName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name Extension"}
                  value={spouse.nameExtension || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Occupation"}
                  value={spouse.occupation || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Employer/Business Name"}
                  value={spouse.employer || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Business Address"}
                  value={spouse.businessAddress || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Telephone No."}
                  value={spouse.telephoneNumber || "N/A"}
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
        <h5>Father&apos;s Information</h5>
        {!isEmpty(parents) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={parents.fatherLastName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={parents.fatherFirstName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={parents.fatherMiddleName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name Extension"}
                  value={parents.fatherNameExtension || "N/A"}
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
        <h5>Mother&apos;s Maiden Information </h5>
        {!isEmpty(parents) ? (
          <>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={parents.motherLastName || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={parents.motherFirstName || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={parents.motherMiddleName || "N/A"}
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

        <h5>Childrens Details</h5>
        <div className="mb-3">
          {!isEmpty(childrenInfo) ? (
            <>
              {childrenInfo.map((child, index) => (
                <Row className="mt-2" key={index}>
                  <Col md={7} className="mt-3">
                    <OutlinedBox label={"Name"} value={child.childName} />
                  </Col>
                  <Col md={5} className="mt-3">
                    <OutlinedBox
                      label={"Date of Birth"}
                      value={formatDate(child.birthDate)}
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
      </Col>
    </Row>
  )
}

FamilyBackgroundView.propTypes = {
  spouse: PropTypes.object.isRequired,
  parents: PropTypes.object.isRequired,
  childrenInfo: PropTypes.arrayOf(
    PropTypes.shape({
      childName: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default FamilyBackgroundView
