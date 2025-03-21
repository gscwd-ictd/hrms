import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmpBasicInfo } from 'store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './confirmationModal.scss'

const ConfirmationUpdateEmployeeInfo = props => {
  const { isOpen, toggle, formData } = props
  const dispatch = useDispatch()

  // Redux state
  const { responseUpdateEmpBasicInformation } = useSelector(state => ({
    responseUpdateEmpBasicInformation:
      state.employee.response.updateEmpBasicInfo,
  }))

  const handleConfirmation = () => {
    dispatch(updateEmpBasicInfo(formData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseUpdateEmpBasicInformation)) {
      toggle()
    }
  }, [responseUpdateEmpBasicInformation])

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
              This will update the employee basic information.
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

ConfirmationUpdateEmployeeInfo.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  formData: PropTypes.object,
}

export default ConfirmationUpdateEmployeeInfo
