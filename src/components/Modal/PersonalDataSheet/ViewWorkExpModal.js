import React from "react"
import PropTypes from "prop-types"

import OutlinedBox from "components/OutlinedBox"
import { Modal } from "react-bootstrap"
import { Col, Row } from "reactstrap"

const ViewWorkExpModal = props => {
  const { showView, handleCloseView, modalData, formatDate } = props
  return (
    <>
      <Modal show={showView} onHide={handleCloseView} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="pb-2 ">
            <Col md={12}>
              <h6>Inclusive Dates</h6>
              <Row>
                <Col md={6} className="mt-1">
                  <OutlinedBox
                    label={"From"}
                    value={formatDate(modalData.from) || "N/A"}
                  />
                </Col>
                <Col md={6} className="mt-1">
                  <OutlinedBox
                    label={"To"}
                    value={formatDate(modalData.to) || "N/A"}
                  />
                </Col>
              </Row>
            </Col>

            <Col md={4} className="mt-3">
              <OutlinedBox
                label={"Position Title"}
                value={modalData.positionTitle || "N/A"}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={"Department/Agency/Office/Company"}
                value={modalData.companyName || "N/A"}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={"Month Salary"}
                value={"₱" + modalData.monthlySalary || "N/A"}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={"Salary Grade & Step Increment"}
                value={modalData.salaryGrade || "N/A"}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={"Status of Appointment"}
                value={modalData.appointmentStatus || "N/A"}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={"Government Service"}
                value={modalData.isGovernmentService ? "Yes" : "No"}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

ViewWorkExpModal.propTypes = {
  showView: PropTypes.bool,
  handleCloseView: PropTypes.func,
  modalData: PropTypes.object,
  formatDate: PropTypes.func.isRequired,
}

export default ViewWorkExpModal
