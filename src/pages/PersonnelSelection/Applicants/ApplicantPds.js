import React, { useEffect, useState } from 'react'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApplicantPds, fetchApplicantWes } from 'store/actions'
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap'
import Breadcrumb from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import PersonalDataSheetView from 'components/PersonalDataSheet/Applicant'
import WorkExperienceSheetView from 'components/WorkExperienceSheet/Applicant'
import PositionDescriptionView from 'components/PositionDescription/Applicant'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import {
  fetchJobDescription,
  fetchPositionDuties,
  fetchPositionQualificationStandards,
  fetchCompetencyProficiencyLevels,
} from 'store/actions'

const ApplicantPds = () => {
  const dispatch = useDispatch()

  const {
    applicantId,
    postingApplicantId,
    prfId,
    publicationId,
    isInternal,
    positionIds,
  } = useParams()

  const [activeTab, setactiveTab] = useState('1')

  const { errorApplicantPds, errorApplicantWes } = useSelector(state => ({
    errorApplicantPds: state.applicants.error.errorApplicant,
    errorApplicantWes: state.applicants.error.errorApplicantWes,
  }))

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  useEffect(() => {
    dispatch(fetchApplicantPds(applicantId, isInternal))
    dispatch(fetchApplicantWes(postingApplicantId, isInternal))
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(positionIds)) {
      const positionIdsArr = positionIds.split(',')
      let firstPositionId = positionIdsArr[0]

      dispatch(fetchJobDescription(firstPositionId))
      dispatch(fetchPositionDuties(firstPositionId))
      dispatch(fetchPositionQualificationStandards(firstPositionId))
      dispatch(fetchCompetencyProficiencyLevels(firstPositionId))
    }
  }, [positionIds])
  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Applicants"
              titleUrl={
                '/personnel-selection/publication-positions/' +
                prfId +
                '/publications/' +
                publicationId +
                '/applicants'
              }
              breadcrumbItem="Applicant"
            />

            {errorApplicantPds ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorApplicantPds}
              />
            ) : null}

            {errorApplicantWes ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorApplicantWes}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    {/* Navigation tabs */}
                    <Nav pills className=" nav-justified">
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
                            <i className="fas fa-briefcase fs-5 me-1"></i> Work
                            Experience Sheet
                          </span>
                        </NavLink>
                      </NavItem>

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
                            <i className="fas fa-file-invoice fs-5 me-1"></i>
                            Position Description
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    {/* Tab containers */}
                    <TabContent
                      activeTab={activeTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <PersonalDataSheetView />
                      </TabPane>

                      <TabPane tabId="2">
                        <WorkExperienceSheetView />
                      </TabPane>

                      <TabPane tabId="3">
                        <PositionDescriptionView />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default ApplicantPds
