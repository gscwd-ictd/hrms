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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import PermanentPortalRegistrationModal from 'components/Modal/Employee/PermanentPortalRegistrationModal'
import CasJoCosPortalRegistrationModal from 'components/Modal/Employee/CasJoCosPortalRegistrationModal'
import TableEmployeeList from 'components/Table/TableEmployeeList'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'
import Breadcrumb from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import EmployeeIcon from 'components/Common/EmployeeIcon'
import { natureOfAppointments } from 'constants/natureOfAppointments'
import InRowAction from 'components/InRowAction/InRowAction'

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
      align: 'center',
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
      Header: 'Company ID No.',
      accessor: 'employmentDetails.companyId',
      align: 'center',
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
      disableGlobalFilter: true,
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Appointment',
      accessor: 'employmentDetails.natureOfAppointment',
      disableGlobalFilter: true,
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
      Cell: cell => {
        return (
          <div className="d-flex">
            <InRowAction
              viewRedirectUrl={
                location.pathname +
                '/details/' +
                `${convertToUrlString(
                  cell.row.values['employmentDetails.natureOfAppointment']
                )}` +
                cell.row.values['employmentDetails.employeeId']
              }
            />

            {cell.row.values[`employmentDetails.natureOfAppointment`] ===
            'permanent' ? (
              <InRowAction
                viewRedirectUrl2={
                  '/plantilla/' +
                  `${convertToUrlString(
                    cell.row.values['employmentDetails.natureOfAppointment']
                  )}` +
                  `${cell.row.values['employmentDetails.positionId']}`
                }
                icon={'fas fa-briefcase'}
              />
            ) : null}
          </div>
        )
      },
    },
  ]

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
                                  <DropdownItem
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
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                        <TableEmployeeList columns={columns} data={data} />
                      </>
                    )}

                    {/* Modals for Actions */}
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
