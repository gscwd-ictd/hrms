import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSelectedByAppointingAuth,
  fetchApplicants,
  fetchEndorsedApplicants,
  fetchShortlistedApplicants,
  fetchPsbDetails,
  fetchPsbSummary,
} from 'store/actions'
import {
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import AppliedApplicants from './AppliedApplicants'
import EndorsedApplicants from './EndorsedApplicants'
import ShortlistedApplicants from './ShortlistedApplicants'
import HiredApplicants from './HiredApplicants'
import HrmpsbRating from './HrmpsbRating'
import HrmpsbDetails from './HrmpsbDetails'

const PublicationSummary = props => {
  const { showPublicationDetails, handleClosePublicationDetails, modalData } =
    props
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState('1')

  // redux state for all errors that each individual dispatch
  const {
    errorApplicants,
    errorSelectedByAppointingAuth,
    errorEndorsedApplicants,
    errorShortlistedApplicants,
    errorPsbDetails,
    errorPsbSummary,

    // Redux state for PSB remarks
    errorApplicantPsbRemarks,

    // Redux state for patch on swap of psb member
    patchSwapPsbMember,
  } = useSelector(state => ({
    errorApplicants: state.applicants.error.errorApplicants,
    errorSelectedByAppointingAuth:
      state.personnelSelectionBoard.error.errorSelectedByAppointingAuth,
    errorEndorsedApplicants: state.applicants.error.errorEndorsedApplicants,
    errorShortlistedApplicants:
      state.applicants.error.errorShortlistedApplicants,
    errorPsbDetails: state.personnelSelectionBoard.error.errorPsbDetails,
    errorPsbSummary: state.personnelSelectionBoard.error.errorPsbSummary,

    errorApplicantPsbRemarks:
      state.personnelSelectionBoard.error.errorApplicantPsbRemarks,

    patchSwapPsbMember:
      state.personnelSelectionBoard.response.patchSwapPsbMember,
  }))

  // set active tab from toggling the navigation
  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  const refetchPsbRating = () => {
    dispatch(fetchPsbSummary(modalData.vppId))
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (showPublicationDetails) {
      dispatch(fetchApplicants(modalData.vppId))
      dispatch(fetchEndorsedApplicants(modalData.vppId))
      dispatch(fetchShortlistedApplicants(modalData.vppId))
      dispatch(fetchPsbDetails(modalData.vppId))
      dispatch(fetchPsbSummary(modalData.vppId))

      dispatch(fetchSelectedByAppointingAuth(modalData.vppId))
    }
  }, [showPublicationDetails])

  // Reload table and reset form
  useEffect(() => {
    if (!isEmpty(patchSwapPsbMember)) {
      dispatch(fetchPsbDetails(modalData.vppId))
    }
  }, [patchSwapPsbMember])

  return (
    <>
      <Modal
        isOpen={showPublicationDetails}
        toggle={handleClosePublicationDetails}
        size="xl"
        centered
      >
        <ModalHeader toggle={handleClosePublicationDetails}>
          Publication Summary | {modalData.positionTitle}
        </ModalHeader>

        {/* Error Notif */}
        {errorSelectedByAppointingAuth ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSelectedByAppointingAuth}
          />
        ) : null}

        {errorApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorApplicants}
          />
        ) : null}

        {errorEndorsedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorEndorsedApplicants}
          />
        ) : null}

        {errorShortlistedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorShortlistedApplicants}
          />
        ) : null}

        {errorPsbDetails ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPsbDetails}
          />
        ) : null}

        {errorPsbSummary ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPsbSummary}
          />
        ) : null}

        {errorApplicantPsbRemarks ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorApplicantPsbRemarks}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col>
              {/* Tab Navigations */}
              <Nav tabs>
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames({
                      active: activeTab === '1',
                    })}
                    onClick={() => {
                      toggle('1')
                    }}
                  >
                    Applied Applicants
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames({
                      active: activeTab === '2',
                    })}
                    onClick={() => {
                      toggle('2')
                    }}
                  >
                    Endorsed Applicants
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames({
                      active: activeTab === '3',
                    })}
                    onClick={() => {
                      toggle('3')
                    }}
                  >
                    Shortlisted Applicants
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames({
                      active: activeTab === '4',
                    })}
                    onClick={() => {
                      toggle('4')
                    }}
                  >
                    HRMPSB Details
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames({
                      active: activeTab === '6',
                    })}
                    onClick={() => {
                      toggle('6')
                    }}
                  >
                    HRMPSB Rating
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames({
                      active: activeTab === '5',
                    })}
                    onClick={() => {
                      toggle('5')
                    }}
                  >
                    Hired Applicants
                  </NavLink>
                </NavItem>
              </Nav>

              {/* Tab Contents */}
              <TabContent activeTab={activeTab} className="p-3 text-muted">
                {/* Applied Applicants */}
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <AppliedApplicants />
                    </Col>
                  </Row>
                </TabPane>

                {/* Endorsed Applicants */}
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <EndorsedApplicants />
                    </Col>
                  </Row>
                </TabPane>

                {/* Shortlisted Applicants */}
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <ShortlistedApplicants />
                    </Col>
                  </Row>
                </TabPane>

                {/* PSB Details */}
                <TabPane tabId="4">
                  <Row>
                    <Col sm="12">
                      <HrmpsbDetails modalData={modalData} />
                    </Col>
                  </Row>
                </TabPane>

                {/* PSB Summary */}
                <TabPane tabId="6">
                  <Row>
                    <Col sm="12">
                      <>
                        <HrmpsbRating />
                        <div className="w-100 t-align-end">
                          <Button
                            onClick={() => refetchPsbRating()}
                            color="secondary"
                            outline
                            className="mt-2"
                          >
                            Reload <i className="fas fa-undo"></i>
                          </Button>
                        </div>
                      </>
                    </Col>
                  </Row>
                </TabPane>

                {/* Hired Applicants */}
                <TabPane tabId="5">
                  <Row>
                    <Col sm="12">
                      <HiredApplicants />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

PublicationSummary.propTypes = {
  showPublicationDetails: PropTypes.bool,
  handleClosePublicationDetails: PropTypes.func,
  modalData: PropTypes.object,
}

export default PublicationSummary
