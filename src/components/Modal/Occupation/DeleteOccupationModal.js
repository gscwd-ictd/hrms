import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert } from "reactstrap"
import PropTypes from "prop-types"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"
import {
  removeOccupation,
  fetchOccupations,
  resetOccupationResponses,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"

const DeleteOccupationModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeOccupation(modalData._id))
  }

  const { responseDel, isLoading, error } = useSelector(state => ({
    responseDel: state.Occupation.response.occupation.delete,
    isLoading: state.Occupation.loading.occupationLoading,
    error: state.Occupation.error.occupationError,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetOccupationResponses())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseDel)) {
      dispatch(fetchOccupations())
      dispatch(resetOccupationResponses())
      handleCloseDel()
    }
  }, [responseDel])

  return (
    <>
      <Modal show={showDel} onHide={handleCloseDel} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        {isLoading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {error ? (
          <ToastrNotification toastType={"error"} notifMessage={error} />
        ) : null}

        {!isEmpty(responseDel) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Occupation Deleted"}
          />
        ) : null}

        <Modal.Body>
          <Row>
            <Col lg={12}>
              <p>Are you sure you want to permanently delete this entry?</p>
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

DeleteOccupationModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteOccupationModal
