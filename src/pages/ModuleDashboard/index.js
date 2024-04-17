import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'reactstrap'
import CardModule from 'components/ModuleDashboard/CardModule'
import 'styles/custom_gscwd/components/cardmodule.scss'

import { Can } from 'casl/Can'

const ModuleDashboard = props => {
  return (
    <React.Fragment>
      <section className="my-5 pt-sm-5">
        <title>HRMS | Module Dashboard</title>
        <Container>
          <Row>
            <Col xs="12" className="text-center">
              <div className="home-wrapper">
                {/* <div className="mb-5">
                  <img src={logoFull} alt="logo" height="50" />
                </div> */}

                <h3 className="mt-5">HUMAN RESOURCE MANAGEMENT SYSTEM</h3>
                <p>MODULES</p>

                <Row>
                  <Can I="access" this="rspModule">
                    <CardModule moduleUrl="/">
                      <i className="fas fa-user-friends mb-4 card-icon text-primary" />
                      <h5 className="font-size-15 text-uppercase">
                        Recruitment, Selection and Placement
                      </h5>
                    </CardModule>
                  </Can>

                  <Can I="access" this="empModule">
                    <CardModule moduleUrl={process.env.REACT_APP_FE_EMS}>
                      <i className="fas fa-user-clock mb-4 card-icon text-primary" />
                      <h5 className="font-size-15 text-uppercase">
                        Employee Monitoring
                      </h5>
                    </CardModule>
                  </Can>

                  <Can I="access" this="lndModule">
                    <CardModule moduleUrl={process.env.REACT_APP_FE_LD}>
                      <i className="fas fa-user-graduate mb-4 card-icon text-primary" />
                      <h5 className="font-size-15 text-uppercase">
                        Learning and Development
                      </h5>
                    </CardModule>
                  </Can>

                  <Can I="access" this="spmsModule">
                    <CardModule moduleUrl="/module-dashboard">
                      <i className="fas fa-star-half-alt mb-4 card-icon text-primary" />
                      <h5 className="font-size-15 text-uppercase">
                        Strategic Performance Management System
                      </h5>
                    </CardModule>
                  </Can>

                  <Can I="access" this="rnrModule">
                    <CardModule moduleUrl="/module-dashboard">
                      <i className="fas fa-medal mb-4 card-icon text-primary" />
                      <h5 className="font-size-15 text-uppercase">
                        Rewards and Recognition
                      </h5>
                    </CardModule>
                  </Can>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

ModuleDashboard.propTypes = {}

export default ModuleDashboard