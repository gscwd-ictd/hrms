import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeTemporaryAssignmentList } from 'store/actions'
import { Row, Col, Card, CardBody, Container } from 'reactstrap'
import TableBase from 'components/Table/TableBase'
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import InRowAction from 'components/InRowAction/InRowAction'
import { isEmpty } from 'lodash'
import AddEmployeeTempAssignModal from 'components/Modal/TemporaryAssignment/AddEmployeeTempAssignModal'
import EditEmployeeTempAssignModal from 'components/Modal/TemporaryAssignment/EditEmployeeTempAssignModal'
import DeleteEmployeeTempAssignModal from 'components/Modal/TemporaryAssignment/DeleteEmployeeTempAssignModal'
import { DateFormatter } from 'functions/DateFormatter'
import { tempAssignmentStatuses } from 'constants/selectInputs'

const TemporaryAssignment = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: 'ID',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'Employee Name',
      accessor: 'fullName',
    },
    {
      Header: 'Date Start',
      accessor: 'dateFrom',
      Cell: cell => {
        return <p>{DateFormatter(cell.value, 'MMMM DD, YYYY')}</p>
      },
    },
    {
      Header: 'Date End',
      accessor: 'dateTo',
      Cell: cell => {
        if (!isEmpty(cell.value)) {
          return <p>{DateFormatter(cell.value, 'MMMM DD, YYYY')}</p>
        } else {
          return <p>---- --, ----</p>
        }
      },
    },
    {
      Header: 'Organization Name',
      accessor: 'organizationName',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: cell => {
        return <p className="text-capitalize">{cell.value}</p>
      },
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <div className="d-flex">
            {cell.row.original.status === tempAssignmentStatuses[0].value ? (
              <InRowAction cell={cell} editModal={editModal} />
            ) : null}

            <InRowAction cell={cell} deleteModal={deleteModal} />
          </div>
        )
      },
    },
  ]

  // redux state for temporary assignment list
  const {
    employeeTemporaryAssignmentList,
    loadingEmployeeTemporaryAssignmentList,
    errorEmployeeTemporaryAssignmentList,
  } = useSelector(state => ({
    employeeTemporaryAssignmentList:
      state.temporaryAssignment.employeeTemporaryAssignmentList,
    loadingEmployeeTemporaryAssignmentList:
      state.temporaryAssignment.loading.loadingEmployeeTemporaryAssignmentList,
    errorEmployeeTemporaryAssignmentList:
      state.temporaryAssignment.error.errorEmployeeTemporaryAssignmentList,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(
    () => employeeTemporaryAssignmentList,
    [employeeTemporaryAssignmentList]
  )

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Add temporary assignment modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Update temporary assignment modal
  const [showEdt, setShowEdt] = useState(false)
  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  // Delete temporary assignment modal
  const [showDel, setShowDel] = useState(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)

  const deleteModal = rowData => {
    setModalData(rowData)
    handleShowDel()
  }

  // Initial request for employees with temporary assignment list
  useEffect(() => {
    dispatch(fetchEmployeeTemporaryAssignmentList())
  }, [dispatch])

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Dashboard"
          titleUrl="/"
          breadcrumbItem="Temporary Assignment"
        />

        {/* Notifications */}
        {errorEmployeeTemporaryAssignmentList ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorEmployeeTemporaryAssignmentList}
          />
        ) : null}

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody className="card-table">
                {loadingEmployeeTemporaryAssignmentList ? (
                  <LoadingIndicator />
                ) : (
                  <>
                    <div className="top-right-actions">
                      <div className="form-group add-btn">
                        <button
                          onClick={handleShowAdd}
                          className="btn btn-info waves-effect waves-light"
                        >
                          <i className="fas fa-plus-square"></i> Assign Employee
                        </button>
                      </div>
                    </div>
                    <TableBase columns={columns} data={data} />
                  </>
                )}

                {/* Modal */}
                <AddEmployeeTempAssignModal
                  showAdd={showAdd}
                  handleCloseAdd={handleCloseAdd}
                />

                <EditEmployeeTempAssignModal
                  showEdt={showEdt}
                  handleCloseEdt={handleCloseEdt}
                  modalData={modalData}
                />

                <DeleteEmployeeTempAssignModal
                  showDel={showDel}
                  handleCloseDel={handleCloseDel}
                  modalData={modalData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TemporaryAssignment
