import React, { useState, useEffect } from "react"
import { 
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle, 
  Media,
} from "reactstrap"
import Cookies from 'universal-cookie'
// import { PermissibleRender } from '@brainhubeu/react-permissible'
// import { Redirect } from "react-router-dom"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import LatestBirthday from "./LatestBirthday"
import PersonnelDistributionChart from "./PersonnelDistributionChart"
import AgeBracketChart from "./AgeBracketChart"
import CalendarCard from "./CalendarCard"

// extra components
import Breadcrumbs from "components/Common/Breadcrumb"

// style
import "styles/custom_gscwd/pages/dashboard.scss"


const Dashboard = props => {

  const cookies = new Cookies();
  const userPermissions = cookies.get('userPermissions')

  const reports = [
    { title: "Total Employees", iconClass: "bx-group", description: "513" },
    { title: "Leave Applications", iconClass: "bx-detail", description: "18" },
    { title: "Absenteeism Rate", iconClass: "bx-user-x", description: "1.5%" },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboards" />

          <Row>
            <Col xl="4">
              <WelcomeComp />

              <LatestBirthday />
            </Col>

            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
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
                                  "bx " + report.iconClass + " font-size-24"
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

              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">  
                    Personnel Distribution
                  </CardTitle>

                  <PersonnelDistributionChart />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
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
          </Row>

        </Container>
      </div>

      {/* <PermissibleRender
        userPermissions={userPermissions}
        requiredPermissions={['ACCESS_DASHBOARD']}
        // oneperm
        renderOtherwise={<Redirect to='/page-404'/>}
      >
        <div className="page-content">
          <Container fluid>
            <h4>Dashboard</h4>
            
            <Row>
              <PermissibleRender
                userPermissions={userPermissions}
                requiredPermissions={['CREATE_CARD']}
              >
                <Col md={3}>
                  <Card>
                    <CardBody>
                      Can CREATE!
                    </CardBody>
                  </Card>
                </Col>
              </PermissibleRender>

              <PermissibleRender
                userPermissions={userPermissions}
                requiredPermissions={['READ_CARD']}
              >
                <Col md={3}>
                  <Card>
                    <CardBody>
                      Can READ!
                    </CardBody>
                  </Card>
                </Col>
                </PermissibleRender>

              <PermissibleRender
                userPermissions={userPermissions}
                requiredPermissions={['UPDATE_CARD']}
              >
                <Col md={3}>
                  <Card>
                    <CardBody>
                      Can UPDATE!
                    </CardBody>
                  </Card>
                </Col>
              </PermissibleRender>

              <PermissibleRender
                userPermissions={userPermissions}
                requiredPermissions={['DELETE_CARD']}
              >
                <Col md={3}>
                  <Card>
                    <CardBody>
                      Can DELETE!
                    </CardBody>
                  </Card>
                </Col>
              </PermissibleRender>

            </Row>
          </Container>
        </div>
      </PermissibleRender> */}
    </React.Fragment>
  )
}

export default Dashboard
