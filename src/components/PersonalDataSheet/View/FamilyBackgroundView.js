import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const FamilyBackgroundView = props => {
  const { familyInfo, formatDate } = props

  return (
    <Row>
      <Col>
        {!isEmpty(familyInfo.spouse) ? (
          <>
            <h5>Spouse Details</h5>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={familyInfo.spouse.lastName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={familyInfo.spouse.firstName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={familyInfo.spouse.middleName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name Extension"}
                  value={familyInfo.spouse.nameExtension || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Occupation"}
                  value={familyInfo.spouse.occupation || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Employer/Business Name"}
                  value={familyInfo.spouse.employer || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Business Address"}
                  value={familyInfo.spouse.businessAddress || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Telephone No."}
                  value={familyInfo.spouse.telephoneNumber || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>
        {!isEmpty(familyInfo.parents.father) ? (
          <>
            <h5>Father Details</h5>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={familyInfo.parents.father.fatherLastName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={familyInfo.parents.father.fatherFirstName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={familyInfo.parents.father.fatherMiddleName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name Extension"}
                  value={familyInfo.parents.father.fatherNameExtension || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(familyInfo.parents.mother) ? (
          <>
            <h5>Mother Details</h5>
            <Row className="mt-2">
              <Col md={12} className="mt-3">
                <OutlinedBox
                  label={"Mother's Maiden Name"}
                  value={familyInfo.parents.mother.motherMaidenName || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={familyInfo.parents.mother.motherLastName || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={familyInfo.parents.mother.motherFirstName || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={familyInfo.parents.mother.motherMiddleName || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        <h5>Childrens Details</h5>
        {!isEmpty(familyInfo.children) ? (
          <>
            {familyInfo.children.map((child, index) => (
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

        <hr className="my-4"></hr>
      </Col>
    </Row>
  )
}

FamilyBackgroundView.propTypes = {
  familyInfo: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default FamilyBackgroundView
