import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { submitNosiForApproval } from 'store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './confirmationModal.scss'

const ConfirmationNosiIssuance = props => {
  const { isOpen, toggle, formData } = props
  const dispatch = useDispatch()

  // Redux state for submission of nosi to GM
  const { responseSubmitNosiForApproval } = useSelector(state => ({
    responseSubmitNosiForApproval:
      state.noticeOfStepIncrement.response.submitNosiForApproval,
  }))

  const handleConfirmation = () => {
    dispatch(submitNosiForApproval(formData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseSubmitNosiForApproval)) {
      toggle()
    }
  }, [responseSubmitNosiForApproval])

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <ModalHeader toggle={toggle}></ModalHeader>

        <ModalBody>
          <div className="d-grid gap-2" style={{ textAlign: 'center' }}>
            <p className="fw-bold fs-5">
              This Notice of Step Increment will be sent to the General
              Manager&apos;s Portal
            </p>
            <p className="fw-bold fs-5">Do you want to proceed?</p>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            No
          </Button>
          <Button color="info" onClick={handleConfirmation}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

ConfirmationNosiIssuance.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  formData: PropTypes.object,
}

export default ConfirmationNosiIssuance
