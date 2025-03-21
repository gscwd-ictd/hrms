import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { submitEmployeeSeparation } from 'store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './confirmationModal.scss'

const ConfirmationEmployeeSeparation = props => {
  const { isOpen, toggle, formData } = props
  const dispatch = useDispatch()

  // Redux state for submission of publication deadline
  const { responseSubmitEmpSeparation } = useSelector(state => ({
    responseSubmitEmpSeparation:
      state.serviceRecord.response.submitEmployeeSeparation,
  }))

  const handleConfirmation = () => {
    dispatch(submitEmployeeSeparation(formData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseSubmitEmpSeparation)) {
      toggle()
    }
  }, [responseSubmitEmpSeparation])

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
              This will end the service record of the employee.
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

ConfirmationEmployeeSeparation.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  formData: PropTypes.object,
}

export default ConfirmationEmployeeSeparation
