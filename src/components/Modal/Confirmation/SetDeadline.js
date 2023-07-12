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

const SetDeadline = props => {
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
      postingStatus: 'Interview done',
    }
    dispatch(updatePublicationStatus(modalData.vppId, interviewDoneData))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(responseInterviewDone)) {
      dispatch(getPublications(prfId))
      handleClosePsbSummary()
      handleCloseCloseInterview()
      dispatch(resetPublicationResponses())
    }
  }, [responseInterviewDone])

  return (
    <>
      <Modal
        isOpen={showCloseInterview}
        toggle={handleCloseCloseInterview}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <ModalHeader toggle={handleCloseCloseInterview}></ModalHeader>

        {/* Error Notif */}
        {errorCloseInterview ? (
          <ToastrNotification
            toastType={'error'}
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
            toastType={'success'}
            notifMessage={"Publication status updated to 'Interview Done'"}
          />
        ) : null}

        <ModalBody>
          <div className="d-grid gap-2">
            <h5 style={{ textAlign: 'center' }}>
              Submission of PSB member ratings will now be closed. Are you sure
              you want to proceed?
            </h5>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handleCloseInterview()}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

SetDeadline.propTypes = {
  showCloseInterview: PropTypes.bool,
  handleClosePsbSummary: PropTypes.func,
  handleCloseCloseInterview: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default SetDeadline
