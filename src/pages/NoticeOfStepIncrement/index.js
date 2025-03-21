import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeesForNosi } from 'store/actions'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, Badge } from 'reactstrap'
import NosiIssuanceModal from 'components/Modal/NoticeOfStepIncrement/NosiIssuanceModal'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'
import Breadcrumb from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import EmployeeIcon from 'components/Common/EmployeeIcon'
import InRowAction from 'components/InRowAction/InRowAction'
import { nosiStatus } from 'constants/nosi'
import TableBase from 'components/Table/TableBase'
import { DateFormatter } from 'functions/DateFormatter'

const sampleNosiData = [
  {
    _id: '01',
    avatarUrl: 'CUBERO.jpg',
    fullName: 'Cubero, Allyn Joseph C.',
    positionTitle: 'Management Information System Researcher',
    actualSgSi: 'SG-12, Step 1',
    adjustedSgSi: 'SG-12, Step 2',
    dateOfEffectivity: '2025-04-03',
    status: nosiStatus.FOR_ISSUANCE,
  },
  {
    _id: '02',
    avatarUrl: 'NOSOTROS.jpg',
    fullName: 'Nosotros, Jay Raymond L.',
    positionTitle: 'Management Information System Researcher',
    actualSgSi: 'SG-12, Step 1',
    adjustedSgSi: 'SG-12, Step 2',
    dateOfEffectivity: '2025-04-03',
    status: nosiStatus.FOR_ISSUANCE,
  },
  {
    _id: '03',
    avatarUrl: 'ALEJADO.jpg',
    fullName: 'Alejado, Tessa Mae M.',
    positionTitle: 'Community Relations Officer B',
    actualSgSi: 'SG-12, Step 1',
    adjustedSgSi: 'SG-12, Step 2',
    dateOfEffectivity: '2025-04-10',
    status: nosiStatus.FOR_GM_APPROVAL,
  },
  {
    _id: '04',
    avatarUrl: 'BAUGBOG.jpg',
    fullName: 'Baugbog, Rizza R. , CE',
    positionTitle: 'Senior Engineer A',
    actualSgSi: 'SG-16, Step 1',
    adjustedSgSi: 'SG-16, Step 2',
    dateOfEffectivity: '2025-04-03',
    status: nosiStatus.APPROVED_NOSI,
  },
  {
    _id: '05',
    avatarUrl: 'FEROLINO.jpg',
    fullName: 'Ferolino, Jason Roy T',
    positionTitle: 'Clerk Processor B',
    actualSgSi: 'SG-6, Step 1',
    adjustedSgSi: 'SG-6, Step 2',
    dateOfEffectivity: '2025-04-15',
    status: nosiStatus.FOR_ISSUANCE,
  },
]

const NoticeOfStepIncrement = () => {
  const dispatch = useDispatch()

  const { employeesForNosi, isLoading, error } = useSelector(state => ({
    employeesForNosi: state.noticeOfStepIncrement.employeesForNosi,
    isLoading: state.noticeOfStepIncrement.isLoading,
    error: state.noticeOfStepIncrement.error,
  }))

  const tableColumns = [
    {
      Header: '',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: '',
      accessor: 'avatarUrl',
      disableGlobalFilter: true,
      align: 'center',
      Cell: cell => {
        const { avatarUrl, fullName } = cell.row.values
        return (
          <EmployeeIcon
            avatarUrl={avatarUrl}
            name={fullName}
            width={60}
            height={60}
          />
        )
      },
    },
    {
      Header: 'Name',
      accessor: 'fullName',
    },
    {
      Header: 'Position Title',
      accessor: 'positionTitle',
    },
    {
      Header: 'Actual SG & SI',
      accessor: 'actualSgSi',
    },
    {
      Header: 'Adjusted SG & SI',
      accessor: 'adjustedSgSi',
    },
    {
      Header: 'Date of Effectivity',
      accessor: 'dateOfEffectivity',
      Cell: cell => {
        return DateFormatter(cell.value, 'MMMM DD, YYYY')
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      Filter: SelectColumnFilter,
      filter: 'equals',
      Cell: cell => {
        if (cell.value === nosiStatus.FOR_ISSUANCE) {
          return (
            <Badge className="me-2 bg-danger font-size-12 text-capitalize">
              {cell.value}
            </Badge>
          )
        } else if (cell.value === nosiStatus.FOR_GM_APPROVAL) {
          return (
            <Badge className="me-2 bg-warning font-size-12 text-capitalize">
              {cell.value}
            </Badge>
          )
        } else {
          return (
            <Badge className="me-2 bg-success font-size-12 text-capitalize">
              {cell.value}
            </Badge>
          )
        }
      },
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: cell => {
        if (cell.row.values['status'] === nosiStatus.FOR_ISSUANCE) {
          return <InRowAction cell={cell} viewModal={viewNosiIssuanceModal} />
        } else if (cell.row.values['status'] === nosiStatus.APPROVED_NOSI) {
          return <InRowAction cell={cell} viewModal={viewNosiIssuanceModal} />
        } else {
          return
        }
      },
    },
  ]

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => sampleNosiData, [sampleNosiData]) // Swap value to ::employeesForNosi::

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  const [showIssuanceModal, setShowIssuanceModal] = useState(false)
  const toggleNosiIssuance = () => setShowIssuanceModal(!showIssuanceModal)

  const viewNosiIssuanceModal = rowData => {
    setModalData(rowData)
    toggleNosiIssuance()
  }

  useEffect(() => {
    // UNCOMMENT IF ROUTE IS AVAILABLE
    // dispatch(fetchEmployeesForNosi(monthYear))
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Notice_of_step_increment">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb title="Dashboard" titleUrl="/" breadcrumbItem="NOSI" />

            {error ? (
              <ToastrNotification toastType={'error'} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <TableBase columns={columns} data={data} />
                      </>
                    )}

                    {/* Modals for Actions */}
                    <NosiIssuanceModal
                      isOpen={showIssuanceModal}
                      toggle={toggleNosiIssuance}
                      modalData={modalData}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Notice_of_salary_adjustment">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

NoticeOfStepIncrement.propTypes = {
  cell: PropTypes.any,
}

export default NoticeOfStepIncrement
