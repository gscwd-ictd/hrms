import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { deleteOffice, getOffices, resetOffice } from 'store/actions'
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

const DeleteOfficeModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(deleteOffice(modalData._id))
  }

  const { delOfficeRes, isLoading, error } = useSelector(state => ({
    delOfficeRes: state.officeList.delOfficeRes,
    isLoading: state.officeList.isLoading,
    error: state.officeList.error,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetOffice())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(delOfficeRes)) {
      handleCloseDel()
      dispatch(getOffices())
      dispatch(resetOffice())
    }
  }, [delOfficeRes])

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

        {!isEmpty(delOfficeRes) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Office deleted'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p>Are you sure you want to permanently delete this office?</p>
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

DeleteOfficeModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteOfficeModal
