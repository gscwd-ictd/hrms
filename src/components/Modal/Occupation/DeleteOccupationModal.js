import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  removeOccupation,
  fetchOccupations,
  resetOccupationResponses,
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
      <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
        <ModalHeader toggle={handleCloseDel}>Confirm Deleted</ModalHeader>

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

        {!isEmpty(responseDel) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Occupation Deleted'}
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

DeleteOccupationModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteOccupationModal
