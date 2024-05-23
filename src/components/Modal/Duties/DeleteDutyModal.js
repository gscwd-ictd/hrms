import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  resetDutiesResponse,
  removeOccupationalDutyResponsibility,
  fetchOccupationDuties,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  Col,
  Row,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const DeleteDutyModal = props => {
  const { showDel, handleCloseDel, modalData, occupationId } = props
  const dispatch = useDispatch()

  // Submit delete occupational duty and responsibility
  const submitDelete = () => {
    dispatch(
      removeOccupationalDutyResponsibility(
        occupationId,
        modalData.odrId,
        modalData.drId
      )
    )
  }

  // redux state for delete occupational duty and responsibility
  const {
    deleteOccupationalDutyResponsibility,
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
  } = useSelector(state => ({
    deleteOccupationalDutyResponsibility:
      state.dutiesResponsibilities.response.occupationalDutyResponsibility
        .delete,
    loadingDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingDutyResponsibilities,
    errorDutyResponsibilities:
      state.dutiesResponsibilities.error.errorDutyResponsibilities,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetDutiesResponse())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(deleteOccupationalDutyResponsibility)) {
      dispatch(fetchOccupationDuties(occupationId))
      dispatch(resetDutiesResponse())
      handleCloseDel()
    }
  }, [deleteOccupationalDutyResponsibility])

  return (
    <>
      <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
        <ModalHeader toggle={handleCloseDel}>Confirm Delete</ModalHeader>

        {loadingDutyResponsibilities ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorDutyResponsibilities ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorDutyResponsibilities}
          />
        ) : null}

        {!isEmpty(deleteOccupationalDutyResponsibility) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Occupational duty and responsibility deleted'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p>
                Are you sure you want to permanently delete this occupational
                duty and responsibility?
              </p>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" color="info" onClick={submitDelete}>
            Confirm
          </Button>
          <Button color="danger" onClick={handleCloseDel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

DeleteDutyModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
  occupationId: PropTypes.string,
}

export default DeleteDutyModal
