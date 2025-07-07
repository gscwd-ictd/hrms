import React, { useState } from 'react'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Table,
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import OutlinedBox from 'components/OutlinedBox'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { Capitalize } from 'functions/Capitalize'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import { isEmpty } from 'lodash'

// style
import 'styles/custom_gscwd/components/personaldatasheet.scss'

const PositionDescriptionView = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [activeTabComp, setActiveTabComp] = useState(1)

  const { plantillaItems } = useParams()

  const { jobDescription, loadingJobDescription, errorJobDescription } =
    useSelector(state => ({
      jobDescription: state.jobDescription.response.get,
      loadingJobDescription: state.jobDescription.loading.loadingJobDescription,
      errorJobDescription: state.jobDescription.error.errorJobDescription,
    }))

  const {
    positionDutyResponsibilities,
    loadingPositionDuties,
    errorPositionDuties,
  } = useSelector(state => ({
    positionDutyResponsibilities:
      state.dutiesResponsibilities.response.positionDutyResponsibilities,
    loadingPositionDuties:
      state.dutiesResponsibilities.loading.loadingPositionDuties,
    errorPositionDuties: state.dutiesResponsibilities.error.errorPositionDuties,
  }))

  const { positionQs, loadingPositionQs, errorPositionQs } = useSelector(
    state => ({
      positionQs: state.qualificationStandards.position.get,
      loadingPositionQs: state.qualificationStandards.loading.loadingPositionQs,
      errorPositionQs: state.qualificationStandards.error.errorPositionQs,
    })
  )

  const {
    coreProficiencyLevel,
    functionalProficiencyLevel,
    crossCuttingProficiencyLevel,
    managerialProficiencyLevel,
    loadingProficiencyLevel,
    errorProficiencyLevel,
  } = useSelector(state => ({
    coreProficiencyLevel:
      state.positionCompetencySet.response.proficiencyLevel.core,
    functionalProficiencyLevel:
      state.positionCompetencySet.response.proficiencyLevel.functional,
    crossCuttingProficiencyLevel:
      state.positionCompetencySet.response.proficiencyLevel.crossCutting,
    managerialProficiencyLevel:
      state.positionCompetencySet.response.proficiencyLevel.managerial,
    loadingProficiencyLevel:
      state.positionCompetencySet.loading.loadingProficiencyLevel,
    errorProficiencyLevel:
      state.positionCompetencySet.error.errorProficiencyLevel,
  }))

  // For toggling between tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 8) {
        setActiveTab(tab)
      }
    }
  }

  const toggleCompTab = tab => {
    if (activeTabComp !== tab) {
      if (tab >= 1 && tab <= 4) {
        setActiveTabComp(tab)
      }
    }
  }

  return (
    <React.Fragment>
      {/* Error Notifications */}
      {errorJobDescription ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorJobDescription}
        />
      ) : null}

      {errorPositionDuties ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorPositionDuties}
        />
      ) : null}

      {errorPositionQs ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorPositionQs}
        />
      ) : null}

      {errorProficiencyLevel ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorProficiencyLevel}
        />
      ) : null}

      <div className="vertical-wizard wizard clearfix vertical">
        {/* Tab navigation */}
        <div className="steps clearfix">
          <ul>
            <NavItem
              className={classnames({
                current: activeTab === 1,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 1 })}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                <span className="number">01</span>{' '}
                <span>Position Description</span>
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                current: activeTab === 2,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 2 })}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                <span className="number">02</span>{' '}
                <span>Duties and Responsibilities</span>
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                current: activeTab === 3,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 3 })}
                onClick={() => {
                  setActiveTab(3)
                }}
              >
                <span className="number">03</span>{' '}
                <span>Qualification Standards</span>
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                current: activeTab === 4,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 4 })}
                onClick={() => {
                  setActiveTab(4)
                }}
              >
                <span className="number">04</span> <span>Competencies</span>
              </NavLink>
            </NavItem>
          </ul>
        </div>

        {/* Tab content */}
        <div className="content clearfix">
          <TabContent
            activeTab={activeTab}
            className="twitter-bs-wizard-tab-content"
          >
            <TabPane tabId={1}>
              {loadingJobDescription ? (
                <LoadingIndicator />
              ) : (
                <Row>
                  <Col sm={6}>
                    <OutlinedBox
                      label={'Item No'}
                      value={plantillaItems || 'N/A'}
                    />
                  </Col>

                  <Col sm={6}>
                    <OutlinedBox
                      label={'Position Title'}
                      value={jobDescription.positionTitle || 'N/A'}
                    />
                  </Col>

                  <Col sm={4} className="mt-4">
                    <OutlinedBox
                      label={'Salary Grade'}
                      value={jobDescription.salary.salaryGrade || 'N/A'}
                    />
                  </Col>

                  <Col sm={4} className="mt-4">
                    <OutlinedBox
                      label={'Step Increment'}
                      value={jobDescription.salary.stepIncrement || 'N/A'}
                    />
                  </Col>

                  <Col sm={4} className="mt-4">
                    <OutlinedBox
                      label={'Nature of Appointment'}
                      value={
                        Capitalize(jobDescription.natureOfAppointment) || 'N/A'
                      }
                    />
                  </Col>

                  <Col sm={6} className="mt-4">
                    <OutlinedBox
                      label={'Reports To'}
                      value={jobDescription.reportsTo || 'N/A'}
                    />
                  </Col>

                  <Col sm={6} className="mt-4">
                    <OutlinedBox
                      label={'Office'}
                      value={jobDescription?.assignedTo?.office.name || 'N/A'}
                    />
                  </Col>

                  <Col sm={6} className="mt-4">
                    <OutlinedBox
                      label={'Department'}
                      value={
                        jobDescription?.assignedTo?.department.name || 'N/A'
                      }
                    />
                  </Col>

                  <Col sm={6} className="mt-4">
                    <OutlinedBox
                      label={'Division'}
                      value={jobDescription?.assignedTo?.division.name || 'N/A'}
                    />
                  </Col>

                  <Col sm={12} className="mt-4">
                    <OutlinedBox
                      label={
                        'Decribe briefly the general function of the position (Job Summary)'
                      }
                      value={jobDescription.summary || 'N/A'}
                    />
                  </Col>

                  <Col sm={12} className="mt-4">
                    <OutlinedBox
                      label={
                        'Decribe briefly the general function of Office/Department/Division'
                      }
                      value={jobDescription.description || 'N/A'}
                    />
                  </Col>
                </Row>
              )}
            </TabPane>

            <TabPane tabId={2}>
              {loadingPositionDuties ? (
                <LoadingIndicator />
              ) : (
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th>Percentage</th>
                        <th>Competency</th>
                        <th>Level</th>
                        <th>Duty Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isEmpty(positionDutyResponsibilities.duties.core) ? (
                        positionDutyResponsibilities.duties.core.map(
                          (duty, i) => {
                            return (
                              <tr key={i}>
                                <td>{duty.percentage}%</td>
                                <td>{duty.competency}</td>
                                <td>{duty.level}</td>
                                <td className="whitespace-pre-line">
                                  {duty.description}
                                </td>
                              </tr>
                            )
                          }
                        )
                      ) : (
                        <tr>
                          <td colSpan="4" className="ta-center">
                            No Duties Assigned
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </TabPane>

            <TabPane tabId={3}>
              {loadingPositionQs ? (
                <LoadingIndicator />
              ) : (
                <Row>
                  <Col sm={12} className="mt-4">
                    <OutlinedBox
                      label={'Eligibility'}
                      value={positionQs.eligibility || 'N/A'}
                    />
                  </Col>

                  <Col sm={12} className="mt-4">
                    <OutlinedBox
                      label={'Education'}
                      value={positionQs.education || 'N/A'}
                    />
                  </Col>

                  <Col sm={12} className="mt-4">
                    <OutlinedBox
                      label={'Experience'}
                      value={positionQs.experience || 'N/A'}
                    />
                  </Col>

                  <Col sm={12} className="mt-4">
                    <OutlinedBox
                      label={'Training'}
                      value={positionQs.training || 'N/A'}
                    />
                  </Col>
                </Row>
              )}
            </TabPane>

            <TabPane tabId={4}>
              <Row>
                <Col md={3}>
                  <Nav pills vertical>
                    <NavItem
                      className={classnames({
                        current: activeTabComp === 1,
                      })}
                    >
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTabComp === 1,
                        })}
                        onClick={() => {
                          toggleCompTab(1)
                        }}
                      >
                        Core
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTabComp === 2,
                        })}
                        onClick={() => {
                          toggleCompTab(2)
                        }}
                      >
                        Functional
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTabComp === 3,
                        })}
                        onClick={() => {
                          toggleCompTab(3)
                        }}
                      >
                        Functional Cross-Cutting
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTabComp === 4,
                        })}
                        onClick={() => {
                          toggleCompTab(4)
                        }}
                      >
                        Managerial
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>

                <Col md={9}>
                  {loadingProficiencyLevel ? (
                    <LoadingIndicator />
                  ) : (
                    <TabContent activeTab={activeTabComp}>
                      <TabPane tabId={1} className="p-3">
                        <Row>
                          <Col sm="12">
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Level</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {coreProficiencyLevel &&
                                  coreProficiencyLevel.length > 0 ? (
                                    coreProficiencyLevel.map((core, index) => {
                                      return (
                                        <tr key={core.pcplId}>
                                          <td>{core.code}</td>
                                          <td>{core.name}</td>
                                          <td>{core.level}</td>
                                        </tr>
                                      )
                                    })
                                  ) : (
                                    <tr>
                                      <td colSpan="3" className="ta-center">
                                        No Records Available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId={2} className="p-3">
                        <Row>
                          <Col sm="12">
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Level</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {functionalProficiencyLevel &&
                                  functionalProficiencyLevel.length > 0 ? (
                                    functionalProficiencyLevel.map(
                                      (functional, index) => {
                                        return (
                                          <tr key={functional.pcplId}>
                                            <td>{functional.code}</td>
                                            <td>{functional.name}</td>
                                            <td>{functional.level}</td>
                                          </tr>
                                        )
                                      }
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan="3" className="ta-center">
                                        No Records Available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId={3} className="p-3">
                        <Row>
                          <Col sm="12">
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Level</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {crossCuttingProficiencyLevel &&
                                  crossCuttingProficiencyLevel.length > 0 ? (
                                    crossCuttingProficiencyLevel.map(
                                      (crossCutting, index) => {
                                        return (
                                          <tr key={crossCutting.pcplId}>
                                            <td>{crossCutting.code}</td>
                                            <td>{crossCutting.name}</td>
                                            <td>{crossCutting.level}</td>
                                          </tr>
                                        )
                                      }
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan="3" className="ta-center">
                                        No Records Available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId={4} className="p-3">
                        <Row>
                          <Col sm="12">
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Level</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {managerialProficiencyLevel &&
                                  managerialProficiencyLevel.length > 0 ? (
                                    managerialProficiencyLevel.map(
                                      (managerial, index) => {
                                        return (
                                          <tr key={managerial.pcplId}>
                                            <td>{managerial.code}</td>
                                            <td>{managerial.name}</td>
                                            <td>{managerial.level}</td>
                                          </tr>
                                        )
                                      }
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan="3" className="ta-center">
                                        No Records Available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  )}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>

        {/* Next and previous buttons */}
        <div className="actions clearfix">
          <ul>
            <li className={activeTab === 1 ? 'previous disabled' : 'previous'}>
              <Link
                to="#"
                onClick={() => {
                  toggleTab(activeTab - 1)
                }}
              >
                Previous
              </Link>
            </li>
            <li className={activeTab === 8 ? 'next disabled' : 'next'}>
              <Link
                to="#"
                onClick={() => {
                  toggleTab(activeTab + 1)
                }}
              >
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PositionDescriptionView
