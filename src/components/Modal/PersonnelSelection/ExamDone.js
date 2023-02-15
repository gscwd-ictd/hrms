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

const ExamDone = props => {
  const { showExamDone, handleCloseExamDone, modalData, prfId } = props
  const dispatch = useDispatch()

  // redux state for response
  const { responseExamDone, loadingExamDone, errorExamDone } = useSelector(
    state => ({
      responseExamDone: state.publications.response.publicationStatus,
      loadingExamDone: state.publications.loading.loadingPublicationStatus,
      errorExamDone: state.publications.error.errorPublicationStatus,
    })
  )

  const handleCloseExamination = () => {
    const examDoneData = {
      postingStatus: "Examination done",
    }
    dispatch(updatePublicationStatus(modalData.vppId, examDoneData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseExamDone)) {
      dispatch(getPublications(prfId))
      handleCloseExamDone()
      dispatch(resetPublicationResponses())
    }
  }, [responseExamDone])

  return (
    <>
      <Modal
        show={showExamDone}
        onHide={handleCloseExamDone}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Close the Examination</Modal.Title> */}
        </Modal.Header>

        {/* Error Notif */}
        {errorExamDone ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorExamDone}
          />
        ) : null}

        {/* Loading Notif */}
        {loadingExamDone ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {/* Success Notif */}
        {!isEmpty(responseExamDone) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Examination scheduled"}
          />
        ) : null}

        <Modal.Body>
          <div className="d-grid gap-2">
            <h5 style={{ textAlign: "center" }}>
              Submission of applicants examination results will now be closed.
              Are you sure you want to proceed?
            </h5>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button color="info" onClick={() => handleCloseExamination()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ExamDone.propTypes = {
  showExamDone: PropTypes.bool,
  handleCloseExamDone: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default ExamDone
