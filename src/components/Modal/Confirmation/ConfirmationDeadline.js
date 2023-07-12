import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { updatePublicationStatus } from 'store/actions'

import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

import './confirmationModal.scss'

const ConfirmationDeadline = props => {
  const {
    showConfirmationSetDeadline,
    modalData,
    formData,
    handleCloseConfirmationSetDeadline,
  } = props
  const dispatch = useDispatch()

  // Redux state for submission of publication deadline
  const { responsePublicationDeadline } = useSelector(state => ({
    responsePublicationDeadline: state.publications.response.publicationStatus,
  }))

  const handleConfirmSetDeadline = () => {
    dispatch(updatePublicationStatus(modalData.vppId, formData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responsePublicationDeadline)) {
      handleCloseConfirmationSetDeadline()
    }
  }, [responsePublicationDeadline])

  return (
    <>
      <Modal
        isOpen={showConfirmationSetDeadline}
        toggle={handleCloseConfirmationSetDeadline}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <ModalHeader toggle={handleCloseConfirmationSetDeadline}></ModalHeader>

        <ModalBody>
          <div className="d-grid gap-2" style={{ textAlign: 'center' }}>
            <p>
              Setting deadline date of publication{' '}
              <span className="text-danger">
                {modalData.positionTitle || ''}
              </span>
              .
            </p>
            <p>This will also open the publication for application.</p>
            <p className="fw-bold">Do you want to proceed?</p>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleCloseConfirmationSetDeadline}>
            No
          </Button>
          <Button color="info" onClick={() => handleConfirmSetDeadline()}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

ConfirmationDeadline.propTypes = {
  showConfirmationSetDeadline: PropTypes.bool,
  modalData: PropTypes.object,
  formData: PropTypes.shape({
    postingDeadline: PropTypes.string.isRequired,
    postingStatus: PropTypes.string.isRequired,
  }),
  handleCloseConfirmationSetDeadline: PropTypes.func,
}

export default ConfirmationDeadline
