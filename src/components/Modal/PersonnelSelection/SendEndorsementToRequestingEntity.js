import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  getPublications,
  addEndorsementToReqEntity,
  fetchEndorsedApplicants,
} from 'store/actions'

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
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const SendEndorsementToRequestingEntity = props => {
  const { showSendEndorsement, handleCloseSendEndorsement, modalData, prfId } =
    props
  const dispatch = useDispatch()

  // redux state for response after sending the endorsement of qualified applicants
  const {
    responseEndorsementToRequestingEntity,
    loadingEndorsementToRequestingEntity,
    errorEndorsementToRequestingEntity,
  } = useSelector(state => ({
    responseEndorsementToRequestingEntity:
      state.publications.response.endorsementToRequestingEntity,
    loadingEndorsementToRequestingEntity:
      state.publications.loading.loadingEndorsementToRequestingEntity,
    errorEndorsementToRequestingEntity:
      state.publications.error.errorEndorsementToRequestingEntity,
  }))

  // redux state for to be endorsed applciants
  const {
    endorsedApplicantList,
    loadingEndorsedApplicants,
    errorEndorsedApplicants,
  } = useSelector(state => ({
    endorsedApplicantList: state.applicants.endorsedApplicantList,
    loadingEndorsedApplicants:
      state.applicants.loading.loadingEndorsedApplicants,
    errorEndorsedApplicants: state.applicants.error.errorEndorsedApplicants,
  }))

  // function to submit endorsement
  const handleSubmit = () => {
    dispatch(addEndorsementToReqEntity(modalData.vppId))
  }

  // if post is success
  useEffect(() => {
    if (!isEmpty(responseEndorsementToRequestingEntity)) {
      handleCloseSendEndorsement()
      dispatch(getPublications(prfId))
    }
  }, [responseEndorsementToRequestingEntity])

  // get list of endorsed applicants
  useEffect(() => {
    if (showSendEndorsement) {
      dispatch(fetchEndorsedApplicants(modalData.vppId))
    }
  }, [showSendEndorsement])

  return (
    <>
      <Modal
        isOpen={showSendEndorsement}
        toggle={handleCloseSendEndorsement}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseSendEndorsement}>
          Send endorsement to{' '}
          {endorsedApplicantList.requestingEntity.name || 'REQUESTING ENTITY'}
        </ModalHeader>

        {/* Error Notif */}
        {errorEndorsementToRequestingEntity ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorEndorsementToRequestingEntity}
          />
        ) : null}

        {errorEndorsedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorEndorsedApplicants}
          />
        ) : null}

        {loadingEndorsementToRequestingEntity ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {!isEmpty(responseEndorsementToRequestingEntity) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Successful endorsement to requesting entity.'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col>
              {loadingEndorsedApplicants ? (
                <LoadingIndicator />
              ) : !isEmpty(endorsedApplicantList.postingApplicants) ? (
                <ul>
                  {endorsedApplicantList.postingApplicants.map(applicant => (
                    <li key={applicant.postingApplicantId}>
                      {applicant.applicantName2}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: 'center' }} className="text-danger">
                  No Qualified Applicants
                </p>
              )}
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <div className="d-grid gap-2">
            <p>
              All qualified applicants will be sent to{' '}
              {endorsedApplicantList.requestingEntity.name +
                ' | ' +
                endorsedApplicantList.requestingEntity.position +
                ' ' || 'REQUESTING ENTITY'}
              for shortlisting. Are you sure you want to proceed?
            </p>
            <Button type="button" color="info" onClick={() => handleSubmit()}>
              Send
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

SendEndorsementToRequestingEntity.propTypes = {
  showSendEndorsement: PropTypes.bool,
  handleCloseSendEndorsement: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default SendEndorsementToRequestingEntity
