import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSelectedByAppointingAuth } from 'store/actions'

import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import CloseHiringModal from '../Confirmation/CloseHiringModal'

const ViewSelectedByAppointingAuth = props => {
  const {
    showViewSelectedByAppAuth,
    handleCloseSelectedByAppAuth,
    modalData,
    yearFilter,
  } = props
  const dispatch = useDispatch()

  // redux state for to be selected applciants by appointing authority
  const {
    selectedApplicantsByAppAuth,
    loadingSelectedByAppointingAuth,
    errorSelectedByAppointingAuth,
  } = useSelector(state => ({
    selectedApplicantsByAppAuth:
      state.personnelSelectionBoard.response.selectedByAppointingAuth,
    loadingSelectedByAppointingAuth:
      state.personnelSelectionBoard.loading.loadingSelectedByAppointingAuth,
    errorSelectedByAppointingAuth:
      state.personnelSelectionBoard.error.errorSelectedByAppointingAuth,
  }))

  // Modal for Confirmation before proceeding
  const [showHiringDone, setShowHiringDone] = useState(false)

  const handleCloseHiringDone = () => setShowHiringDone(false)
  const handleShowHiringDone = () => setShowHiringDone(true)

  // get list of selected applicants by appointing authority
  useEffect(() => {
    if (showViewSelectedByAppAuth) {
      dispatch(fetchSelectedByAppointingAuth(modalData.vppId))
    }
  }, [showViewSelectedByAppAuth])

  return (
    <>
      <Modal
        isOpen={showViewSelectedByAppAuth}
        toggle={handleCloseSelectedByAppAuth}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseSelectedByAppAuth}>
          Selected by Appointing Authority
        </ModalHeader>

        {/* Error Notif */}
        {errorSelectedByAppointingAuth ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSelectedByAppointingAuth}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col>
              <p>
                The following applicant/s are selected for the position of{' '}
                {modalData.positionTitle}
              </p>
              {loadingSelectedByAppointingAuth ? (
                <LoadingIndicator />
              ) : !isEmpty(selectedApplicantsByAppAuth) ? (
                <ul>
                  {selectedApplicantsByAppAuth.map(applicant => (
                    <li key={applicant.applicantEndorsementId}>
                      {applicant.applicantName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: 'center' }} className="text-danger">
                  No Selected Applicants
                </p>
              )}
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            color="info"
            onClick={() => handleShowHiringDone()}
          >
            Close Hiring
          </Button>
        </ModalFooter>
      </Modal>

      <CloseHiringModal
        showHiringDone={showHiringDone}
        modalData={modalData}
        yearFilter={yearFilter}
        handleCloseHiringDone={handleCloseHiringDone}
        handleCloseSelectedByAppAuth={handleCloseSelectedByAppAuth}
      />
    </>
  )
}

ViewSelectedByAppointingAuth.propTypes = {
  showViewSelectedByAppAuth: PropTypes.bool,
  handleCloseSelectedByAppAuth: PropTypes.func,
  modalData: PropTypes.object,
  yearFilter: PropTypes.string,
}

export default ViewSelectedByAppointingAuth
