import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import {
  updatePublicationStatus,
  getPublications,
  resetPublciationResponses,
} from "store/actions"

import { Modal } from "react-bootstrap"
import { Alert, Button } from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

import "./confirmationModal.scss"

const CloseInterviewModal = props => {
  const {
    showCloseInterview,
    modalData,
    prfId,
    handleClosePsbSummary,
    handleCloseCloseInterview,
  } = props
  const dispatch = useDispatch()

  // redux state for response
  const { responseInterviewDone, loadingCloseInterview, errorCloseInterview } =
    useSelector(state => ({
      responseInterviewDone: state.publications.response.publicationStatus,
      loadingCloseInterview:
        state.publications.loading.loadingPublicationStatus,
      errorCloseInterview: state.publications.error.errorPublicationStatus,
    }))

  const handleCloseInterview = () => {
    const interviewDoneData = {
      postingStatus: "Interview done",
    }
    dispatch(updatePublicationStatus(modalData.vppId, interviewDoneData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseInterviewDone)) {
      dispatch(getPublications(prfId))
      handleClosePsbSummary()
      handleCloseCloseInterview()
      dispatch(resetPublciationResponses())
    }
  }, [responseInterviewDone])

  return (
    <>
      <Modal
        show={showCloseInterview}
        onHide={handleCloseCloseInterview}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Close the Examination</Modal.Title> */}
        </Modal.Header>

        {/* Error Notif */}
        {errorCloseInterview ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorCloseInterview}
          />
        ) : null}

        {loadingCloseInterview ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {!isEmpty(responseInterviewDone) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Publciation status updated to 'Interview Done'"}
          />
        ) : null}

        <Modal.Body>
          <div className="d-grid gap-2">
            <h5 style={{ textAlign: "center" }}>
              Submission of PSB member ratings will now be closed. Are you sure
              you want to proceed?
            </h5>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button color="info" onClick={() => handleCloseInterview()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

CloseInterviewModal.propTypes = {
  showCloseInterview: PropTypes.bool,
  handleClosePsbSummary: PropTypes.func,
  handleCloseCloseInterview: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default CloseInterviewModal
