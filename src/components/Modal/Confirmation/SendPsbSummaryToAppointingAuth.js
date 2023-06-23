import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  updatePublicationStatus,
  getPublications,
  resetPublicationResponses,
} from 'store/actions'

import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

import './confirmationModal.scss'

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
      postingStatus: 'Appointing authority selection',
    }
    dispatch(updatePublicationStatus(modalData.vppId, psbSummaryData))
  }

  // Get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseSendPsbSummary)) {
      dispatch(getPublications(prfId))
      handleCloseSendPsbSummary()
      dispatch(resetPublicationResponses())
    }
  }, [responseSendPsbSummary])

  return (
    <>
      <Modal
        isOpen={showSendPsbSummary}
        toggle={handleCloseSendPsbSummary}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <ModalHeader toggle={handleCloseSendPsbSummary}></ModalHeader>

        {/* Error Notif */}
        {errorSendPsbSummary ? (
          <ToastrNotification
            toastType={'error'}
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
            toastType={'success'}
            notifMessage={
              "Publication status updated to 'Appointing authority selection'"
            }
          />
        ) : null}

        <ModalBody>
          <div className="d-grid gap-2">
            <h5 style={{ textAlign: 'center' }}>
              PSB summary will be sent to appointing authority for final
              selection. Are you sure you want to proceed?
            </h5>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handleSendPsbSummary()}>
            Yes
          </Button>
        </ModalFooter>
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
