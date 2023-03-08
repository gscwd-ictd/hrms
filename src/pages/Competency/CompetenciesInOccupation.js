import React, { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchOGCompetencies,
  fetchAvailableFuncCompetencies,
  updateCompetenciesOfOccupation,
  removeCompetenciesOfOccupation,
  resetOGCompetencies,
  selectCompetencyCheckBox,
  unselectCompetencyCheckBox,
  resetCompetencyCheckBoxes,
} from "store/actions"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Input,
} from "reactstrap"
import Select from "react-select"
import TableOccupationCompetencyPool from "components/Table/TableOccupationCompetencyPool"
import Breadcrumbs from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

// style
import "styles/custom_gscwd/global.scss"

const CompetenciesInOccupation = props => {
  const dispatch = useDispatch()

  const [selectedFunctionalCompetency, setSelectedFunctionalCompetency] =
    useState([])
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)

  // redux state for current occupation competencies
  const {
    occupationName,
    competencies,
    loadingOccupationCompetencies,
    errorOccupationCompetencies,
  } = useSelector(state => ({
    occupationName: state.occupationCompetencySet.response.occupationName,
    competencies: state.occupationCompetencySet.response.competencies,
    loadingOccupationCompetencies:
      state.occupationCompetencySet.loading.loadingOccupationCompetencies,
    errorOccupationCompetencies:
      state.occupationCompetencySet.error.errorOccupationCompetencies,
  }))

  // Redux state for Multi-Select. Available functional competencies
  const {
    availableFunctionalCompetencies,
    loadingAvailableFunctionalCompetencies,
    errorAvailableFunctionalCompetencies,
  } = useSelector(state => ({
    availableFunctionalCompetencies:
      state.occupationCompetencySet.availableFunctionalCompetencies,
    loadingOccupationCompetencies:
      state.occupationCompetencySet.loading
        .loadingAvailableFunctionalCompetencies,
    errorOccupationCompetencies:
      state.occupationCompetencySet.error.errorAvailableFunctionalCompetencies,
  }))

  // Redux state for assigning and unassigning positions to occupations
  const {
    assignedCompetencies,
    unassignedCompetencies,
    assignCompetenciesLoading,
    assignCompetenciesError,
  } = useSelector(state => ({
    assignedCompetencies:
      state.occupationCompetencySet.response.assignedCompetencies,
    unassignedCompetencies:
      state.occupationCompetencySet.response.unassignedCompetencies,
    assignCompetenciesLoading:
      state.occupationCompetencySet.loading.loadingOccupationCompetencies,
    assignCompetenciesError:
      state.occupationCompetencySet.error.errorOccupationCompetencies,
  }))

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.occupationCompetencySet.selectedRows,
  }))

  const tblColumns = [
    {
      id: "selection",
      disableGlobalFilter: true,
      Cell: function RowCheckBox({ cell }) {
        return (
          <Input
            type="checkbox"
            name="input-checkbox"
            onChange={event => handleCheckBox(cell.row, event.target.checked)}
          />
        )
      },
    },
    {
      Header: "ID",
      accessor: "competencyId",
      disableGlobalFilter: true,
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Name",
      accessor: "name",
    },
  ]

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => competencies, [competencies])

  // Multi-select dropdown
  const handleMultiSelect = selectedMulti => {
    let array = []
    selectedMulti.map(option => {
      const competencyId = option.value.competencyId
      array.push(competencyId)
    })
    setSelectedFunctionalCompetency(array)
  }

  // Checkbox action
  const handleCheckBox = (cellRowValues, isChecked) => {
    if (isChecked) {
      dispatch(selectCompetencyCheckBox(cellRowValues.values.competencyId))
    } else {
      dispatch(unselectCompetencyCheckBox(cellRowValues.values.competencyId))
    }
  }

  // Assigning of competencies to occupation
  const handleAssignCompetencies = () => {
    const competencyIds = {
      competencyIds: selectedFunctionalCompetency,
    }

    dispatch(
      updateCompetenciesOfOccupation(
        props.match.params.occupationId,
        competencyIds
      )
    )
  }

  // Unassigning of competency from occupation
  const handleDeleteRows = () => {
    if (!isEmpty(selectedRows)) {
      const competencyIds = {
        competencyIds: selectedRows,
      }

      dispatch(
        removeCompetenciesOfOccupation(
          props.match.params.occupationId,
          competencyIds
        )
      )
      setDisableDeleteBtn(true)
    }
  }

  // Get occupational group assigned competency pool and list of positions not unassigned under the occupation.
  useEffect(() => {
    dispatch(fetchOGCompetencies(props.match.params.occupationId))
    dispatch(fetchAvailableFuncCompetencies(props.match.params.occupationId))
  }, [dispatch])

  // Trigger when assigning or unassigning competencies is success
  useEffect(() => {
    if (!isEmpty(assignedCompetencies) || !isEmpty(unassignedCompetencies)) {
      dispatch(fetchOGCompetencies(props.match.params.occupationId))
      dispatch(fetchAvailableFuncCompetencies(props.match.params.occupationId))
      dispatch(resetOGCompetencies())
      dispatch(resetCompetencyCheckBoxes())
    }
  }, [assignedCompetencies, unassignedCompetencies])

  // Enable or disable delete button if there is a row checked
  useEffect(() => {
    if (!isEmpty(selectedRows)) {
      setDisableDeleteBtn(false)
    } else {
      setDisableDeleteBtn(true)
    }
  }, [selectedRows])

  return (
    <React.Fragment>
      <Can I="access" this="Competency">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Competency"
              titleUrl="/competency"
              breadcrumbItem={occupationName}
            />

            {/* Error Notif */}
            {errorOccupationCompetencies ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorOccupationCompetencies}
              />
            ) : null}
            {errorAvailableFunctionalCompetencies ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorAvailableFunctionalCompetencies}
              />
            ) : null}
            {assignCompetenciesError ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={assignCompetenciesError}
              />
            ) : null}

            {/* Success Notif */}
            {!isEmpty(assignedCompetencies) ? (
              <ToastrNotification
                toastType={"success"}
                notifMessage={"Competencies successfully assigned"}
              />
            ) : null}
            {!isEmpty(unassignedCompetencies) ? (
              <ToastrNotification
                toastType={"success"}
                notifMessage={"Competencies successfully unassigned"}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingOccupationCompetencies ||
                    assignCompetenciesLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="multi-select-top-right-actions">
                          <Row className="justify-content-end">
                            {loadingAvailableFunctionalCompetencies ? (
                              <Spinner className="ms-2" color="secondary" />
                            ) : null}
                            <Col md={8}>
                              <Select
                                isMulti={true}
                                onChange={e => {
                                  handleMultiSelect(e)
                                }}
                                name="select-functional-competencies"
                                options={availableFunctionalCompetencies}
                              />
                            </Col>
                            <Col md={2}>
                              <Button
                                className="btn btn-info w-100"
                                onClick={() => handleAssignCompetencies()}
                                disabled={isEmpty(
                                  availableFunctionalCompetencies
                                )}
                              >
                                Assign
                              </Button>
                            </Col>
                          </Row>
                        </div>

                        <TableOccupationCompetencyPool
                          columns={columns}
                          data={data}
                          handleDeleteRows={handleDeleteRows}
                          disableDeleteBtn={disableDeleteBtn}
                        />
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Competency">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

CompetenciesInOccupation.propTypes = {
  cell: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
}

export default CompetenciesInOccupation
