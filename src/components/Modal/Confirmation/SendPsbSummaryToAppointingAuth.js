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

const SendPsbSummaryToAppointingAuth = props => {
  const { showSendPsbSummary, modalData, prfId, handleCloseSendPsbSummary } =
    props
  const dispatch = useDispatch()

  // Redux state for response
  const { responseSendPsbSummary, loadingSendPsbSummary, errorSendPsbSummary } =
    useSelector(state => ({
      responseSendPsbSummary: state.publications.response.publicationStatus,
      loadingSendPsbSummary:
        state.publications.loading.loadingPublicationStatus,
      errorSendPsbSummary: state.publications.error.errorPublicationStatus,
    }))

  const handleSendPsbSummary = () => {
    const psbSummaryData = {
      postingStatus: "Appointing authority selection",
    }
    dispatch(updatePublicationStatus(modalData.vppId, psbSummaryData))
  }

  // Get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseSendPsbSummary)) {
      dispatch(getPublications(prfId))
      handleCloseSendPsbSummary()
      dispatch(resetPublciationResponses())
    }
  }, [responseSendPsbSummary])

  return (
    <>
      <Modal
        show={showSendPsbSummary}
        onHide={handleCloseSendPsbSummary}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Close the Examination</Modal.Title> */}
        </Modal.Header>

        {/* Error Notif */}
        {errorSendPsbSummary ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorSendPsbSummary}
          />
        ) : null}

        {loadingSendPsbSummary ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {!isEmpty(responseSendPsbSummary) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={
              "Publciation status updated to 'Appointing authority selection'"
            }
          />
        ) : null}

        <Modal.Body>
          <div className="d-grid gap-2">
            <h5 style={{ textAlign: "center" }}>
              PSB summary will be sent to appointing authority for final
              selection. Are you sure you want to proceed?
            </h5>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button color="info" onClick={() => handleSendPsbSummary()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

SendPsbSummaryToAppointingAuth.propTypes = {
  showSendPsbSummary: PropTypes.bool,
  handleCloseSendPsbSummary: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default SendPsbSummaryToAppointingAuth
