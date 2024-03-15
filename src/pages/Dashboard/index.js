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

// extra components
import Breadcrumbs from 'components/Common/Breadcrumb'

// style
import 'styles/custom_gscwd/pages/dashboard.scss'

const Dashboard = () => {
  const reports = [
    { title: 'Total Employees', iconClass: 'bx-group', description: '330' },
    {
      title: 'Approved PRF Request',
      iconClass: 'bx-user-pin',
      description: '8',
    },
    {
      title: 'Applicants',
      iconClass: 'bx-user-plus',
      description: '15',
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
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={'_col_' + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted font-weight-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
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
