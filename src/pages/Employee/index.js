import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeList } from 'store/actions'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate, Link, useLocation } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

// modal components
import PortalRegistrationModal from 'components/Modal/Employee/PortalRegistrationModal'

// table components
import TableEmployeeList from 'components/Table/TableEmployeeList'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'

// extra components
import Breadcrumb from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const EmployeeList = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const tableColumns = [
    {
      Header: '',
      accessor: 'employmentDetails.employeeId',
      disableGlobalFilter: true,
    },
    {
      Header: 'Company ID',
      accessor: 'employmentDetails.companyId',
    },
    {
      Header: 'Name',
      accessor: 'personalDetails.fullName',
    },
    {
      Header: '',
      accessor: 'employmentDetails.positionId',
      disableGlobalFilter: true,
    },
    {
      Header: 'Position Title',
      accessor: 'employmentDetails.positionTitle',
    },
    {
      Header: 'Assignment',
      accessor: 'employmentDetails.assignment.name',
      Filter: SelectColumnFilter,
    },
    {
      Header: '',
      accessor: 'employmentDetails.natureOfAppointment',
      disableGlobalFilter: true,
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

  const rowActions = cell => {
    return (
      <UncontrolledDropdown className="ms-auto">
        <DropdownToggle className="font-size-18" color="white" type="button">
          <i className="mdi mdi-dots-horizontal"></i>
        </DropdownToggle>
        <DropdownMenu direction="right">
          <DropdownItem>
            <Link
              className="dropdown-item"
              to={`${
                location.pathname +
                '/pds/' +
                cell.row.values['employmentDetails.employeeId']
              }`}
              style={{ paddingRight: 5 }}
            >
              PDS
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              className="dropdown-item"
              to={`${
                location.pathname +
                '/201/' +
                cell.row.values['employmentDetails.employeeId']
              }`}
              style={{ paddingRight: 5 }}
            >
              201
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              className="dropdown-item"
              to={`${
                '/plantilla/' +
                `${convertToUrlString(
                  cell.row.values['employmentDetails.natureOfAppointment']
                )}` +
                `${cell.row.values['employmentDetails.positionId']}`
              }`}
              style={{ paddingRight: 5 }}
            >
              Position Description
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  /**
   * Modal
   */
  // Register Employee to Portal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  //  function to convert string
  const convertToUrlString = str => {
    if (typeof str === 'string') {
      return str.replace(/\s+/g, '-') + '/'
    }
  }

  const { employeeListRes, isLoading, error } = useSelector(state => ({
    employeeListRes: state.employee.employeeListRes,
    isLoading: state.employee.isLoading,
    error: state.employee.error,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => employeeListRes, [employeeListRes])

  useEffect(() => {
    dispatch(fetchEmployeeList())
  }, [])

  return (
    <React.Fragment>
      <Can I="access" this="Employees">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Employee List"
            />

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
                        <div className="top-right-actions">
                          <div className="form-group add-btn">
                            <button
                              onClick={handleShowAdd}
                              className="btn btn-info waves-effect waves-light"
                            >
                              <i className="fas fa-plus-square"></i>&nbsp;
                              Employee Registration
                            </button>
                          </div>
                        </div>
                        <TableEmployeeList columns={columns} data={data} />
                      </>
                    )}

                    <PortalRegistrationModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Employees">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

EmployeeList.propTypes = {
  cell: PropTypes.any,
}

export default EmployeeList
