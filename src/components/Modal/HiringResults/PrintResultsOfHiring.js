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

const PrintResultsOfHiring = props => {
  const { showPrintRoH, handleClosePrintRoH } = props
  const [inputAppointmentDate, setInputAppointmentDate] = useState(new Date())

  const formatDate = aedate => {
    return dayjs(aedate).format('YYYY-MM-DD')
  }

  return (
    <>
      <Modal
        isOpen={showPrintRoH}
        toggle={handleClosePrintRoH}
        size="md"
        centered
      >
        <ModalHeader toggle={handleClosePrintRoH}>
          Select Effectivity Date
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Row className="justify-content-end">
                <Col>
                  <Input
                    type="date"
                    onChange={e => setInputAppointmentDate(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Link
            style={{ pointerEvents: 'inherit' }}
            to={'/results-of-hiring-pdf/' + formatDate(inputAppointmentDate)}
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
        </ModalFooter>
      </Modal>
    </>
  )
}

PrintResultsOfHiring.propTypes = {
  showPrintRoH: PropTypes.bool,
  handleClosePrintRoH: PropTypes.func,
}

export default PrintResultsOfHiring
