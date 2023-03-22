import React, { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"
import { Can } from "casl/Can"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { getPublications } from "store/actions"

import TablePublications from "components/Table/TablePublications"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"

// modal components
import Deadline from "components/Modal/PersonnelSelection/Deadline"
import ExamScore from "components/Modal/PersonnelSelection/ExamScore"
import CloseApplicationPSBMemberAssignment from "components/Modal/PersonnelSelection/CloseApplicationPSBMemberAssignment"
import SendEndorsementToRequestingEntity from "components/Modal/PersonnelSelection/SendEndorsementToRequestingEntity"
import ViewShortlist from "components/Modal/PersonnelSelection/ViewShortlist"
import ScheduleExam from "components/Modal/PersonnelSelection/ScheduleExam"
import ScheduleInterview from "components/Modal/PersonnelSelection/ScheduleInterview"
import ExamDone from "components/Modal/PersonnelSelection/ExamDone"
import PsbSummary from "components/Modal/PersonnelSelection/PsbSummary"
import SendPsbSummaryToAppointingAuth from "components/Modal/Confirmation/SendPsbSummaryToAppointingAuth"
import ViewSelectedByAppointingAuth from "components/Modal/PersonnelSelection/ViewSelectedByAppointingAuth"
import SelectionDocuments from "components/Modal/PersonnelSelection/SelectionDocuments"
import SetAppointmentEffectivity from "components/Modal/PersonnelSelection/SetAppointmentEffectivity"
import PublicationDetails from "components/Modal/PersonnelSelection/PublicationDetails"

// style
import "styles/custom_gscwd/components/table.scss"
import { isEmpty } from "lodash"

const PublicationPositions = () => {
  const dispatch = useDispatch()
  const { prfId } = useParams()
  const location = useLocation()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "vppId",
      disableGlobalFilter: true,
    },
    {
      Header: "Position Title",
      accessor: "positionTitle",
    },
    {
      Header: "SG Level",
      accessor: "salaryGradeLevel",
    },
    {
      Header: "Publication Date",
      accessor: "postingDate",
      Cell: cell => dateRequested(cell),
    },
    {
      Header: "Deadline",
      accessor: "postingDeadline",
      Cell: cell => postingDeadlineBadge(cell),
    },
    {
      Header: "No. of Applicants",
      accessor: "numberOfApplicants",
    },
    {
      Header: "With Exam",
      accessor: "withExam",
      Filter: SelectColumnFilter,
      Cell: function WithExam(cell) {
        if (cell.row.values.withExam === "Yes") {
          return <p>Yes</p>
        } else {
          return <p>No</p>
        }
      },
    },
    {
      Header: "Publication Status",
      accessor: "postingStatus",
      Cell: cell => publicationStatusBadge(cell),
    },
    {
      Header: "Action",
      accessor: "",
      disableGlobalFilter: true,
      Cell: cell => rowActions(cell),
    },
  ]

  const dateRequested = cell => {
    return <>{dayjs(cell.value, "MMMM DD, YYYY").format("MMMM DD, YYYY")}</>
  }

  const postingDeadlineBadge = cell => {
    if (!isEmpty(cell.row.original.postingDeadline)) {
      if (cell.row.values.postingStatus === "Open for application") {
        if (dayjs().isBefore(dayjs(cell.row.original.postingDeadline), "day")) {
          return (
            <Badge className="me-2 bg-success font-size-12">
              {dayjs(cell.row.original.postingDeadline, "MMMM DD, YYYY").format(
                "MMMM DD, YYYY"
              )}
            </Badge>
          )
        } else if (
          dayjs().isSame(dayjs(cell.row.original.postingDeadline), "day")
        ) {
          return (
            <Badge className="me-2 bg-warning font-size-12">
              {dayjs(cell.row.original.postingDeadline, "MMMM DD, YYYY").format(
                "MMMM DD, YYYY"
              )}
            </Badge>
          )
        } else {
          return (
            <Badge className="me-2 bg-danger font-size-12">
              {dayjs(cell.row.original.postingDeadline, "MMMM DD, YYYY").format(
                "MMMM DD, YYYY"
              )}
            </Badge>
          )
        }
      } else {
        return (
          <>
            {dayjs(cell.row.original.postingDeadline, "MMMM DD, YYYY").format(
              "MMMM DD, YYYY"
            )}
          </>
        )
      }
    } else {
      return <></>
    }
  }

  const publicationStatusBadge = cell => {
    if (cell.row.values.postingStatus === "For CSC approval") {
      return (
        <Badge className="me-2 bg-warning font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    } else if (
      cell.row.values.postingStatus === "Open for application" ||
      cell.row.values.postingStatus === "Closed for application"
    ) {
      return (
        <Badge className="me-2 bg-info font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    } else if (
      cell.row.values.postingStatus === "Requesting entity selection done" ||
      cell.row.values.postingStatus === "Examination done" ||
      cell.row.values.postingStatus === "Interview done" ||
      cell.row.values.postingStatus === "Appointing authority selection done" ||
      cell.row.values.postingStatus === "Hiring process done"
    ) {
      return (
        <Badge className="me-2 bg-success font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    } else {
      return (
        <Badge className="me-2 font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    }
  }

  const rowActions = cell => {
    return (
      <UncontrolledDropdown className="ms-auto">
        <DropdownToggle className="font-size-18" color="white" type="button">
          <i className="mdi mdi-dots-horizontal"></i>
        </DropdownToggle>
        <DropdownMenu direction="right">
          {cell.row.values.postingStatus !== "Hiring process done" ? (
            <DropdownItem>
              <Link
                className="dropdown-item"
                to={
                  location.pathname +
                  "/publications/" +
                  cell.row.values.vppId +
                  "/applicants"
                }
              >
                Applicants
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus === "For CSC approval" ? (
            <DropdownItem onClick={() => deadline(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Deadline
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus === "Open for application" ? (
            <DropdownItem onClick={() => closeApplication(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Close Application
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus === "Closed for application" ? (
            <DropdownItem onClick={() => sendEndorsement(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Send Endorsement To R.E.
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus ===
          "Requesting entity selection done" ? (
            <>
              <DropdownItem onClick={() => shortlist(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  View Shortlist
                </Link>
              </DropdownItem>

              {cell.row.values.withExam === "Yes" ? (
                <DropdownItem
                  onClick={() => scheduleExamination(cell.row.values)}
                >
                  <Link className="dropdown-item" to="#">
                    Schedule for examination
                  </Link>
                </DropdownItem>
              ) : (
                <DropdownItem
                  onClick={() => scheduleInterview(cell.row.values)}
                >
                  <Link className="dropdown-item" to="#">
                    Schedule for interview
                  </Link>
                </DropdownItem>
              )}
            </>
          ) : null}

          {cell.row.values.postingStatus === "Scheduled for examination" ? (
            <>
              <DropdownItem onClick={() => examScore(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Examination Score
                </Link>
              </DropdownItem>

              <DropdownItem onClick={() => examDone(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Close Examination
                </Link>
              </DropdownItem>
            </>
          ) : null}

          {cell.row.values.postingStatus === "Examination done" ? (
            <DropdownItem onClick={() => scheduleInterview(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Schedule for interview
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus === "Scheduled for interview" ? (
            <>
              <DropdownItem onClick={() => psbSummary(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  HRMPSB Summary
                </Link>
              </DropdownItem>
            </>
          ) : null}

          {cell.row.values.postingStatus === "Interview done" ? (
            <>
              <DropdownItem onClick={() => sendPsbSummary(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Send to GM
                </Link>
              </DropdownItem>
            </>
          ) : null}

          {cell.row.values.postingStatus ===
          "Appointing authority selection done" ? (
            <>
              <DropdownItem
                onClick={() => viewSelectedByAppAuth(cell.row.values)}
              >
                <Link className="dropdown-item" to="#">
                  View Selected by GM
                </Link>
              </DropdownItem>
            </>
          ) : null}

          {cell.row.values.postingStatus === "Hiring process done" ? (
            <>
              <DropdownItem onClick={() => selectionDocuments(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Selection Documents
                </Link>
              </DropdownItem>

              <DropdownItem
                onClick={() => setAppointmentEffectivity(cell.row.values)}
              >
                <Link className="dropdown-item" to="#">
                  Set Appointment Effectivity
                </Link>
              </DropdownItem>
            </>
          ) : null}

          <DropdownItem onClick={() => publicationDetails(cell.row.values)}>
            <Link className="dropdown-item" to="#">
              Publication Details
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  // Redux state for publications
  const { publications, isLoading, error } = useSelector(state => ({
    publications: state.publications.publications,
    isLoading: state.publications.loading.publicationsLoading,
    error: state.publications.error.publicationsError,
  }))

  // Set data and columns to table
  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => publications, [publications])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Deadline Modal
  const [showDeadline, setShowDeadline] = useState(false)

  const handleCloseDeadline = () => setShowDeadline(false)
  const handleShowDeadline = () => setShowDeadline(true)

  const deadline = rowData => {
    setModalData(rowData)
    handleShowDeadline()
  }

  // Exam Score Modal
  const [showExamScore, setShowExamScore] = useState(false)

  const handleCloseExamScore = () => setShowExamScore(false)
  const handleShowExamScore = () => setShowExamScore(true)

  const examScore = rowData => {
    setModalData(rowData)
    handleShowExamScore()
  }

  // Close Application and Assign PSB Members Modal
  const [showCloseApplication, setShowCloseApplication] = useState(false)

  const handleCloseCloseApplication = () => setShowCloseApplication(false)
  const handleShowCloseApplication = () => setShowCloseApplication(true)

  const closeApplication = rowData => {
    setModalData(rowData)
    handleShowCloseApplication()
  }

  // Send endorsement of qualified applicants to requesting entity
  const [showSendEndorsement, setShowSendEndorsement] = useState(false)

  const handleCloseSendEndorsement = () => setShowSendEndorsement(false)
  const handleShowSendEndorsement = () => setShowSendEndorsement(true)

  const sendEndorsement = rowData => {
    setModalData(rowData)
    handleShowSendEndorsement()
  }

  // View shortlisted applicants. The ones chosen by the requesting entity
  const [showViewShortlist, setShowViewShortlist] = useState(false)

  const handleCloseViewShortlist = () => setShowViewShortlist(false)
  const handleShowViewShortlist = () => setShowViewShortlist(true)

  const shortlist = rowData => {
    setModalData(rowData)
    handleShowViewShortlist()
  }

  // Schedule examination of shortlisted applicants
  const [showScheduleExam, setShowScheduleExam] = useState(false)

  const handleCloseScheduleExam = () => setShowScheduleExam(false)
  const handleShowScheduleExam = () => setShowScheduleExam(true)

  const scheduleExamination = rowData => {
    setModalData(rowData)
    handleShowScheduleExam()
  }

  // End the examination to proceed to scheduling of interview
  const [showExamDone, setShowExamDone] = useState(false)

  const handleCloseExamDone = () => setShowExamDone(false)
  const handleShowExamDone = () => setShowExamDone(true)

  const examDone = rowData => {
    setModalData(rowData)
    handleShowExamDone()
  }

  // Schedule interview of shortlisted applicants
  const [showScheduleInterview, setShowScheduleInterview] = useState(false)

  const handleCloseScheduleInterview = () => setShowScheduleInterview(false)
  const handleShowScheduleInterview = () => setShowScheduleInterview(true)

  const scheduleInterview = rowData => {
    setModalData(rowData)
    handleShowScheduleInterview()
  }

  // PSB result summary
  const [showPsbSummary, setShowPsbSummary] = useState(false)

  const handleClosePsbSummary = () => setShowPsbSummary(false)
  const handleShowPsbSummary = () => setShowPsbSummary(true)

  const psbSummary = rowData => {
    setModalData(rowData)
    handleShowPsbSummary()
  }

  // Send PSB summary to Appointing Authority
  const [showSendPsbSummary, setShowSendPsbSummary] = useState(false)

  const handleCloseSendPsbSummary = () => setShowSendPsbSummary(false)
  const handleShowSendPsbSummary = () => setShowSendPsbSummary(true)

  const sendPsbSummary = rowData => {
    setModalData(rowData)
    handleShowSendPsbSummary()
  }

  // View selected by Appointing Authority
  const [showViewSelectedByAppAuth, setShowViewSelectedByAppAuth] =
    useState(false)

  const handleCloseSelectedByAppAuth = () => setShowViewSelectedByAppAuth(false)
  const handleShowSelectedByAppAuth = () => setShowViewSelectedByAppAuth(true)

  const viewSelectedByAppAuth = rowData => {
    setModalData(rowData)
    handleShowSelectedByAppAuth()
  }

  // View all selection documents for download
  const [showSelectionDocuments, setShowSelectionDocuments] = useState(false)

  const handleCloseSelectionDocuments = () => setShowSelectionDocuments(false)
  const handleShowSelectionDocuments = () => setShowSelectionDocuments(true)

  const selectionDocuments = rowData => {
    setModalData(rowData)
    handleShowSelectionDocuments()
  }

  // Set effectivity date of appointment
  const [showSetAppointmentEffectivity, setShowSetAppointmentEffectivity] =
    useState(false)

  const handleCloseSetAppointmentEffectivity = () =>
    setShowSetAppointmentEffectivity(false)
  const handleShowSetAppointmentEffectivity = () =>
    setShowSetAppointmentEffectivity(true)

  const setAppointmentEffectivity = rowData => {
    setModalData(rowData)
    handleShowSetAppointmentEffectivity()
  }

  /* 
    Publication details (applied applicants, endorsed applicants, shortlisted applicants, psb scoring, 
      hired applicants )
    */
  const [showPublicationDetails, setShowPublicationDetails] = useState(false)

  const handleClosePublicationDetails = () => setShowPublicationDetails(false)
  const handleShowPublicationDetails = () => setShowPublicationDetails(true)

  const publicationDetails = rowData => {
    setModalData(rowData)
    handleShowPublicationDetails()
  }

  useEffect(() => {
    dispatch(getPublications(prfId))
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Personnel Selection"
              titleUrl="/personnel-selection"
              breadcrumbItem="Publication Positions"
            />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <TablePublications columns={columns} data={data} />
                    )}

                    <Deadline
                      showDeadline={showDeadline}
                      modalData={modalData}
                      handleCloseDeadline={handleCloseDeadline}
                      prfId={prfId}
                    />

                    <ExamScore
                      showExamScore={showExamScore}
                      modalData={modalData}
                      handleCloseExamScore={handleCloseExamScore}
                    />

                    <CloseApplicationPSBMemberAssignment
                      showCloseApplication={showCloseApplication}
                      modalData={modalData}
                      handleCloseCloseApplication={handleCloseCloseApplication}
                      prfId={prfId}
                    />

                    <SendEndorsementToRequestingEntity
                      showSendEndorsement={showSendEndorsement}
                      modalData={modalData}
                      handleCloseSendEndorsement={handleCloseSendEndorsement}
                      prfId={prfId}
                    />

                    <ViewShortlist
                      showViewShortlist={showViewShortlist}
                      modalData={modalData}
                      handleCloseViewShortlist={handleCloseViewShortlist}
                    />

                    <ScheduleExam
                      showScheduleExam={showScheduleExam}
                      modalData={modalData}
                      handleCloseScheduleExam={handleCloseScheduleExam}
                      prfId={prfId}
                    />

                    <ExamDone
                      showExamDone={showExamDone}
                      modalData={modalData}
                      handleCloseExamDone={handleCloseExamDone}
                      prfId={prfId}
                    />

                    <ScheduleInterview
                      showScheduleInterview={showScheduleInterview}
                      modalData={modalData}
                      handleCloseScheduleInterview={
                        handleCloseScheduleInterview
                      }
                      prfId={prfId}
                    />

                    <PsbSummary
                      showPsbSummary={showPsbSummary}
                      modalData={modalData}
                      handleClosePsbSummary={handleClosePsbSummary}
                      prfId={prfId}
                    />

                    <SendPsbSummaryToAppointingAuth
                      showSendPsbSummary={showSendPsbSummary}
                      modalData={modalData}
                      handleCloseSendPsbSummary={handleCloseSendPsbSummary}
                      prfId={prfId}
                    />

                    <ViewSelectedByAppointingAuth
                      showViewSelectedByAppAuth={showViewSelectedByAppAuth}
                      modalData={modalData}
                      handleCloseSelectedByAppAuth={
                        handleCloseSelectedByAppAuth
                      }
                      prfId={prfId}
                    />

                    <SelectionDocuments
                      showSelectionDocuments={showSelectionDocuments}
                      modalData={modalData}
                      handleCloseSelectionDocuments={
                        handleCloseSelectionDocuments
                      }
                    />

                    <SetAppointmentEffectivity
                      showSetAppointmentEffectivity={
                        showSetAppointmentEffectivity
                      }
                      modalData={modalData}
                      handleCloseSetAppointmentEffectivity={
                        handleCloseSetAppointmentEffectivity
                      }
                    />

                    <PublicationDetails
                      showPublicationDetails={showPublicationDetails}
                      modalData={modalData}
                      handleClosePublicationDetails={
                        handleClosePublicationDetails
                      }
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

PublicationPositions.propTypes = {
  cell: PropTypes.any,
}

export default PublicationPositions
