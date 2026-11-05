import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { submitServiceRecord } from 'store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './confirmationModal.scss'

const ConfirmationSubmitServiceRecord = props => {
  const { isOpen, toggle, formData } = props
  const dispatch = useDispatch()

  // Redux state for submission of publication deadline
  const { responseSubmitNSR } = useSelector(state => ({
    responseSubmitNSR: state.serviceRecord.response.submitNewServiceRecord,
  }))

  const handleConfirmation = () => {
    dispatch(submitServiceRecord(formData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseSubmitNSR)) {
      toggle()
    }
  }, [responseSubmitNSR])

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
              This will add another service record this employee.
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

ConfirmationSubmitServiceRecord.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  formData: PropTypes.object,
}

export default ConfirmationSubmitServiceRecord
