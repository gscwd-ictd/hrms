import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

import { Modal } from "react-bootstrap"
import { Col, Row, Input, Button } from "reactstrap"

const PrintResultsOfHiring = props => {
  const { showPrintRoH, handleClosePrintRoH } = props
  const [inputAppointmentDate, setInputAppointmentDate] = useState(new Date())

  const formatDate = aedate => {
    return dayjs(aedate).format("YYYY-MM-DD")
  }

  return (
    <>
      <Modal
        show={showPrintRoH}
        onHide={handleClosePrintRoH}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Effectivity Date</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col lg={12}>
              <Row className="justify-content-end">
                <Col>
                  <Input
                    type="date"
                    onChange={e => setInputAppointmentDate(e.target.value)}
                  />
                </Col>
                {/* <Col md={2}>
                  <Button
                    className="btn btn-info w-100"
                    onClick={() => handleFetchHiredApplicants()}
                    disabled={!isEmpty(inputAppointmentDate) ? false : true}
                  >
                    Search
                  </Button>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Link
            style={{ pointerEvents: "inherit" }}
            to={"/results-of-hiring-pdf/" + formatDate(inputAppointmentDate)}
            target="_blank"
            onClick={handleClosePrintRoH}
          >
            <Button
              className="btn btn-info waves-effect waves-light"
              disabled={!isEmpty(inputAppointmentDate) ? false : true}
            >
              <i className="bx bx-printer"></i> PDF Document
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

PrintResultsOfHiring.propTypes = {
  showPrintRoH: PropTypes.bool,
  handleClosePrintRoH: PropTypes.func,
}

export default PrintResultsOfHiring
