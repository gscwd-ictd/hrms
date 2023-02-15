import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import {
  updatePublicationStatus,
  getPublications,
  resetPublicationResponses,
} from "store/actions"

import { Modal } from "react-bootstrap"
import { Alert, Button } from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

import "./confirmationModal.scss"

const CloseHiringModal = props => {
  const {
    showHiringDone,
    modalData,
    prfId,
    handleCloseHiringDone,
    handleCloseSelectedByAppAuth,
  } = props
  const dispatch = useDispatch()

  // redux state for response
  const {
    responseHiringProcessDone,
    loadingHiringProcessDone,
    errorHiringProcessDone,
  } = useSelector(state => ({
    responseHiringProcessDone: state.publications.response.publicationStatus,
    loadingHiringProcessDone:
      state.publications.loading.loadingPublicationStatus,
    errorHiringProcessDone: state.publications.error.errorPublicationStatus,
  }))

  const handleCloseHiring = () => {
    const hiringProcessDoneData = {
      postingStatus: "Hiring process done",
    }
    dispatch(updatePublicationStatus(modalData.vppId, hiringProcessDoneData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseHiringProcessDone)) {
      dispatch(getPublications(prfId))
      handleCloseHiringDone()
      handleCloseSelectedByAppAuth()
      dispatch(resetPublicationResponses())
    }
  }, [responseHiringProcessDone])

  return (
    <>
      <Modal
        show={showHiringDone}
        onHide={handleCloseHiringDone}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <Modal.Header closeButton></Modal.Header>

        {/* Error Notif */}
        {errorHiringProcessDone ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorHiringProcessDone}
          />
        ) : null}

        {loadingHiringProcessDone ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {!isEmpty(responseHiringProcessDone) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Publication status updated to 'Interview Done'"}
          />
        ) : null}

        <Modal.Body>
          <div className="d-grid gap-2">
            <h5 style={{ textAlign: "center" }}>
              Hiring process will be closed. This action can not be undone. Are
              you sure you want to proceed?
            </h5>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button color="info" onClick={() => handleCloseHiring()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

CloseHiringModal.propTypes = {
  showHiringDone: PropTypes.bool,
  handleCloseHiringDone: PropTypes.func,
  handleCloseSelectedByAppAuth: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default CloseHiringModal
