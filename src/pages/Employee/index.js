import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeList } from 'store/actions'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate, useLocation } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from 'reactstrap'
import PermanentPortalRegistrationModal from 'components/Modal/Employee/PermanentPortalRegistrationModal'
import CasJoCosPortalRegistrationModal from 'components/Modal/Employee/CasJoCosPortalRegistrationModal'
import EditEmployeeInformationModal from 'components/Modal/Employee/EditEmployeeInformationModal'

// table components
import TableEmployeeList from 'components/Table/TableEmployeeList'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'

// extra components
import Breadcrumb from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import EmployeeIcon from 'components/Common/EmployeeIcon'

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
      Header: '',
      accessor: 'employmentDetails',
      disableGlobalFilter: true,
      Cell: cell => {
        const { employmentDetails, personalDetails } = cell.row.original
        return (
          <EmployeeIcon
            avatarUrl={employmentDetails.avatarUrl}
            name={personalDetails.fullName}
            width={60}
            height={60}
          />
        )
      },
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
      Header: 'Appointment',
      accessor: 'employmentDetails.natureOfAppointment',
      Cell: cell => {
        return (
          <p className=" text-capitalize">
            {cell.row.values[`employmentDetails.natureOfAppointment`]}
          </p>
        )
      },
      Filter: SelectColumnFilter,
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
      <UncontrolledDropdown className="ms-auto" direction="down">
        <DropdownToggle className="font-size-18" color="white" type="button">
          <i className="mdi mdi-dots-horizontal"></i>
        </DropdownToggle>
        <DropdownMenu direction="right">
          {cell.row.values[`employmentDetails.natureOfAppointment`] ===
            'permanent' ||
          cell.row.values[`employmentDetails.natureOfAppointment`] ===
            'casual' ? (
            <>
              <DropdownItem
                href={`${
                  location.pathname +
                  '/pds/' +
                  cell.row.values['employmentDetails.employeeId']
                }`}
                target="_blank"
                className="dropdown-item"
              >
                Employee Information (PDS)
              </DropdownItem>

              <DropdownItem
                href={`${
                  '/plantilla/' +
                  `${convertToUrlString(
                    cell.row.values['employmentDetails.natureOfAppointment']
                  )}` +
                  `${cell.row.values['employmentDetails.positionId']}`
                }`}
                target="_blank"
                className="dropdown-item"
              >
                Position Description
              </DropdownItem>

              {/* <DropdownItem
                href={`${
                  location.pathname +
                  '/201/' +
                  cell.row.values['employmentDetails.employeeId']
                }`}
                target="_blank"
                className="dropdown-item"
              >
                201
              </DropdownItem> */}
            </>
          ) : null}

          {cell.row.values[`employmentDetails.natureOfAppointment`] ===
            'job order' ||
          cell.row.values[`employmentDetails.natureOfAppointment`] ===
            'contract of service' ? (
            <DropdownItem
              href={`${
                location.pathname +
                '/basic-info/' +
                cell.row.values['employmentDetails.employeeId']
              }`}
              target="_blank"
              className="dropdown-item"
            >
              Employee Information (Basic)
            </DropdownItem>
          ) : null}

          <Can I="access" this="Employees_basic_info">
            <DropdownItem
              onClick={() => editModal(cell.row.original)}
              className="dropdown-item"
              toggle={false}
            >
              Update Basic Information
            </DropdownItem>
          </Can>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Register Employee to Portal
  const [registerDropdown, setRegisterDropdown] = useState(false)
  const [modalNatureOfAppointment, setModalNatureOfAppointment] = useState('')

  const [showAddPerm, setShowAddPerm] = useState(false)
  const handleCloseAddPerm = () => setShowAddPerm(false)
  const handleShowAddPerm = () => setShowAddPerm(true)

  const [showAddCasJoCos, setShowAddCasJoCos] = useState(false)
  const handleCloseAddCasJoCos = () => setShowAddCasJoCos(false)
  const handleShowAddCasJoCos = () => setShowAddCasJoCos(true)

  // Edit Modal
  const [showEdt, setShowEdt] = useState(false)
  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

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
  }, [dispatch])

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
                            <div className="btn-group">
                              <Dropdown
                                isOpen={registerDropdown}
                                toggle={() => {
                                  setRegisterDropdown(!registerDropdown)
                                }}
                              >
                                <DropdownToggle
                                  tag="button"
                                  className="btn btn-info"
                                >
                                  <i className="fas fa-plus-square"></i>&nbsp;
                                  Employee Registration
                                </DropdownToggle>

                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem
                                    onClick={() => handleShowAddPerm()}
                                  >
                                    Permanent
                                  </DropdownItem>
                                  {/* <DropdownItem
                                    onClick={() => {
                                      handleShowAddCasJoCos()
                                      setModalNatureOfAppointment(
                                        natureOfAppointments.CASUAL
                                      )
                                    }}
                                  >
                                    Casual
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      handleShowAddCasJoCos()
                                      setModalNatureOfAppointment(
                                        natureOfAppointments.JOB_ORDER
                                      )
                                    }}
                                  >
                                    Job Order
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      handleShowAddCasJoCos()
                                      setModalNatureOfAppointment(
                                        natureOfAppointments.CONTRACT_OF_SERVICE
                                      )
                                    }}
                                  >
                                    Contract of Service
                                  </DropdownItem> */}
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                        <TableEmployeeList columns={columns} data={data} />
                      </>
                    )}

                    {/* Modals for Actions */}
                    <EditEmployeeInformationModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />

                    <PermanentPortalRegistrationModal
                      showAddPerm={showAddPerm}
                      handleCloseAddPerm={handleCloseAddPerm}
                    />

                    <CasJoCosPortalRegistrationModal
                      showAddCasJoCos={showAddCasJoCos}
                      modalNatureOfAppointment={modalNatureOfAppointment}
                      handleCloseAddCasJoCos={handleCloseAddCasJoCos}
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
