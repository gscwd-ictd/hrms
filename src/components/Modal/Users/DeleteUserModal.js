import React, { useEffect } from "react"
import { removeUser, fetchUsers, resetUserResponse } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert } from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

const DeleteUserModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeUnassignOIC(modalData.employeeId))
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
    <>
      <Modal show={showDel} onHide={handleCloseDel} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

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
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorResponse}
          />
        ) : null}

        {!isEmpty(removeUserResponse) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"User Removed"}
          />
        ) : null}

        <Modal.Body>
          <Row>
            <Col lg={12}>
              <p>
                Are you sure you want remove{" "}
                <span style={{ fontWeight: "bold" }}>{modalData.fullName}</span>{" "}
                as HRMS User?
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" color="success" onClick={submitDelete}>
            Confirm
          </Button>
          <Button color="danger" onClick={handleCloseDel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

DeleteUserModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteUserModal
