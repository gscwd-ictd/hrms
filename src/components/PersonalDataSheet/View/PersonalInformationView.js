import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const PersonalInformationView = props => {
  const { basicInfo, formatDate } = props

  return (
    <Row>
      <Col>
        {!isEmpty(basicInfo.personalInfo) ? (
          <>
            <Row>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Last Name"}
                  value={basicInfo.personalInfo.lastName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"First Name"}
                  value={basicInfo.personalInfo.firstName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Middle Name"}
                  value={basicInfo.personalInfo.middleName || "N/A"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Name Extension"}
                  value={basicInfo.personalInfo.nameExtension || "N/A"}
                />
              </Col>
            </Row>

            <hr className="my-4"></hr>

            <Row>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Date of Birth"}
                  value={formatDate(basicInfo.personalInfo.birthDate)}
                />
              </Col>
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={"Place of Birth"}
                  value={basicInfo.personalInfo.birthPlace}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox label={"Sex"} value={basicInfo.personalInfo.sex} />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Civil Status"}
                  value={basicInfo.personalInfo.civilStatus}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Height"}
                  value={basicInfo.personalInfo.height + " meters" || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Weight"}
                  value={basicInfo.personalInfo.weight + " kilograms" || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={"Blood Type"}
                  value={basicInfo.personalInfo.bloodType || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(basicInfo.governmentIssuedIds) ? (
          <>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"GSIS ID No"}
                  value={basicInfo.governmentIssuedIds.gsisNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Pag-Ibig ID No"}
                  value={basicInfo.governmentIssuedIds.pagibigNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"PhilHealth No"}
                  value={
                    basicInfo.governmentIssuedIds.philhealthNumber || "N/A"
                  }
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"SSS No"}
                  value={basicInfo.governmentIssuedIds.sssNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"TIN"}
                  value={basicInfo.governmentIssuedIds.tinNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Agency Employee No"}
                  value={basicInfo.governmentIssuedIds.agencyNumber || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(basicInfo.personalInfo) ? (
          <>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Citizenship"}
                  value={basicInfo.personalInfo.citizenship || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Type"}
                  value={basicInfo.personalInfo.citizenshipType || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Country"}
                  value={basicInfo.personalInfo.country || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(basicInfo.address.residentialAddress) ? (
          <>
            <h5>Residential Address</h5>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"House/Block/Lot No."}
                  value={
                    basicInfo.address.residentialAddress.houseNumber || "N/A"
                  }
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Street"}
                  value={basicInfo.address.residentialAddress.street || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Subdivision/Village"}
                  value={
                    basicInfo.address.residentialAddress.subdivision || "N/A"
                  }
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Province"}
                  value={basicInfo.address.residentialAddress.province || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"City/Municipality"}
                  value={basicInfo.address.residentialAddress.city || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Barangay"}
                  value={basicInfo.address.residentialAddress.barangay || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Zip Code"}
                  value={basicInfo.address.residentialAddress.zipCode || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(basicInfo.address.permanentAddress) ? (
          <>
            <h5>Permanent Address</h5>
            <Row className="mt-2">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"House/Block/Lot No."}
                  value={
                    basicInfo.address.permanentAddress.houseNumber || "N/A"
                  }
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Street"}
                  value={basicInfo.address.permanentAddress.street || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Subdivision/Village"}
                  value={
                    basicInfo.address.permanentAddress.subdivision || "N/A"
                  }
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Province"}
                  value={basicInfo.address.permanentAddress.province || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"City/Municipality"}
                  value={basicInfo.address.permanentAddress.city || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Barangay"}
                  value={basicInfo.address.permanentAddress.barangay || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Zip Code"}
                  value={basicInfo.address.permanentAddress.zipCode || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {!isEmpty(basicInfo.personalInfo) ? (
          <>
            <Row>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Telephone No."}
                  value={basicInfo.personalInfo.email || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Mobile No."}
                  value={basicInfo.personalInfo.mobileNumber || "N/A"}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"E-mail Address"}
                  value={basicInfo.personalInfo.telNumber || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}
        <hr className="my-4"></hr>
      </Col>
    </Row>
  )
}

PersonalInformationView.propTypes = {
  basicInfo: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default PersonalInformationView
