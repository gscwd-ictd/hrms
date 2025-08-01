import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  removeEmployeeForTemporaryAssignment,
  fetchEmployeeTemporaryAssignmentList,
  resetEmployeeTemporaryAssignmentResponse,
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

import dayjs from 'dayjs'

const DeleteEmployeeTempAssignModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  // Submit delete temporary assignment
  const submitDelete = () => {
    dispatch(removeEmployeeForTemporaryAssignment(modalData.id))
  }

  // redux state for deleting employee temporary assignment
  const {
    deleteEmployeeTemporaryAssignment,
    loadingDeleteEmployeeTemporaryAssignment,
    errorDeleteEmployeeTemporaryAssignment,
  } = useSelector(state => ({
    deleteEmployeeTemporaryAssignment:
      state.temporaryAssignment.response.deleteEmployeeTemporaryAssignment,
    loadingDeleteEmployeeTemporaryAssignment:
      state.temporaryAssignment.loading
        .loadingDeleteEmployeeTemporaryAssignment,
    errorDeleteEmployeeTemporaryAssignment:
      state.temporaryAssignment.error.errorDeleteEmployeeTemporaryAssignment,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetEmployeeTemporaryAssignmentResponse())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(deleteEmployeeTemporaryAssignment)) {
      dispatch(fetchEmployeeTemporaryAssignmentList())
      dispatch(resetEmployeeTemporaryAssignmentResponse())
      handleCloseDel()
    }
  }, [deleteEmployeeTemporaryAssignment])

  return (
    <>
      <Modal isOpen={showDel} toggle={handleCloseDel} size="md" centered>
        <ModalHeader toggle={handleCloseDel}>Confirm Delete</ModalHeader>

        {loadingDeleteEmployeeTemporaryAssignment ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorDeleteEmployeeTemporaryAssignment ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorDeleteEmployeeTemporaryAssignment}
          />
        ) : null}

        {!isEmpty(deleteEmployeeTemporaryAssignment) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee temporary assignment deleted'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p>
                Are you sure you want to delete this employee temporary
                assignment?
              </p>
            </Col>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <span className="">Employee Name: </span>
                <span className="fw-bold ms-auto self-end text-end">
                  {modalData.fullName}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <span className="">Date Start: </span>
                <span className="fw-bold ms-auto self-end text-end">
                  {dayjs(modalData.dateFrom).format('MMMM DD, YYYY')}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <span className="">Organization Name: </span>
                <span className="fw-bold ms-auto self-end text-end">
                  {modalData.organizationName}
                </span>
              </div>
            </div>
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

DeleteEmployeeTempAssignModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteEmployeeTempAssignModal
