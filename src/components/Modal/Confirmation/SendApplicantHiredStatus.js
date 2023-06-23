import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  updateApplicantApplicationStatus,
  fetchSelectedByAppointingAuth,
  resetApplicantsResponses,
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

const SendApplicantHiredStatus = props => {
  const {
    applicantData,
    strApplicantStatus,
    showUpdateApplicantStatus,
    handleCloseUpdateApplicantStatus,
    vppId,
  } = props
  const dispatch = useDispatch()

  const {
    patchApplicantApplicationStatus,
    loadingResponseApplicantApplicationStatus,
    errorApplicantApplicationStatus,
  } = useSelector(state => ({
    patchApplicantApplicationStatus:
      state.applicants.response.patchApplicantApplicationStatus,
    loadingResponseApplicantApplicationStatus:
      state.applicants.loading.loadingResponseApplicantApplicationStatus,
    errorApplicantApplicationStatus:
      state.applicants.error.errorApplicantApplicationStatus,
  }))

  const handleSendApplicantStatus = () => {
    const applicantStatus = { applicantStatus: strApplicantStatus }

    dispatch(
      updateApplicantApplicationStatus(
        applicantData.postingApplicantId,
        applicantStatus
      )
    )
  }

  // Get list of endorsed applicants
  useEffect(() => {
    if (!isEmpty(patchApplicantApplicationStatus)) {
      handleCloseUpdateApplicantStatus()
      dispatch(fetchSelectedByAppointingAuth(vppId))
      dispatch(resetApplicantsResponses())
    }
  }, [patchApplicantApplicationStatus])

  return (
    <>
      <Modal
        isOpen={showUpdateApplicantStatus}
        toggle={handleCloseUpdateApplicantStatus}
        size="sm"
        centered
        className="modal-confirmation"
      >
        <ModalHeader toggle={handleCloseUpdateApplicantStatus}></ModalHeader>

        {/* Error Notif */}
        {errorApplicantApplicationStatus ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorApplicantApplicationStatus}
          />
        ) : null}

        {loadingResponseApplicantApplicationStatus ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {!isEmpty(patchApplicantApplicationStatus) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Applicant Status Updated'}
          />
        ) : null}

        <ModalBody>
          <div className="d-grid gap-2" style={{ textAlign: 'center' }}>
            <h5>
              Applicant status will be set to &quot;
              <span className="text-danger">{strApplicantStatus}</span>&quot;
            </h5>
            <h5>Do you want to proceed?</h5>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handleSendApplicantStatus()}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

SendApplicantHiredStatus.propTypes = {
  showUpdateApplicantStatus: PropTypes.bool,
  strApplicantStatus: PropTypes.string,
  handleCloseUpdateApplicantStatus: PropTypes.func,
  applicantData: PropTypes.shape({
    applicantEndorsementId: PropTypes.string,
    postingApplicantId: PropTypes.string,
    applicantName: PropTypes.string,
  }),
  vppId: PropTypes.string,
}

export default SendApplicantHiredStatus
