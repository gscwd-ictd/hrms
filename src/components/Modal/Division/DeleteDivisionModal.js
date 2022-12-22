import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert } from "reactstrap"
import PropTypes from "prop-types"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"
import { deleteDivision, getDivisions, resetDivision } from "store/actions"
import { useDispatch, useSelector } from "react-redux"

const DeleteDivisionModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(deleteDivision(modalData._id))
  }

  const { delDivisionRes, isLoading, error } = useSelector(state => ({
    delDivisionRes: state.divisionList.delDivisionRes,
    isLoading: state.divisionList.isLoading,
    error: state.divisionList.error,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetDivision())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(delDivisionRes)) {
      handleCloseDel()
      dispatch(getDivisions())
      dispatch(resetDivision())
    }
  }, [delDivisionRes])

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

        {!isEmpty(delDivisionRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Division Deleted"}
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

DeleteDivisionModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteDivisionModal
