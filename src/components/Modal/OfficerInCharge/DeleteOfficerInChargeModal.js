import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  removeUnassignOIC,
  fetchOICList,
  resetOICResponse,
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
      <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
        <ModalHeader toggle={handleCloseDel}>Confirm Unassignment</ModalHeader>

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
            toastType={'error'}
            notifMessage={errorDelUnassignOIC}
          />
        ) : null}

        {!isEmpty(delUnassignOIC) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Officer-In-Charge Removed'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p>Are you sure you want unassign this employee as OIC?</p>
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

DeleteOfficerInChargeModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteOfficerInChargeModal
