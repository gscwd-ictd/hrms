import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Link, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovedPublicationPositions } from 'store/actions'
import { publicationStatus } from 'constants/publicationStatus'
import TablePublications from 'components/Table/TablePublications'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'
import { SelectDateColumnFilter } from 'components/Filters/SelectDateColumnFilter'
import {
  Row,
  Col,
  Label,
  Input,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import { isEmpty } from 'lodash'
import { Can } from 'casl/Can'
import { DateFormatter } from 'functions/DateFormatter'

// modal components
import Deadline from 'components/Modal/PersonnelSelection/Deadline'
import ExamScore from 'components/Modal/PersonnelSelection/ExamScore'
import CloseApplicationPSBMemberAssignment from 'components/Modal/PersonnelSelection/CloseApplicationPSBMemberAssignment'
import SendEndorsementToRequestingEntity from 'components/Modal/PersonnelSelection/SendEndorsementToRequestingEntity'
import ViewShortlist from 'components/Modal/PersonnelSelection/ViewShortlist'
import ScheduleExam from 'components/Modal/PersonnelSelection/ScheduleExam'
import ScheduleInterview from 'components/Modal/PersonnelSelection/ScheduleInterview'
import ExamDone from 'components/Modal/PersonnelSelection/ExamDone'
import PsbRating from 'components/Modal/PersonnelSelection/PsbRating'
import SendPsbSummaryToAppointingAuth from 'components/Modal/Confirmation/SendPsbSummaryToAppointingAuth'
import ViewSelectedByAppointingAuth from 'components/Modal/PersonnelSelection/ViewSelectedByAppointingAuth'
import SelectionDocuments from 'components/Modal/PersonnelSelection/SelectionDocuments'
import SetAppointmentEffectivity from 'components/Modal/PersonnelSelection/SetAppointmentEffectivity'
import PublicationSummary from 'components/Modal/PersonnelSelection/PublicationSummary/index'

// style
import 'styles/custom_gscwd/components/table.scss'

const PublicationPositions = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [yearFilter, setYearFilter] = useState(dayjs().year())
  const [debouncedYearFilter, setDebouncedYearFilter] = useState(dayjs().year())

  // Redux state of list of prf that was approved
  const { publicationPositions, loadingPubPos, errorPubPos } = useSelector(
    state => ({
      publicationPositions: state.positionRequest.publicationPositions,
      loadingPubPos: state.positionRequest.loading.loadingPublicationPositions,
      errorPubPos: state.positionRequest.error.errorPublicationPositions,
    })
  )

  // Redux state for patch on swap of psb member
  const { patchSwapPsbMember, errorPatchSwapPsbMember } = useSelector(
    state => ({
      patchSwapPsbMember:
        state.personnelSelectionBoard.response.patchSwapPsbMember,
      errorPatchSwapPsbMember:
        state.personnelSelectionBoard.error.errorPatchSwapPsbMember,
    })
  )

  const tblColumns = [
    {
      Header: 'ID',
      accessor: 'vppId',
      disableGlobalFilter: true,
    },
    {
      Header: 'Position Title',
      accessor: 'positionTitle',
    },
    {
      Header: 'Plantilla No.',
      accessor: 'itemNumber',
    },
    {
      Header: 'Requested by',
      accessor: 'requestingEntity',
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Application Deadline',
      accessor: 'postingDeadline',
      Cell: cell => postingDeadlineBadge(cell),
    },
    {
      Header: 'Interview Schedule',
      accessor: 'schedule',
      Filter: SelectDateColumnFilter,
      Cell: cell => {
        return DateFormatter(
          cell.row.original.schedule,
          'MMMM DD, YYYY hh:mm A'
        )
      },
    },
    {
      Header: 'Publication Status',
      accessor: 'postingStatus',
      Filter: SelectColumnFilter,
      Cell: cell => publicationStatusBadge(cell),
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: cell => rowActions(cell),
    },
  ]

  const postingDeadlineBadge = cell => {
    if (!isEmpty(cell.row.original.postingDeadline)) {
      if (cell.row.values.postingStatus === publicationStatus.OPENFORAPP) {
        if (dayjs().isBefore(dayjs(cell.row.original.postingDeadline), 'day')) {
          return (
            <Badge className="me-2 bg-success font-size-12">
              {dayjs(cell.row.original.postingDeadline, 'MMMM DD, YYYY').format(
                'MMMM DD, YYYY'
              )}
            </Badge>
          )
        } else if (
          dayjs().isSame(dayjs(cell.row.original.postingDeadline), 'day')
        ) {
          return (
            <Badge className="me-2 bg-warning font-size-12">
              {dayjs(cell.row.original.postingDeadline, 'MMMM DD, YYYY').format(
                'MMMM DD, YYYY'
              )}
            </Badge>
          )
        } else {
          return (
            <Badge className="me-2 bg-danger font-size-12">
              {dayjs(cell.row.original.postingDeadline, 'MMMM DD, YYYY').format(
                'MMMM DD, YYYY'
              )}
            </Badge>
          )
        }
      } else {
        return (
          <>
            {dayjs(cell.row.original.postingDeadline, 'MMMM DD, YYYY').format(
              'MMMM DD, YYYY'
            )}
          </>
        )
      }
    } else {
      return <></>
    }
  }

  const publicationStatusBadge = cell => {
    if (cell.row.values.postingStatus === publicationStatus.FORCSCAPPROVAL) {
      return (
        <Badge className="me-2 bg-warning font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    } else if (
      cell.row.values.postingStatus === publicationStatus.OPENFORAPP ||
      cell.row.values.postingStatus === publicationStatus.CLOSEDFORAPP
    ) {
      return (
        <Badge className="me-2 bg-info font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    } else if (
      cell.row.values.postingStatus === publicationStatus.REQENTITYSELECTDONE ||
      cell.row.values.postingStatus === publicationStatus.EXAMDONE ||
      cell.row.values.postingStatus === publicationStatus.INTERVIEWDONE ||
      cell.row.values.postingStatus ===
        publicationStatus.APPAUTHSELECTIONDONE ||
      cell.row.values.postingStatus === publicationStatus.HIRINGDONE
    ) {
      return (
        <Badge className="me-2 bg-success font-size-12">
          {cell.row.values.postingStatus}
        </Badge>
      )
    } else if (cell.row.values.postingStatus === publicationStatus.DOESET) {
      return (
        <div className="me-2 font-size-12 badge bg-primary">
          {cell.row.values.postingStatus}
        </div>
      )
    } else {
      return (
        <Badge className="me-2 bg-secondary font-size-12">
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
          {cell.row.values.postingStatus !== publicationStatus.HIRINGDONE ? (
            <DropdownItem>
              <Link
                className="dropdown-item"
                to={
                  location.pathname +
                  '/publications/' +
                  cell.row.values.vppId +
                  '/applicants/' +
                  cell.row.original.positionId +
                  '/' +
                  cell.row.original.itemNumber
                }
                target="_blank"
              >
                Applicants{' '}
                <span className="badge bg-danger ms-2 font-size-11">
                  {cell.row.original.numberOfApplicants}
                </span>
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus ===
          publicationStatus.FORCSCAPPROVAL ? (
            <DropdownItem onClick={() => deadline(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Deadline
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus === publicationStatus.OPENFORAPP ? (
            <DropdownItem onClick={() => closeApplication(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Close Application
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus === publicationStatus.CLOSEDFORAPP ? (
            <DropdownItem onClick={() => sendEndorsement(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Send Endorsement To R.E.
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus ===
          publicationStatus.REQENTITYSELECTDONE ? (
            <>
              <DropdownItem onClick={() => shortlist(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  View Shortlist
                </Link>
              </DropdownItem>

              {cell.row.values.withExam === 'Yes' ? (
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

          {cell.row.values.postingStatus === publicationStatus.SCHEDFOREXAM ? (
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

          {cell.row.values.postingStatus === publicationStatus.EXAMDONE ? (
            <DropdownItem onClick={() => scheduleInterview(cell.row.values)}>
              <Link className="dropdown-item" to="#">
                Schedule for interview
              </Link>
            </DropdownItem>
          ) : null}

          {cell.row.values.postingStatus ===
          publicationStatus.SCHEDFORINTERVIEW ? (
            <Can I="access" this="Psb_chairman">
              <DropdownItem onClick={() => psbSummary(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  HRMPSB Rating
                </Link>
              </DropdownItem>
            </Can>
          ) : null}

          {cell.row.values.postingStatus === publicationStatus.INTERVIEWDONE ? (
            <>
              <DropdownItem onClick={() => selectionDocuments(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Selection Documents
                </Link>
              </DropdownItem>

              <Can I="access" this="Psb_chairman">
                <DropdownItem onClick={() => sendPsbSummary(cell.row.values)}>
                  <Link className="dropdown-item" to="#">
                    Send to GM
                  </Link>
                </DropdownItem>
              </Can>
            </>
          ) : null}

          {cell.row.values.postingStatus ===
          publicationStatus.APPAUTHSELECTION ? (
            <>
              <DropdownItem onClick={() => selectionDocuments(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Selection Documents
                </Link>
              </DropdownItem>
            </>
          ) : null}

          {cell.row.values.postingStatus ===
          publicationStatus.APPAUTHSELECTIONDONE ? (
            <>
              <DropdownItem onClick={() => selectionDocuments(cell.row.values)}>
                <Link className="dropdown-item" to="#">
                  Selection Documents
                </Link>
              </DropdownItem>

              <DropdownItem
                onClick={() => viewSelectedByAppAuth(cell.row.values)}
              >
                <Link className="dropdown-item" to="#">
                  View Selected by GM
                </Link>
              </DropdownItem>
            </>
          ) : null}

          {cell.row.values.postingStatus === publicationStatus.HIRINGDONE ? (
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

          <DropdownItem onClick={() => publicationDetails(cell.row.original)}>
            <Link className="dropdown-item" to="#">
              Publication Summary
            </Link>
          </DropdownItem>

          {/* <DropdownItem>
            <Link className="dropdown-item" to="#">
              Cancel Publication
            </Link>
          </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  // Set data and columns to table
  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => publicationPositions, [publicationPositions])

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

  // Debounce for year filter of publication
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedYearFilter(yearFilter)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [yearFilter, 1000])

  // Fetch publicatons for the current year
  useEffect(() => {
    if (debouncedYearFilter !== 0) {
      dispatch(getApprovedPublicationPositions(debouncedYearFilter))
    }
  }, [debouncedYearFilter])

  return (
    <React.Fragment>
      {errorPubPos ? (
        <ToastrNotification toastType={'error'} notifMessage={errorPubPos} />
      ) : null}

      {errorPatchSwapPsbMember ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorPatchSwapPsbMember}
        />
      ) : null}

      {!isEmpty(patchSwapPsbMember) ? (
        <ToastrNotification
          toastType={'success'}
          notifMessage={'PSB member successfully assigned'}
        />
      ) : null}

      {loadingPubPos ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="top-right-filter-container">
            <Row className="justify-content-end">
              <Col md={3}>
                <Label for="year-filter">Year</Label>
                <Input
                  name="year-filter"
                  type="number"
                  min="2000"
                  max="2099"
                  step="1"
                  onChange={e => {
                    setYearFilter(e.target.value)
                  }}
                  value={yearFilter}
                />
              </Col>
            </Row>
          </div>

          <TablePublications columns={columns} data={data} />
        </>
      )}

      <Deadline
        showDeadline={showDeadline}
        modalData={modalData}
        handleCloseDeadline={handleCloseDeadline}
        yearFilter={debouncedYearFilter.toString()}
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
        yearFilter={debouncedYearFilter.toString()}
      />

      <SendEndorsementToRequestingEntity
        showSendEndorsement={showSendEndorsement}
        modalData={modalData}
        handleCloseSendEndorsement={handleCloseSendEndorsement}
        yearFilter={debouncedYearFilter.toString()}
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
        yearFilter={debouncedYearFilter.toString()}
      />

      <ExamDone
        showExamDone={showExamDone}
        modalData={modalData}
        handleCloseExamDone={handleCloseExamDone}
        yearFilter={debouncedYearFilter.toString()}
      />

      <ScheduleInterview
        showScheduleInterview={showScheduleInterview}
        modalData={modalData}
        handleCloseScheduleInterview={handleCloseScheduleInterview}
        yearFilter={debouncedYearFilter.toString()}
      />

      <PsbRating
        showPsbSummary={showPsbSummary}
        modalData={modalData}
        handleClosePsbSummary={handleClosePsbSummary}
        yearFilter={debouncedYearFilter.toString()}
      />

      <SendPsbSummaryToAppointingAuth
        showSendPsbSummary={showSendPsbSummary}
        modalData={modalData}
        handleCloseSendPsbSummary={handleCloseSendPsbSummary}
        yearFilter={debouncedYearFilter.toString()}
      />

      <ViewSelectedByAppointingAuth
        showViewSelectedByAppAuth={showViewSelectedByAppAuth}
        modalData={modalData}
        handleCloseSelectedByAppAuth={handleCloseSelectedByAppAuth}
        yearFilter={debouncedYearFilter.toString()}
      />

      <SelectionDocuments
        showSelectionDocuments={showSelectionDocuments}
        modalData={modalData}
        handleCloseSelectionDocuments={handleCloseSelectionDocuments}
      />

      <SetAppointmentEffectivity
        showSetAppointmentEffectivity={showSetAppointmentEffectivity}
        modalData={modalData}
        handleCloseSetAppointmentEffectivity={
          handleCloseSetAppointmentEffectivity
        }
        yearFilter={debouncedYearFilter.toString()}
      />

      <PublicationSummary
        showPublicationDetails={showPublicationDetails}
        modalData={modalData}
        handleClosePublicationDetails={handleClosePublicationDetails}
      />
    </React.Fragment>
  )
}

PublicationPositions.propTypes = {
  cell: PropTypes.any,
}

export default PublicationPositions
