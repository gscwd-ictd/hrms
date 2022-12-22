import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert } from "reactstrap"
import PropTypes from "prop-types"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"
import {
  deleteDepartment,
  getDepartments,
  resetDepartment,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"

const DeleteDepartmentModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(deleteDepartment(modalData._id))
    // console.log(modalData._id)
  }

  const { delDepartmentRes, isLoading, error } = useSelector(state => ({
    delDepartmentRes: state.departmentList.delDepartmentRes,
    isLoading: state.departmentList.isLoading,
    error: state.departmentList.error,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetDepartment())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(delDepartmentRes)) {
      handleCloseDel()
      dispatch(getDepartments())
      dispatch(resetDepartment())
    }
  }, [delDepartmentRes])

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

        {!isEmpty(delDepartmentRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Department Deleted"}
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

DeleteDepartmentModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteDepartmentModal
