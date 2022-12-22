import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCompetencyProficiencyLevels,
  updateCompetencyProficiciencyLevel,
  updatePositionCompetencyProficiencyLevels,
} from "store/actions"
import classnames from "classnames"
import PropTypes from "prop-types"

import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Table,
  Card,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  NavLink,
  NavItem,
  Nav,
  FormGroup,
} from "reactstrap"

// extra components
import ToastrNotification from "components/Notifications/ToastrNotification"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

import { levels } from "constants/selectInputs"
import { isEmpty } from "lodash"

const EditPositionProficiencyLevelModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const [activeTab, setactiveTab] = useState("1")

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

  // All proficiency levels of domains
  const { proficiencyLevels } = useSelector(state => ({
    proficiencyLevels: state.positionCompetencySet.response.proficiencyLevel,
  }))

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(updatePositionCompetencyProficiencyLevels(proficiencyLevels))
    // console.log(proficiencyLevels)
  }

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  const updateSelectValue = (index, domain, event) => {
    dispatch(
      updateCompetencyProficiciencyLevel(index, domain, event.target.value)
    )
  }

  useEffect(() => {
    if (showEdt) {
      dispatch(fetchCompetencyProficiencyLevels(modalData.positionId))
    }
  }, [showEdt])

  return (
    <>
      <Modal
        show={showEdt}
        onHide={() => {
          handleCloseEdt()
          setactiveTab("1")
        }}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Proficiency Level</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Error Notif */}
          {errorProficiencyLevel ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorProficiencyLevel}
            />
          ) : null}

          {/* Success Notif */}
          {!isEmpty(coreProficiencyLevel) ? (
            <ToastrNotification
              toastType={"success"}
              notifMessage={"Proficiency levels retrieved"}
            />
          ) : null}

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {modalData.itemNumber} | {modalData.positionTitle}
                  </CardTitle>
                  <Row>
                    <Col md={3}>
                      <Nav pills vertical>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1")
                            }}
                          >
                            Core
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2")
                            }}
                          >
                            Functional
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3")
                            }}
                          >
                            Functional Cross-Cutting
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4")
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
                                      coreProficiencyLevel.length > 0 ? (
                                        coreProficiencyLevel.map(
                                          (core, index) => {
                                            return (
                                              <tr key={core.pcplId}>
                                                <td>{core.code}</td>
                                                <td>{core.name}</td>
                                                <td>
                                                  <FormGroup>
                                                    <select
                                                      id={
                                                        "core-level-row-" +
                                                        core.code
                                                      }
                                                      className="form-control"
                                                      name={
                                                        "coreLevelRow" +
                                                        core.code
                                                      }
                                                      defaultValue={core.level}
                                                      onChange={event =>
                                                        updateSelectValue(
                                                          index,
                                                          "core",
                                                          event
                                                        )
                                                      }
                                                      required
                                                    >
                                                      {levels.map(
                                                        (level, index) => (
                                                          <option
                                                            key={index}
                                                            value={level}
                                                          >
                                                            {level}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </FormGroup>
                                                </td>
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
                                      functionalProficiencyLevel.length > 0 ? (
                                        functionalProficiencyLevel.map(
                                          (functional, index) => {
                                            return (
                                              <tr key={functional.pcplId}>
                                                <td>{functional.code}</td>
                                                <td>{functional.name}</td>
                                                <td>
                                                  <FormGroup>
                                                    <select
                                                      id={
                                                        "functional-level-row-" +
                                                        functional.code
                                                      }
                                                      className="form-control"
                                                      name={
                                                        "functionalLevelRow" +
                                                        functional.code
                                                      }
                                                      defaultValue={
                                                        functional.level
                                                      }
                                                      onChange={event =>
                                                        updateSelectValue(
                                                          index,
                                                          "functional",
                                                          event
                                                        )
                                                      }
                                                      required
                                                    >
                                                      {levels.map(
                                                        (level, index) => (
                                                          <option
                                                            key={index}
                                                            value={level}
                                                          >
                                                            {level}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </FormGroup>
                                                </td>
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
                                              <tr key={crossCutting.pcplId}>
                                                <td>{crossCutting.code}</td>
                                                <td>{crossCutting.name}</td>
                                                <td>
                                                  <FormGroup>
                                                    <select
                                                      id={
                                                        "cross-cutting-level-row-" +
                                                        crossCutting.code
                                                      }
                                                      className="form-control"
                                                      name={
                                                        "crossCuttingLevelRow" +
                                                        crossCutting.code
                                                      }
                                                      defaultValue={
                                                        crossCutting.level
                                                      }
                                                      onChange={event =>
                                                        updateSelectValue(
                                                          index,
                                                          "crossCutting",
                                                          event
                                                        )
                                                      }
                                                      required
                                                    >
                                                      {levels.map(
                                                        (level, index) => (
                                                          <option
                                                            key={index}
                                                            value={level}
                                                          >
                                                            {level}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </FormGroup>
                                                </td>
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
                                      managerialProficiencyLevel.length > 0 ? (
                                        managerialProficiencyLevel.map(
                                          (managerial, index) => {
                                            return (
                                              <tr key={managerial.pcplId}>
                                                <td>{managerial.code}</td>
                                                <td>{managerial.name}</td>
                                                <td>
                                                  <FormGroup>
                                                    <select
                                                      id={
                                                        "managerial-level-row-" +
                                                        managerial.code
                                                      }
                                                      className="form-control"
                                                      name={
                                                        "managerialLevelRow" +
                                                        managerial.code
                                                      }
                                                      defaultValue={
                                                        managerial.level
                                                      }
                                                      onChange={event =>
                                                        updateSelectValue(
                                                          index,
                                                          "managerial",
                                                          event
                                                        )
                                                      }
                                                      required
                                                    >
                                                      {levels.map(
                                                        (level, index) => (
                                                          <option
                                                            key={index}
                                                            value={level}
                                                          >
                                                            {level}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </FormGroup>
                                                </td>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button color="info" onClick={event => handleSubmit(event)}>
            Update
          </Button>
          <Button
            color="danger"
            onClick={() => {
              handleCloseEdt()
              setactiveTab("1")
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

EditPositionProficiencyLevelModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditPositionProficiencyLevelModal
