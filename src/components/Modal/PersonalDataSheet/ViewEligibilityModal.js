import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import OutlinedBox from 'components/OutlinedBox'
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

const ViewEligibilityModal = props => {
  const { showView, handleCloseView, modalData, formatDate } = props
  return (
    <>
      <Modal isOpen={showView} toggle={handleCloseView} size="lg" centered>
        <ModalHeader toggle={handleCloseView}></ModalHeader>

        <ModalBody>
          <Row className="pb-2">
            <Col md={6} className="mt-3">
              <OutlinedBox label={'Name'} value={modalData.name || 'N/A'} />
            </Col>
            <Col md={6} className="mt-3">
              <OutlinedBox label={'Rating'} value={modalData.rating || 'N/A'} />
            </Col>
            <Col md={6} className="mt-3">
              {/* If exam date for from and to is filled */}
              {!isEmpty(modalData.examDate) &&
              !isEmpty(modalData.examDate.to) ? (
                <OutlinedBox
                  label={'Date of Examination'}
                  value={
                    modalData.examDate.from + ' | ' + modalData.examDate.to
                  }
                />
              ) : !isEmpty(modalData.examDate) &&
                !isEmpty(modalData.examDate.from) ? ( // If exam date from is filled
                <OutlinedBox
                  label={'Date of Examination'}
                  value={modalData.examDate.from}
                />
              ) : null}
            </Col>
            <Col md={6} className="mt-3">
              <OutlinedBox
                label={'Place of Examination'}
                value={modalData.examPlace || 'N/A'}
              />
            </Col>
            <Col md={12} className="mt-3">
              <h6>License</h6>
              <Row>
                <Col md={6} className="mt-1">
                  <OutlinedBox
                    label={'Number'}
                    value={modalData.licenseNumber || 'N/A'}
                  />
                </Col>
                <Col md={6} className="mt-1">
                  <OutlinedBox
                    label={'Date of Validity'}
                    value={formatDate(modalData.validity) || 'N/A'}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

ViewEligibilityModal.propTypes = {
  showView: PropTypes.bool,
  handleCloseView: PropTypes.func,
  modalData: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.string,
    examDate: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }),
    examPlace: PropTypes.string,
    licenseNumber: PropTypes.string,
    validity: PropTypes.string,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default ViewEligibilityModal
