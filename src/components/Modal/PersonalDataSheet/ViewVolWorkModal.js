import React from 'react'
import PropTypes from 'prop-types'

import OutlinedBox from 'components/OutlinedBox'
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

const ViewVolWorkModal = props => {
  const { showView, handleCloseView, modalData, formatDate } = props
  return (
    <>
      <Modal isOpen={showView} toggle={handleCloseView} size="lg" centered>
        <ModalHeader toggle={handleCloseView}></ModalHeader>

        <ModalBody>
          <Row className="pb-2 ">
            <Col md={12} className="mt-2">
              <OutlinedBox
                label={'Name & Address of Organization'}
                value={modalData.organizationName || 'N/A'}
              />
            </Col>
            <Col md={12} className="mt-3">
              <h6>Inclusive Dates</h6>
              <Row>
                <Col md={6} className="mt-1">
                  <OutlinedBox
                    label={'From'}
                    value={formatDate(modalData.from) || 'N/A'}
                  />
                </Col>
                <Col md={6} className="mt-1">
                  <OutlinedBox
                    label={'To'}
                    value={formatDate(modalData.to) || 'N/A'}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={6} className="mt-3">
              <OutlinedBox
                label={'Number of numberOfHours'}
                value={modalData.numberOfHours || 'N/A'}
              />
            </Col>
            <Col md={6} className="mt-3">
              <OutlinedBox
                label={'Position/Nature of Work'}
                value={modalData.position || 'N/A'}
              />
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

ViewVolWorkModal.propTypes = {
  showView: PropTypes.bool,
  handleCloseView: PropTypes.func,
  modalData: PropTypes.object,
  formatDate: PropTypes.func.isRequired,
}

export default ViewVolWorkModal
