import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCompetencyProficiencyLevels,
  fetchPlantillaPosition,
} from 'store/actions'

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  TabContent,
  TabPane,
  NavLink,
  NavItem,
  Nav,
  CardTitle,
} from 'reactstrap'
import Breadcrumbs from 'components/Common/Breadcrumb'
import EditPositionProficiencyLevelModal from 'components/Modal/Competency/EditPositionProficiencyLevelModal'
import EditPositionFunctionalCompetenciesModal from 'components/Modal/Competency/EditPositionFunctionalCompetenciesModal'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'

const PositionCompetencies = () => {
  const dispatch = useDispatch()
  const { plantillaId } = useParams()

  const [activeTab, setactiveTab] = useState('1')

  // Competency Setting / Proficiency Level modals (same as Competency > occupation > position)
  const [showFuncCompetencyEdt, setShowFuncCompetencyEdt] = useState(false)
  const [showProficiencyLvlEdt, setShowProficiencyLvlEdt] = useState(false)

  // Proficiency levels of individual model domains
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

  const { positionDetails, pdIsLoading, pdError } = useSelector(state => ({
    positionDetails: state.plantilla.plantillaPosition,
    pdIsLoading: state.plantilla.isLoading,
    pdError: state.plantilla.error,
  }))

  useEffect(() => {
    if (plantillaId) {
      dispatch(fetchCompetencyProficiencyLevels(plantillaId))
      dispatch(fetchPlantillaPosition(plantillaId))
    }
  }, [dispatch])

  const modalData = {
    positionId: plantillaId,
    itemNumber: positionDetails.itemNumber,
    positionTitle: positionDetails.positionTitle,
    salaryGrade: Number(positionDetails.salaryGrade),
  }

  // after closing a modal, reload the competencies shown on this page
  const handleCloseFuncCompetencyEdt = () => {
    setShowFuncCompetencyEdt(false)
    dispatch(fetchCompetencyProficiencyLevels(plantillaId))
  }
  const handleCloseProficiencyLvlEdt = () => {
    setShowProficiencyLvlEdt(false)
    dispatch(fetchCompetencyProficiencyLevels(plantillaId))
  }

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {errorProficiencyLevel ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorProficiencyLevel}
              />
            ) : null}

            {pdError ? (
              <ToastrNotification toastType={'error'} notifMessage={pdError} />
            ) : null}

            {loadingProficiencyLevel && pdIsLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Breadcrumbs
                  title={positionDetails.itemNumber}
                  titleUrl={`/plantilla/permanent/${plantillaId}`}
                  breadcrumbItem="Competencies"
                  positionTitle="Competencies"
                />

                {/*  Notifications */}
                {errorProficiencyLevel ? (
                  <ToastrNotification
                    toastType={'error'}
                    notifMessage={errorProficiencyLevel}
                  />
                ) : null}

                <Container fluid={true}>
                  <Row>
                    <Col lg={12}>
                      <Card>
                        <CardBody>
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                            <CardTitle className="mb-0">
                              {positionDetails.positionTitle} |{' '}
                              {positionDetails.itemNumber}
                            </CardTitle>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-info waves-effect waves-light inrow-btn-style"
                                onClick={() => setShowFuncCompetencyEdt(true)}
                              >
                                Competency Setting{' '}
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-info waves-effect waves-light inrow-btn-style"
                                onClick={() => setShowProficiencyLvlEdt(true)}
                              >
                                Proficiency Level <i className="fas fa-edit"></i>
                              </button>
                            </div>
                          </div>
                          <Row>
                            <Col md={3}>
                              <Nav pills vertical>
                                <NavItem>
                                  <NavLink
                                    style={{ cursor: 'pointer' }}
                                    className={classnames({
                                      active: activeTab === '1',
                                    })}
                                    onClick={() => {
                                      toggle('1')
                                    }}
                                  >
                                    Core
                                  </NavLink>
                                </NavItem>

                                <NavItem>
                                  <NavLink
                                    style={{ cursor: 'pointer' }}
                                    className={classnames({
                                      active: activeTab === '2',
                                    })}
                                    onClick={() => {
                                      toggle('2')
                                    }}
                                  >
                                    Functional
                                  </NavLink>
                                </NavItem>

                                <NavItem>
                                  <NavLink
                                    style={{ cursor: 'pointer' }}
                                    className={classnames({
                                      active: activeTab === '3',
                                    })}
                                    onClick={() => {
                                      toggle('3')
                                    }}
                                  >
                                    Functional Cross-Cutting
                                  </NavLink>
                                </NavItem>

                                <NavItem>
                                  <NavLink
                                    style={{ cursor: 'pointer' }}
                                    className={classnames({
                                      active: activeTab === '4',
                                    })}
                                    onClick={() => {
                                      toggle('4')
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
                                <TabContent activeTab={activeTab}>
                                  <TabPane tabId="1" className="p-3">
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
                                              coreProficiencyLevel.length >
                                                0 ? (
                                                coreProficiencyLevel.map(
                                                  (core, index) => {
                                                    return (
                                                      <tr key={core.pcplId}>
                                                        <td>{core.code}</td>
                                                        <td>{core.name}</td>
                                                        <td>{core.level}</td>
                                                      </tr>
                                                    )
                                                  }
                                                )
                                              ) : (
                                                <tr>
                                                  <td
                                                    colSpan="3"
                                                    className="ta-center"
                                                  >
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

                                  <TabPane tabId="2" className="p-3">
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
                                              functionalProficiencyLevel.length >
                                                0 ? (
                                                functionalProficiencyLevel.map(
                                                  (functional, index) => {
                                                    return (
                                                      <tr
                                                        key={functional.pcplId}
                                                      >
                                                        <td>
                                                          {functional.code}
                                                        </td>
                                                        <td>
                                                          {functional.name}
                                                        </td>
                                                        <td>
                                                          {functional.level}
                                                        </td>
                                                      </tr>
                                                    )
                                                  }
                                                )
                                              ) : (
                                                <tr>
                                                  <td
                                                    colSpan="3"
                                                    className="ta-center"
                                                  >
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

                                  <TabPane tabId="3" className="p-3">
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
                                              crossCuttingProficiencyLevel.length >
                                                0 ? (
                                                crossCuttingProficiencyLevel.map(
                                                  (crossCutting, index) => {
                                                    return (
                                                      <tr
                                                        key={
                                                          crossCutting.pcplId
                                                        }
                                                      >
                                                        <td>
                                                          {crossCutting.code}
                                                        </td>
                                                        <td>
                                                          {crossCutting.name}
                                                        </td>
                                                        <td>
                                                          {crossCutting.level}
                                                        </td>
                                                      </tr>
                                                    )
                                                  }
                                                )
                                              ) : (
                                                <tr>
                                                  <td
                                                    colSpan="3"
                                                    className="ta-center"
                                                  >
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

                                  <TabPane tabId="4" className="p-3">
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
                                              managerialProficiencyLevel.length >
                                                0 ? (
                                                managerialProficiencyLevel.map(
                                                  (managerial, index) => {
                                                    return (
                                                      <tr
                                                        key={managerial.pcplId}
                                                      >
                                                        <td>
                                                          {managerial.code}
                                                        </td>
                                                        <td>
                                                          {managerial.name}
                                                        </td>
                                                        <td>
                                                          {managerial.level}
                                                        </td>
                                                      </tr>
                                                    )
                                                  }
                                                )
                                              ) : (
                                                <tr>
                                                  <td
                                                    colSpan="3"
                                                    className="ta-center"
                                                  >
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
                          <EditPositionFunctionalCompetenciesModal
                            showEdt={showFuncCompetencyEdt}
                            handleCloseEdt={handleCloseFuncCompetencyEdt}
                            modalData={modalData}
                          />
                          <EditPositionProficiencyLevelModal
                            showEdt={showProficiencyLvlEdt}
                            handleCloseEdt={handleCloseProficiencyLvlEdt}
                            modalData={modalData}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </div>
        </div>
      </Can>

      <Can not I="access" this="Plantilla">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionCompetencies
