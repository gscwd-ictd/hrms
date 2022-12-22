import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSelectedByAppointingAuth } from "store/actions"

import { Modal } from "react-bootstrap"
import {
  Col,
  Row,
  Button,
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import SendApplicantHiredStatus from "../Confirmation/SendApplicantHiredStatus"
import DbmCscAdditionalInfo from "./DbmCscAdditionalInfo"

const HiredApplicants = props => {
  const { showHiredApplicants, handleCloseHiredApplicantsModal, modalData } =
    props
  const dispatch = useDispatch()

  // redux state for to be selected applicants by appointing authority
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

  const statusBadge = applicantStatus => {
    if (applicantStatus === "Accepted") {
      return (
        <Badge className="me-2 bg-success font-size-12">
          {applicantStatus}
        </Badge>
      )
    } else if (applicantStatus === "Declined") {
      return (
        <Badge className="me-2 bg-danger font-size-12">{applicantStatus}</Badge>
      )
    } else {
      return (
        <Badge className="me-2 font-size-12">Waiting for Confirmation</Badge>
      )
    }
  }

  // Actions for each applicant row
  const statusColumnActions = applicant => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          className="font-size-18"
          color="white"
          type="button"
          style={{ boxShadow: "none" }}
        >
          <div className="btn btn-sm btn-info">
            <i className="fas fa-user-edit"></i> Status
          </div>
        </DropdownToggle>
        <DropdownMenu direction="right">
          <DropdownItem
            onClick={() => changeApplicantStatus(applicant, "Accepted")}
          >
            Accepted
          </DropdownItem>
          <DropdownItem
            onClick={() => changeApplicantStatus(applicant, "Declined")}
          >
            Declined
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  const printableDocsColumnActions = applicant => {
    if (applicant.applicantStatus === "Accepted") {
      if (applicant.hasDbmCsc) {
        return (
          <UncontrolledDropdown>
            <DropdownToggle
              className="font-size-18"
              color="white"
              type="button"
              style={{ boxShadow: "none" }}
            >
              <div className="btn btn-sm btn-info">
                <i className="fas fa-print"></i> Printable Docs
              </div>
            </DropdownToggle>
            <DropdownMenu direction="right">
              <DropdownItem>
                <Link
                  style={{ pointerEvents: "inherit" }}
                  to={
                    "/position-description-dbm-csc-form-no-1/" +
                    applicant.postingApplicantId
                  }
                  target="_blank"
                >
                  DBM-CSC Form No. 1
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  style={{
                    pointerEvents: "inherit",
                  }}
                  to={"/cs-form-no-4/" + applicant.postingApplicantId}
                  target="_blank"
                >
                  CS Form No. 4
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  style={{
                    pointerEvents: "inherit",
                  }}
                  to={"/cs-form-no-33-b/" + applicant.postingApplicantId}
                  target="_blank"
                >
                  CS Form No. 33-B
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      } else {
        // Printing of Position Description Form DBM-CSC Form No. 1
        return (
          <Button
            onClick={() => openDbmCscModal(applicant)}
            className="btn btn-sm btn-info waves-effect waves-light"
            style={{ margin: "auto 0" }}
          >
            <i className="fas fa-file-alt"></i> Fill DBM-CSC Form
          </Button>
        )
      }
    }
  }

  /**
   * Modal
   */
  const [applicantData, setApplicantData] = useState({})

  // Open modal for hired applicants
  const [showDbmCscAdditionalInfo, setShowDbmCscAdditionalInfo] =
    useState(false)

  const handleCloseDbmCscAdditionalInfoModal = () =>
    setShowDbmCscAdditionalInfo(false)
  const handleShowDbmCscAdditionalInfoModal = () =>
    setShowDbmCscAdditionalInfo(true)

  const openDbmCscModal = rowData => {
    setApplicantData(rowData)
    handleShowDbmCscAdditionalInfoModal()
  }

  // Change applicant status modal
  const [showUpdateApplicantStatus, setShowUpdateApplicantStatus] =
    useState(false)
  const [strApplicantStatus, setStrApplicantStatus] = useState("")

  const handleCloseUpdateApplicantStatus = () =>
    setShowUpdateApplicantStatus(false)
  const handleShowUpdateApplicantStatus = () =>
    setShowUpdateApplicantStatus(true)

  const changeApplicantStatus = (rowData, strData) => {
    setApplicantData(rowData)
    setStrApplicantStatus(strData)
    handleShowUpdateApplicantStatus()
  }

  // get list of selected applicants by appointing authority
  useEffect(() => {
    if (showHiredApplicants) {
      dispatch(fetchSelectedByAppointingAuth(modalData.vppId))
    }
  }, [showHiredApplicants])

  return (
    <>
      <Modal
        show={showHiredApplicants}
        onHide={handleCloseHiredApplicantsModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hired Applicants</Modal.Title>
        </Modal.Header>

        {/* Error Notification */}
        {errorSelectedByAppointingAuth ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorSelectedByAppointingAuth}
          />
        ) : null}

        <Modal.Body>
          <Row>
            <Col lg={12}>
              {loadingSelectedByAppointingAuth ? (
                <LoadingIndicator />
              ) : (
                <div
                  className="table-responsive"
                  style={{ overflow: "visible" }}
                >
                  <Table className="table mb-0">
                    <thead className="thead-light">
                      <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {!isEmpty(selectedApplicantsByAppAuth) ? (
                        selectedApplicantsByAppAuth.map(applicant => {
                          return (
                            <tr key={applicant.postingApplicantId}>
                              {/* <td>{applicant.postingApplicantId}</td> */}
                              <td
                                style={{
                                  verticalAlign: "middle",
                                }}
                              >
                                {applicant.applicantName}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {statusBadge(applicant.applicantStatus)}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {statusColumnActions(applicant)}
                                  {printableDocsColumnActions(applicant)}
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan="2" className="ta-center">
                            No Applicants
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}

              <DbmCscAdditionalInfo
                applicantData={applicantData}
                showDbmCscAdditionalInfo={showDbmCscAdditionalInfo}
                handleCloseDbmCscAdditionalInfoModal={
                  handleCloseDbmCscAdditionalInfoModal
                }
                vppId={modalData.vppId}
              />

              <SendApplicantHiredStatus
                applicantData={applicantData}
                showUpdateApplicantStatus={showUpdateApplicantStatus}
                strApplicantStatus={strApplicantStatus}
                handleCloseUpdateApplicantStatus={
                  handleCloseUpdateApplicantStatus
                }
                vppId={modalData.vppId}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

HiredApplicants.propTypes = {
  showHiredApplicants: PropTypes.bool,
  handleCloseHiredApplicantsModal: PropTypes.func,
  modalData: PropTypes.object,
}

export default HiredApplicants
