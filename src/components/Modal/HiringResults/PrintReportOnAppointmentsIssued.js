import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import {
  Col,
  Row,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

const PrintReportOnAppointmentsIssued = props => {
  const { showPrintRAI, handleClosePrintRAI } = props
  const [inputRAIMonth, setInputRAIMonth] = useState(new Date())

  const formatDate = aedate => {
    return dayjs(aedate).format('YYYY-MM')
  }

  return (
    <>
      <Modal
        isOpen={showPrintRAI}
        toggle={handleClosePrintRAI}
        size="md"
        centered
      >
        <ModalHeader toggle={handleClosePrintRAI}>Select Month</ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Row className="justify-content-end">
                <Col>
                  <Input
                    type="month"
                    onChange={e => setInputRAIMonth(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Link
            style={{ pointerEvents: 'inherit' }}
            to={
              '/report-on-appointments-issued-pdf/' + formatDate(inputRAIMonth)
            }
            target="_blank"
            onClick={handleClosePrintRAI}
          >
            <Button
              className="btn btn-info waves-effect waves-light"
              disabled={!isEmpty(inputRAIMonth) ? false : true}
            >
              <i className="bx bx-printer"></i> PDF Document
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </>
  )
}

PrintReportOnAppointmentsIssued.propTypes = {
  showPrintRAI: PropTypes.bool,
  handleClosePrintRAI: PropTypes.func,
}

export default PrintReportOnAppointmentsIssued
