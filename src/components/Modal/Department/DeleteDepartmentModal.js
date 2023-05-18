import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  deleteDepartment,
  getDepartments,
  resetDepartment,
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

const DeleteDepartmentModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(deleteDepartment(modalData._id))
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
      <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
        <ModalHeader toggle={handleCloseDel}>Confirm Delete</ModalHeader>

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
          <ToastrNotification toastType={'error'} notifMessage={error} />
        ) : null}

        {!isEmpty(delDepartmentRes) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Department Deleted'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p>Are you sure you want to permanently delete this entry?</p>
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
    </>
  )
}

DeleteDepartmentModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteDepartmentModal
