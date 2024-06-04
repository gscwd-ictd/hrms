import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeTemporaryAssignmentList } from 'store/actions'

import { Row, Col, Card, CardBody, Container } from 'reactstrap'
import TableBase from 'components/Table/TableBase'
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import InRowAction from 'components/InRowAction/InRowAction'

import AddEmployeeTempAssignModal from 'components/Modal/TemporaryAssignment/AddEmployeeTempAssignModal'
import DeleteEmployeeTempAssignModal from 'components/Modal/TemporaryAssignment/DeleteEmployeeTempAssignModal'

import dayjs from 'dayjs'

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
      Header: 'Date From',
      accessor: data => dayjs(data.dateFrom).format('MMMM DD, YYYY'),
    },
    {
      Header: 'Date To',
      accessor: data => dayjs(data.dateTo).format('MMMM DD, YYYY'),
    },
    {
      Header: 'Organization Name',
      accessor: 'organizationName',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} deleteModal={deleteModal} />
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
