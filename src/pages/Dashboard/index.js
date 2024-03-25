import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Media,
} from 'reactstrap'

// Pages Components
import WelcomeComp from './WelcomeComp'
import LatestBirthday from './LatestBirthday'
import PersonnelDistributionChart from './PersonnelDistributionChart'
import AgeBracketChart from './AgeBracketChart'
import CalendarCard from './CalendarCard'
import NatureOfAppointmentChart from './NatureOfAppointmentChart'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// extra components
import Breadcrumbs from 'components/Common/Breadcrumb'

// style
import 'styles/custom_gscwd/pages/dashboard.scss'

// store
import { getEmployeesCount } from 'store/actions'
import { getApprovedPrfCount } from 'store/actions'
import { getApplicantsCount } from 'store/actions'

import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const {
    employeesCount,
    loadingEmployeesCount,
    errorEmployeesCount,

    approvedPrfCount,
    loadingApprovedPrfCount,
    errorApprovedPrfCount,

    applicantsCount,
    loadingApplicantsCount,
    errorApplicantsCount,
  } = useSelector(state => ({
    employeesCount: state.Dashboard.employeesCount,
    loadingEmployeesCount: state.Dashboard.loading.loadingEmployeesCount,
    errorEmployeesCount: state.Dashboard.error.errorEmployeesCount,

    approvedPrfCount: state.Dashboard.approvedPrfCount,
    loadingApprovedPrfCount: state.Dashboard.loading.loadingApprovedPrfCount,
    errorApprovedPrfCount: state.Dashboard.error.errorApprovedPrfCount,

    applicantsCount: state.Dashboard.applicantsCount,
    loadingApplicantsCount: state.Dashboard.loading.loadingApplicantsCount,
    errorApplicantsCount: state.Dashboard.error.errorApplicantsCount,
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmployeesCount())
    dispatch(getApprovedPrfCount())
    dispatch(getApplicantsCount())
  }, [dispatch])

  const reports = [
    {
      title: 'Total Employees',
      iconClass: 'bx-group',
      value: errorEmployeesCount
        ? '--'
        : employeesCount.employeesTotal >= 0
        ? employeesCount.employeesTotal
        : !employeesCount.employeesTotal
        ? 0
        : '--',
    },
    {
      title: 'Approved PRF Request',
      iconClass: 'bx-user-pin',
      value: errorApprovedPrfCount
        ? '--'
        : approvedPrfCount.approvedPrf >= 0
        ? approvedPrfCount.approvedPrf
        : !approvedPrfCount.approvedPrf
        ? 0
        : '--',
    },
    {
      title: 'Applicants',
      iconClass: 'bx-user-plus',
      value: errorApplicantsCount
        ? '--'
        : applicantsCount.count >= 0
        ? applicantsCount.count
        : !applicantsCount.count
        ? 0
        : '--',
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" />

          <Row>
            <Col xl="4">
              <WelcomeComp />

              <LatestBirthday />

              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">
                    Nature of Appointment Distribution
                  </CardTitle>

                  <NatureOfAppointmentChart />
                </CardBody>
              </Card>
            </Col>

            <Col xl="8">
              <Row>
                {errorEmployeesCount ? (
                  <ToastrNotification
                    toastType={'error'}
                    notifMessage={errorEmployeesCount}
                  />
                ) : null}
                {errorApplicantsCount ? (
                  <ToastrNotification
                    toastType={'error'}
                    notifMessage={errorApplicantsCount}
                  />
                ) : null}
                {errorApprovedPrfCount ? (
                  <ToastrNotification
                    toastType={'error'}
                    notifMessage={errorApprovedPrfCount}
                  />
                ) : null}
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={'_col_' + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        {loadingEmployeesCount &&
                        loadingApplicantsCount &&
                        loadingApprovedPrfCount ? (
                          <Media className="placeholder-glow">
                            <Media body>
                              <p className="placeholder">Loading...</p>
                              <h4 className="placeholder">Loading...</h4>
                            </Media>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center placeholder">
                              <span className="avatar-title">
                                <i className={'bx font-size-24'}></i>
                              </span>
                            </div>
                          </Media>
                        ) : (
                          <Media>
                            <Media body>
                              <p className="text-muted font-weight-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.value}</h4>
                            </Media>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    'bx ' + report.iconClass + ' font-size-24'
                                  }
                                ></i>
                              </span>
                            </div>
                          </Media>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4 float-sm-left">
                        Personnel Distribution
                      </CardTitle>

                      <PersonnelDistributionChart />
                    </CardBody>
                  </Card>
                </Col>

                <Col md="12">
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4 float-sm-left">
                        Age Distribution
                      </CardTitle>

                      <AgeBracketChart />
                    </CardBody>
                  </Card>
                </Col>

                {/* <Col md="6">
                  <CalendarCard />
                </Col> */}
              </Row>
            </Col>
          </Row>

          {/* <Row>
            <Col xl="6">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">
                    Age Distribution
                  </CardTitle>

                  <AgeBracketChart />
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <CalendarCard />
            </Col>
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
