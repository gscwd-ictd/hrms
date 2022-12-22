import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert } from "reactstrap"
import PropTypes from "prop-types"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"
import {
  removeDutyResponsibility,
  fetchDutyResponsibilities,
  resetDutiesResponse,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"

const DeleteDutyModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeDutyResponsibility(modalData._id))
  }

  const {
    delDutiesRes,
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
  } = useSelector(state => ({
    delDutiesRes:
      state.dutiesResponsibilities.response.dutyResponsibility.delete,
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
    if (!isEmpty(delDutiesRes)) {
      dispatch(fetchDutyResponsibilities())
      dispatch(resetDutiesResponse())
      handleCloseDel()
    }
  }, [delDutiesRes])

  return (
    <>
      <Modal show={showDel} onHide={handleCloseDel} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

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
            toastType={"error"}
            notifMessage={errorDutyResponsibilities}
          />
        ) : null}

        {!isEmpty(delDutiesRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Duty and responsibility deleted"}
          />
        ) : null}

        <Modal.Body>
          <Row>
            <Col lg={12}>
              <p>
                Are you sure you want to permanently delete this duty and
                responsibility?
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" color="info" onClick={submitDelete}>
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

DeleteDutyModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteDutyModal
