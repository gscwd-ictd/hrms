import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert } from "reactstrap"
import PropTypes from "prop-types"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"
import {
  removeUnassignOIC,
  fetchOICList,
  resetOICResponse,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"

const DeleteOfficerInChargeModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeUnassignOIC(modalData._id))
  }

  // Redux state for response on unassigning OIC
  const { delUnassignOIC, loadingDelUnassignOIC, errorDelUnassignOIC } =
    useSelector(state => ({
      delUnassignOIC: state.officerInCharge.response.delUnassignOIC,
      loadingDelUnassignOIC:
        state.officerInCharge.loading.loadingDelUnassignOIC,
      errorDelUnassignOIC: state.officerInCharge.error.errorDelUnassignOIC,
    }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetOICResponse())
    }
  }, [showDel])

  // Execute after delete confirmation
  useEffect(() => {
    if (!isEmpty(delUnassignOIC)) {
      dispatch(fetchOICList())
      dispatch(resetOICResponse())
      handleCloseDel()
    }
  }, [delUnassignOIC])

  return (
    <>
      <Modal show={showDel} onHide={handleCloseDel} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Unassignment</Modal.Title>
        </Modal.Header>

        {/* Notifications */}
        {loadingDelUnassignOIC ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorDelUnassignOIC ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorDelUnassignOIC}
          />
        ) : null}

        {!isEmpty(delUnassignOIC) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Officer-In-Charge Removed"}
          />
        ) : null}

        <Modal.Body>
          <Row>
            <Col lg={12}>
              <p>Are you sure you want unassign this employee as OIC?</p>
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

DeleteOfficerInChargeModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteOfficerInChargeModal
