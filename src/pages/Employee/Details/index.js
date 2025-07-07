import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeePds,
  fetchEmpHeaderInfo,
  fetchEmpBasicInfo,
} from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap'
import Breadcrumb from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import PersonalDataSheet from 'components/PersonalDataSheet/Employee'
import BasicInformationView from 'components/PersonalDataSheet/Basic'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import EmployeeCard from 'components/Common/EmployeeCard'
import ComingSoon from 'components/Utility/ComingSoon'
import classnames from 'classnames'
import { natureOfAppointments } from 'constants/natureOfAppointments'
import EditEmployeeInformationModal from 'components/Modal/Employee/EditEmployeeInformationModal'
import ServiceRecord from 'components/ServiceRecord'
import LearningAndDevelopment from 'components/LearningAndDevelopment'

const EmployeePds = () => {
  const [activeTab, setactiveTab] = useState('1')

  const dispatch = useDispatch()
  const { employeeId, natureOfAppointment } = useParams()

  const {
    employeeHeaderInformation,
    loadingEmpHeaderInfo,
    errorEmpHeaderInfo,

    loadingEmpBasicInfo,
    errorEmpBasicInfo,

    loadingServiceRecords,
    errorServiceRecords,

    loadingEmpTrainings,
    errorEmpTrainings,
  } = useSelector(state => ({
    employeeHeaderInformation: state.employee.employeeHeaderInformation.data,
    loadingEmpHeaderInfo: state.employee.employeeHeaderInformation.isLoading,
    errorEmpHeaderInfo: state.employee.employeeHeaderInformation.error,

    loadingEmpBasicInfo: state.employee.isLoading,
    errorEmpBasicInfo: state.employee.error,

    loadingServiceRecords: state.serviceRecord.isLoading,
    errorServiceRecords: state.serviceRecord.error,

    loadingEmpTrainings: state.learningDevelopment.isLoading,
    errorEmpTrainings: state.learningDevelopment.error,
  }))

  /**
   * Modal
   */
  // Edit Modal
  const [showEdt, setShowEdt] = useState(false)
  const toggleEdit = () => setShowEdt(!showEdt)

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  useEffect(() => {
    dispatch(fetchEmpHeaderInfo(employeeId))

    // COMMENT OUT WHEN ROUTE IS AVAILABLE
    // dispatch(fetchServiceRecords(employeeId))
    // dispatch(fetchEmployeeTrainings(employeeId))

    if (
      natureOfAppointment === natureOfAppointments.PERMANENT ||
      natureOfAppointment === natureOfAppointments.CASUAL
    ) {
      dispatch(fetchEmployeePds(employeeId))
    } else {
      setactiveTab('2')
      dispatch(fetchEmpBasicInfo(employeeId))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Employees">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Employee"
              titleUrl="/employees"
              breadcrumbItem="Personal Data Sheet"
            />

            {errorEmpHeaderInfo ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorEmpHeaderInfo}
              />
            ) : null}

            {errorEmpBasicInfo ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorEmpBasicInfo}
              />
            ) : null}

            {/* COMMENT OUT UNTIL ROUTE IS AVAILABLE */}
            {errorServiceRecords ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorServiceRecords}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingEmpHeaderInfo ? (
                      <LoadingIndicator />
                    ) : (
                      <EmployeeCard
                        name={employeeHeaderInformation?.fullName}
                        companyId={employeeHeaderInformation?.companyId}
                        photoUrl={employeeHeaderInformation?.photoUrl}
                        positionTitle={
                          employeeHeaderInformation?.assignment?.positionTitle
                        }
                        natureOfAppointment={natureOfAppointment}
                        width={100}
                        height={100}
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>

              <Col lg={12}>
                <Card>
                  <CardBody>
                    {/* Navigation tabs */}
                    <Nav pills className=" nav-justified">
                      {natureOfAppointment === natureOfAppointments.PERMANENT ||
                      natureOfAppointment === natureOfAppointments.CASUAL ? (
                        <NavItem>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              active: activeTab === '1',
                            })}
                            onClick={() => {
                              toggleTab('1')
                            }}
                          >
                            <span className="d-none d-sm-block">
                              <i className="fas fa-address-card fs-5 me-1"></i>{' '}
                              Personal Data Sheet
                            </span>
                          </NavLink>
                        </NavItem>
                      ) : (
                        <NavItem>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              active: activeTab === '2',
                            })}
                            onClick={() => {
                              toggleTab('2')
                            }}
                          >
                            <span className="d-none d-sm-block">
                              <i className="fas fa-address-card fs-5 me-1"></i>{' '}
                              Basic Information
                            </span>
                          </NavLink>
                        </NavItem>
                      )}
                      <NavItem>
                        <NavLink
                          style={{ cursor: 'pointer' }}
                          className={classnames({
                            active: activeTab === '3',
                          })}
                          onClick={() => {
                            toggleTab('3')
                          }}
                        >
                          <span className="d-none d-sm-block">
                            <i className="fas fa-folder-open fs-5 me-1"></i>{' '}
                            Service Record
                          </span>
                        </NavLink>
                      </NavItem>

                      {natureOfAppointment === natureOfAppointments.PERMANENT ||
                      natureOfAppointment === natureOfAppointments.CASUAL ? (
                        <NavItem>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              active: activeTab === '4',
                            })}
                            onClick={() => {
                              toggleTab('4')
                            }}
                          >
                            <span className="d-none d-sm-block">
                              <i className="far fa-lightbulb fs-5 me-1"></i>{' '}
                              Learning & Development
                            </span>
                          </NavLink>
                        </NavItem>
                      ) : null}

                      <NavItem>
                        <NavLink
                          style={{ cursor: 'pointer' }}
                          className={classnames({
                            active: activeTab === '5',
                          })}
                          onClick={() => {
                            toggleTab('5')
                          }}
                        >
                          <span className="d-none d-sm-block">
                            <i className="fas fa-tasks fs-5 me-1"></i>{' '}
                            Performance Rating
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: 'pointer' }}
                          className={classnames({
                            active: activeTab === '6',
                          })}
                          onClick={() => {
                            toggleTab('6')
                          }}
                        >
                          <span className="d-none d-sm-block">
                            <i className="fas fa-trophy fs-5 me-1"></i> Rewards
                            and Recognition
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    {/* Tab containers */}
                    <TabContent
                      activeTab={activeTab}
                      className="p-3 text-muted"
                    >
                      {natureOfAppointment === natureOfAppointments.PERMANENT ||
                      natureOfAppointment === natureOfAppointments.CASUAL ? (
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              {loadingEmpBasicInfo ? (
                                <LoadingIndicator />
                              ) : (
                                <>
                                  <div className="form-group d-flex justify-content-end mb-4">
                                    <Can I="access" this="Employees_basic_info">
                                      <Button
                                        onClick={toggleEdit}
                                        className="btn btn-info waves-effect waves-light"
                                      >
                                        <i className="fas fa-edit"></i>&nbsp;
                                        Update Basic Details
                                      </Button>
                                    </Can>
                                  </div>

                                  <PersonalDataSheet employeeId={employeeId} />
                                </>
                              )}
                            </Col>
                          </Row>
                        </TabPane>
                      ) : (
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12">
                              {loadingEmpBasicInfo ? (
                                <LoadingIndicator />
                              ) : (
                                <>
                                  <div className="form-group d-flex justify-content-end mb-4">
                                    <Can I="access" this="Employees_basic_info">
                                      <Button
                                        onClick={toggleEdit}
                                        className="btn btn-info waves-effect waves-light"
                                      >
                                        <i className="fas fa-edit"></i>&nbsp;
                                        Update Basic Details
                                      </Button>
                                    </Can>
                                  </div>

                                  <BasicInformationView />
                                </>
                              )}
                            </Col>
                          </Row>
                        </TabPane>
                      )}

                      {/* SERVICE RECORD */}
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            {loadingEmpBasicInfo ? (
                              <LoadingIndicator />
                            ) : (
                              <ServiceRecord />
                            )}

                            {/* COMMENT OUT UNTIL ROUTE IS AVAILABLE */}
                            {/* {loadingServiceRecords ? (
                              <LoadingIndicator />
                            ) : (
                              <ServiceRecord />
                            )} */}
                          </Col>
                        </Row>
                      </TabPane>

                      {/* TRAININGS */}
                      {natureOfAppointment === natureOfAppointments.PERMANENT ||
                      natureOfAppointment === natureOfAppointments.CASUAL ? (
                        <TabPane tabId="4">
                          {loadingEmpBasicInfo ? (
                            <LoadingIndicator />
                          ) : (
                            <LearningAndDevelopment />
                          )}

                          {/* COMMENT OUT UNTIL ROUTE IS AVAILABLE */}
                          {/* {loadingEmpTrainings ? (
                            <LoadingIndicator />
                          ) : (
                            <LearningAndDevelopment />
                          )} */}
                        </TabPane>
                      ) : null}

                      {/* PERFORMANCE RECORD */}
                      <TabPane tabId="5">
                        <ComingSoon />
                      </TabPane>

                      {/* REWARDS AND RECOGNITION */}
                      <TabPane tabId="6">
                        <ComingSoon />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          <EditEmployeeInformationModal isOpen={showEdt} toggle={toggleEdit} />
        </div>
      </Can>

      <Can not I="access" this="Employees">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default EmployeePds
