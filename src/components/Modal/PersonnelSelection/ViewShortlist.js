import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { fetchShortlistedApplicants } from 'store/actions'

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const ViewShortlist = props => {
  const { showViewShortlist, handleCloseViewShortlist, modalData } = props
  const dispatch = useDispatch()

  // redux state for to be shortlisted applciants
  const {
    shortlistedApplicantList,
    loadingShortlistedApplicants,
    errorShortlistedApplicants,
  } = useSelector(state => ({
    shortlistedApplicantList: state.applicants.shortlistedApplicantList,
    loadingShortlistedApplicants:
      state.applicants.loading.loadingShortlistedApplicants,
    errorShortlistedApplicants:
      state.applicants.error.errorShortlistedApplicants,
  }))

  // get list of endorsed applicants
  useEffect(() => {
    if (showViewShortlist) {
      dispatch(fetchShortlistedApplicants(modalData.vppId))
    }
  }, [showViewShortlist])

  return (
    <>
      <Modal
        isOpen={showViewShortlist}
        toggle={handleCloseViewShortlist}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseViewShortlist}>
          Shortlisted Applicants
        </ModalHeader>

        {/* Error Notif */}
        {errorShortlistedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorShortlistedApplicants}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col>
              {loadingShortlistedApplicants ? (
                <LoadingIndicator />
              ) : !isEmpty(shortlistedApplicantList) ? (
                <ul>
                  {shortlistedApplicantList.map(applicant => (
                    <li key={applicant.applicantEndorsementId}>
                      {applicant.applicantName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: 'center' }} className="text-danger">
                  No Shortlisted Applicants
                </p>
              )}
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

ViewShortlist.propTypes = {
  showViewShortlist: PropTypes.bool,
  handleCloseViewShortlist: PropTypes.func,
  modalData: PropTypes.object,
}

export default ViewShortlist
