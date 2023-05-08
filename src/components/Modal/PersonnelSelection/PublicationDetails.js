import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import {
  fetchSelectedByAppointingAuth,
  fetchApplicants,
  fetchEndorsedApplicants,
  fetchShortlistedApplicants,
} from "store/actions"

import { Modal } from "react-bootstrap"
import {
  Col,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table
} from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

import classnames from "classnames"

const PublicationDetails = props => {
  const { showPublicationDetails, handleClosePublicationDetails, modalData } =
    props
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState("1")

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

  // redux state for list of applicants
  const { applicantList, loadingApplicants, errorApplicants } = useSelector(
    state => ({
      applicantList: state.applicants.applicantList,
      loadingApplicants: state.applicants.loading.loadingApplicants,
      errorApplicants: state.applicants.error.errorApplicants,
    })
  )

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

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  // get list of endorsed applicants
  useEffect(() => {
    if (showPublicationDetails) {
      dispatch(fetchSelectedByAppointingAuth(modalData.vppId))
      dispatch(fetchApplicants(modalData.vppId))
      dispatch(fetchEndorsedApplicants(modalData.vppId))
      dispatch(fetchShortlistedApplicants(modalData.vppId))
    }
  }, [showPublicationDetails])

  return (
    <>
      <Modal
        show={showPublicationDetails}
        onHide={handleClosePublicationDetails}
        // fullscreen={true}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Publication Details</Modal.Title>
        </Modal.Header>

        {/* Error Notif */}
        {errorSelectedByAppointingAuth ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorSelectedByAppointingAuth}
          />
        ) : null}

        {errorApplicants ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorApplicants}
          />
        ) : null}

        {errorEndorsedApplicants ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorEndorsedApplicants}
          />
        ) : null}

        {errorShortlistedApplicants ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorShortlistedApplicants}
          />
        ) : null}

        <Modal.Body>
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggle("1")
                    }}
                  >
                    Applied Applicants
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggle("2")
                    }}
                  >
                    Endorsed Applicants
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggle("3")
                    }}
                  >
                    Shortlisted Applicants
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "4",
                    })}
                    onClick={() => {
                      toggle("4")
                    }}
                  >
                    PSB Details
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "6",
                    })}
                    onClick={() => {
                      toggle("6")
                    }}
                  >
                    PSB Summary
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "5",
                    })}
                    onClick={() => {
                      toggle("5")
                    }}
                  >
                    Hired Applicants
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="p-3 text-muted">
                {/* Applied Applicants */}
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      {loadingApplicants ? (
                        <LoadingIndicator />
                      ) : !isEmpty(applicantList) ? (
                        <div className="table-responsive">
                          <Table className="table mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                                <th>Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {applicantList.map(applicant => (
                                <tr key={applicant._id}>
                                  <td>{applicant.fullName}</td>
                                  <td>{applicant.applicantType}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <p
                          style={{ textAlign: "center" }}
                          className="text-danger"
                        >
                          No Applicants
                        </p>
                      )}
                    </Col>
                  </Row>
                </TabPane>

                {/* Edoresed Applicants */}
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      {loadingEndorsedApplicants ? (
                        <LoadingIndicator />
                      ) : !isEmpty(endorsedApplicantList.postingApplicants) ? (
                        <div className="table-responsive">
                          <Table className="table mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endorsedApplicantList.postingApplicants.map(applicant => (
                                <tr key={applicant.postingApplicantId}>
                                  <td>{applicant.applicantName2}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          No Endoresed Applicants
                        </p>
                      )}
                    </Col>
                  </Row>
                </TabPane>

                {/* Shortlisted Applicants */}
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      {loadingShortlistedApplicants ? (
                        <LoadingIndicator />
                      ) : !isEmpty(shortlistedApplicantList) ? (
                        <div className="table-responsive">
                          <Table className="table mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {shortlistedApplicantList.map(applicant => (
                                <tr key={applicant.applicantEndorsementId}>
                                  <td>{applicant.applicantName}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <p
                          style={{ textAlign: "center" }}
                          className="text-danger"
                        >
                          No Shortlisted Applicants
                        </p>
                      )}
                    </Col>
                  </Row>
                </TabPane>

                {/* PSB Details */}
                <TabPane tabId="4">
                  <Row>
                    <Col sm="12"></Col>
                  </Row>
                </TabPane>

                {/* PSB Summary */}
                <TabPane tabId="6">
                  <Row>
                    <Col sm="12"></Col>
                  </Row>
                </TabPane>

                {/* Hired Applicants */}
                <TabPane tabId="5">
                  <Row>
                    <Col sm="12">
                      {loadingSelectedByAppointingAuth ? (
                        <LoadingIndicator />
                      ) : !isEmpty(selectedApplicantsByAppAuth) ? (
                        <div className="table-responsive">
                          <Table className="table mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedApplicantsByAppAuth.map(applicant => (
                                <tr key={applicant.applicantEndorsementId}>
                                  <td>{applicant.applicantName}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <p
                          style={{ textAlign: "center" }}
                          className="text-danger"
                        >
                          No Selected Applicants
                        </p>
                      )}
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            color="info"
            onClick={() => handleClosePublicationDetails()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

PublicationDetails.propTypes = {
  showPublicationDetails: PropTypes.bool,
  handleClosePublicationDetails: PropTypes.func,
  modalData: PropTypes.object,
}

export default PublicationDetails
