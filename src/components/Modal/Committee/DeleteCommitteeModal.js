import React, { useEffect } from 'react'
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
import PropTypes from 'prop-types'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import { isEmpty } from 'lodash'
import {
  removeCommittee,
  fetchCommittees,
  resetCommitteeResponse,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

const DeleteCommitteeModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeCommittee(modalData._id))
  }

  const { delCommitteeResponse, loadingCommittees, errorCommittees } =
    useSelector(state => ({
      delCommitteeResponse: state.committee.response.committee.delete,
      loadingCommittees: state.committee.loading.loadingCommittees,
      errorCommittees: state.committee.error.errorCommittees,
    }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetCommitteeResponse())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(delCommitteeResponse)) {
      dispatch(fetchCommittees())
      dispatch(resetCommitteeResponse())
      handleCloseDel()
    }
  }, [delCommitteeResponse])

  return (
    <>
      <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
        <ModalHeader toggle={handleCloseDel}>Confirm Delete</ModalHeader>

        {loadingCommittees ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {/* Error notification */}
        {errorCommittees ? (
          <ToastrNotification
            toastType={'errorCommittees'}
            notifMessage={errorCommittees}
          />
        ) : null}

        {/* Success notification */}
        {!isEmpty(delCommitteeResponse) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Committee Deleted'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p>Are you sure you want to permanently delete this committee?</p>
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

DeleteCommitteeModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteCommitteeModal
