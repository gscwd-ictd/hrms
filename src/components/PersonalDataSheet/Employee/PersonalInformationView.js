import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const PersonalInformationView = props => {
  const {
    personalInfo,
    permanentAddress,
    residentialAddress,
    governmentIssuedIds,
    formatDate,
  } = props

  return (
    <Row>
      <Col>
        {!isEmpty(personalInfo) ? (
          <>
            <Row>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={personalInfo.lastName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={personalInfo.firstName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={personalInfo.middleName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name Extension"}
                  value={personalInfo.nameExtension || "N/A"}
                />
              </Col>
            </Row>

            <hr className="my-4"></hr>

            <Row>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Date of Birth"}
                  value={formatDate(personalInfo.birthDate)}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Place of Birth"}
                  value={personalInfo.birthPlace}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox label={"Sex"} value={personalInfo.sex} />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Civil Status"}
                  value={personalInfo.civilStatus}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Height"}
                  value={personalInfo.height + " meters" || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Weight"}
                  value={personalInfo.weight + " kilograms" || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Blood Type"}
                  value={personalInfo.bloodType || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(governmentIssuedIds) ? (
          <>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"GSIS ID No"}
                  value={governmentIssuedIds.gsisNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Pag-Ibig ID No"}
                  value={governmentIssuedIds.pagibigNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"PhilHealth No"}
                  value={governmentIssuedIds.philhealthNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"SSS No"}
                  value={governmentIssuedIds.sssNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"TIN"}
                  value={governmentIssuedIds.tinNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Agency Employee No"}
                  value={governmentIssuedIds.agencyNumber || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(personalInfo) ? (
          <>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Citizenship"}
                  value={personalInfo.citizenship || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Type"}
                  value={personalInfo.citizenshipType || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Country"}
                  value={personalInfo.country || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(residentialAddress) ? (
          <>
            <h5>Residential Address</h5>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"House/Block/Lot No."}
                  value={residentialAddress.houseNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Street"}
                  value={residentialAddress.street || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Subdivision/Village"}
                  value={residentialAddress.subdivision || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Province"}
                  value={residentialAddress.province || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"City/Municipality"}
                  value={residentialAddress.city || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Barangay"}
                  value={residentialAddress.barangay || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Zip Code"}
                  value={residentialAddress.zipCode || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(permanentAddress) ? (
          <>
            <h5>Permanent Address</h5>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"House/Block/Lot No."}
                  value={permanentAddress.houseNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Street"}
                  value={permanentAddress.street || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Subdivision/Village"}
                  value={permanentAddress.subdivision || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Province"}
                  value={permanentAddress.province || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"City/Municipality"}
                  value={permanentAddress.city || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Barangay"}
                  value={permanentAddress.barangay || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Zip Code"}
                  value={permanentAddress.zipCode || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        <div className="mb-3">
          {!isEmpty(personalInfo) ? (
            <>
              <Row>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Telephone No."}
                    value={personalInfo.telephoneNumber || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"Mobile No."}
                    value={personalInfo.mobileNumber || "N/A"}
                  />
                </Col>
                <Col md={4} className="mt-3">
                  <OutlinedBox
                    label={"E-mail Address"}
                    value={personalInfo.email || "N/A"}
                  />
                </Col>
              </Row>
            </>
          ) : null}
        </div>
      </Col>
    </Row>
  )
}

PersonalInformationView.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  permanentAddress: PropTypes.object.isRequired,
  residentialAddress: PropTypes.object.isRequired,
  governmentIssuedIds: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default PersonalInformationView
