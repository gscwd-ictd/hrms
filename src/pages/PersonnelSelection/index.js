import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate, Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import InterviewScheduleCalendar from './InterviewScheduleCalendar'
import Breadcrumb from 'components/Common/Breadcrumb'
import PublicationPositions from 'components/PersonnelSelection/PublicationPositions'
import 'styles/custom_gscwd/components/table.scss'
import StatusGuide from 'components/Modal/PersonnelSelection/StatusGuide'

const PersonnelSelection = () => {
  /**
   * Modal
   */
  const [showStatusGuide, setShowStatusGuide] = useState(false)

  const toggleStatusGuideModal = () => setShowStatusGuide(!showStatusGuide)

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Personnel Selection"
            />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    <div className="d-flex align-items-start">
                      <UncontrolledDropdown className="ms-auto">
                        <DropdownToggle
                          className="text-muted font-size-16"
                          tag="a"
                          color="white"
                          type="button"
                        >
                          <i className="mdi mdi-dots-horizontal"></i>
                        </DropdownToggle>
                        <DropdownMenu direction="right">
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => toggleStatusGuideModal()}
                          >
                            Status Guide
                          </Link>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>

                    <PublicationPositions />
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card>
                  <CardBody className="card-table">
                    <CardTitle>Interview/Examination Schedule</CardTitle>
                    <InterviewScheduleCalendar />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <StatusGuide
          showStatusGuide={showStatusGuide}
          toggleStatusGuideModal={toggleStatusGuideModal}
        />
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

PersonnelSelection.propTypes = {
  cell: PropTypes.any,
}

export default PersonnelSelection
