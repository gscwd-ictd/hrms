import React from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"

import { Container, Row, Col } from "reactstrap"
import logoFull from "../../assets/images/hrms_logo.png"
import CardModule from "components/ModuleDashboard/CardModule"
import "styles/custom_gscwd/components/cardmodule.scss"

const ModuleDashboard = props => {
  return (
    <React.Fragment>
      <section className="my-5 pt-sm-5">
        <MetaTags>
          <title>HRMS | Module Dashboard</title>
        </MetaTags>
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
                  <CardModule moduleUrl="/dashboard">
                    <i className="fas fa-user-friends mb-4 card-icon text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      Recruitment, Selection and Placement
                    </h5>
                  </CardModule>

                  <CardModule moduleUrl="http://192.168.99.120:3109/dashboard">
                    <i className="fas fa-user-clock mb-4 card-icon text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      Employee Monitoring
                    </h5>
                  </CardModule>

                  <CardModule moduleUrl="/#">
                    <i className="fas fa-star-half-alt mb-4 card-icon text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      Strategic Performance Management System
                    </h5>
                  </CardModule>

                  <CardModule moduleUrl="/#">
                    <i className="fas fa-user-graduate mb-4 card-icon text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      Training and Development
                    </h5>
                  </CardModule>

                  <CardModule moduleUrl="/#">
                    <i className="fas fa-medal mb-4 card-icon text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      Rewards and Recognition
                    </h5>
                  </CardModule>

                  <CardModule moduleUrl="/#">
                    <i className="fas fa-money-check mb-4 card-icon text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      Payroll and Remittances
                    </h5>
                  </CardModule>
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
