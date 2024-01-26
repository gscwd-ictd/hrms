import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import { removeUser, fetchUsers, resetUserResponse } from 'store/actions'
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

const DeleteUserModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeUser(modalData.employeeId))
  }

  // Redux state for response on removing a user
  const { removeUserResponse, loadingResponse, errorResponse } = useSelector(
    state => ({
      removeUserResponse: state.users.response.deleteRemoveUser,
      loadingResponse: state.users.loading.loadingResponse,
      errorResponse: state.users.error.errorResponse,
    })
  )

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetUserResponse())
    }
  }, [showDel])

  // Execute after delete confirmation
  useEffect(() => {
    if (!isEmpty(removeUserResponse)) {
      dispatch(fetchUsers())
      dispatch(resetUserResponse())
      handleCloseDel()
    }
  }, [removeUserResponse])

  return (
    <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
      <ModalHeader toggle={handleCloseDel}>Confirmation</ModalHeader>

      {/* Notifications */}
      {loadingResponse ? (
        <Alert
          color="info"
          className="alert-dismissible fade show m-3"
          role="alert"
        >
          <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
        </Alert>
      ) : null}

      {errorResponse ? (
        <ToastrNotification toastType={'error'} notifMessage={errorResponse} />
      ) : null}

      {!isEmpty(removeUserResponse) ? (
        <ToastrNotification
          toastType={'success'}
          notifMessage={'User Removed'}
        />
      ) : null}

      <ModalBody>
        <Row>
          <Col lg={12}>
            <p>
              Are you sure you want remove{' '}
              <span style={{ fontWeight: 'bold' }}>{modalData.fullName}</span>{' '}
              as RSP User?
            </p>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" color="success" onClick={submitDelete}>
          Confirm
        </Button>
        <Button color="danger" onClick={handleCloseDel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

DeleteUserModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteUserModal
