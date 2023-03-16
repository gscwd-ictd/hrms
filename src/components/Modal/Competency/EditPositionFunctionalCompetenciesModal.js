import React, { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchPositionFunctionalCompetencies,
  fetchAvailableFunctionalCompetencies,
  updateFunctionalCompetenciesOfPosition,
  removeFunctionalCompetenciesOfPosition,
  resetPositionCompetencyResponses,
  selectFunctionalCompetencyCheckBox,
  unselectFunctionalCompetencyCheckBox,
  resetFunctionalCompetencyCheckBoxes,
} from "store/actions"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Card,
  CardTitle,
  CardBody,
  Input,
  Spinner,
  CardSubtitle,
} from "reactstrap"
import Select from "react-select"
import TablePositionFunctionalCompetencies from "components/Table/TablePositionFunctionalCompetencies"

// extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const EditPositionFunctionalCompetenciesModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const [selectedFunctionalCompetencies, setSelectedFunctionalCompetencies] =
    useState([])
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)
  const [competencyCount, setCompetencyCount] = useState(0)

  // count on selected options in the multi-select component
  const [countSelectedOptions, setCountSelectedOptions] = useState(0)

  // Redux state for current functional competencies set in a position
  const {
    functionalCompetencies,
    loadingPositionFunctionalCompetencies,
    errorPositionFunctionalCompetencies,
  } = useSelector(state => ({
    functionalCompetencies:
      state.positionCompetencySet.response.positionFunctionalCompetencies
        .functional,
    loadingPositionFunctionalCompetencies:
      state.positionCompetencySet.loading.loadingPositionFunctionalCompetencies,
    errorPositionFunctionalCompetencies:
      state.positionCompetencySet.error.errorPositionFunctionalCompetencies,
  }))

  // Redux state for available functional/crosscutting competencies set in a position
  const {
    availableFunctionalCompetencies,
    loadingAvailableFunctionalCompetencies,
    errorAvailableFunctionalCompetencies,
  } = useSelector(state => ({
    availableFunctionalCompetencies:
      state.positionCompetencySet.availableFunctionalCompetencies,
    loadingAvailableFunctionalCompetencies:
      state.positionCompetencySet.loading
        .loadingAvailableFunctionalCompetencies,
    errorAvailableFunctionalCompetencies:
      state.positionCompetencySet.error.errorAvailableFunctionalCompetencies,
  }))

  // Redux state for assigning and unassigning functional competencies to position
  const { assignedFunctionalCompetencies, unassignedFunctionalCompetencies } =
    useSelector(state => ({
      assignedFunctionalCompetencies:
        state.positionCompetencySet.response.assignedFunctionalCompetencies,
      unassignedFunctionalCompetencies:
        state.positionCompetencySet.response.unassignedFunctionalCompetencies,
    }))

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.positionCompetencySet.selectedRows,
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
      accessor: "pcplId",
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
    {
      Header: "Level",
      accessor: "level",
    },
  ]

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => functionalCompetencies, [functionalCompetencies])

  // Multi-select dropdown
  const handleMultiSelect = selectedMulti => {
    let array = []
    selectedMulti.map(option => {
      const proficiencyId = option.value.proficiencyId
      array.push(proficiencyId)
    })
    setSelectedFunctionalCompetencies(array)
    setCountSelectedOptions(array.length)
  }

  // Checkbox action
  const handleCheckBox = (cellRowValues, isChecked) => {
    if (isChecked) {
      dispatch(selectFunctionalCompetencyCheckBox(cellRowValues.values.pcplId))
    } else {
      dispatch(
        unselectFunctionalCompetencyCheckBox(cellRowValues.values.pcplId)
      )
    }
  }

  // Assigning of functional competencies to position
  const handleAssignFunctionalCompetencies = () => {
    const proficiencyIds = {
      proficiencyIds: selectedFunctionalCompetencies,
    }

    dispatch(
      updateFunctionalCompetenciesOfPosition(
        modalData.positionId,
        proficiencyIds
      )
    )
    setCountSelectedOptions(0)
  }

  // Unassigning of functional competencies to position
  const handleUnassignFunctionalCompetencies = () => {
    if (!isEmpty(selectedRows)) {
      const pcplIds = {
        pcplIds: selectedRows,
      }

      dispatch(removeFunctionalCompetenciesOfPosition(pcplIds))
      setDisableDeleteBtn(true)
    }
  }

  // Get available competency pool from occupation and list of assigned competency for the position
  useEffect(() => {
    if (showEdt) {
      dispatch(fetchPositionFunctionalCompetencies(modalData.positionId))
      dispatch(fetchAvailableFunctionalCompetencies(modalData.positionId))
    }
  }, [showEdt])

  // Trigger when assigning position is success
  useEffect(() => {
    if (
      !isEmpty(assignedFunctionalCompetencies) ||
      !isEmpty(unassignedFunctionalCompetencies)
    ) {
      dispatch(fetchPositionFunctionalCompetencies(modalData.positionId))
      dispatch(fetchAvailableFunctionalCompetencies(modalData.positionId))
      dispatch(resetPositionCompetencyResponses())
      dispatch(resetFunctionalCompetencyCheckBoxes())
      setCountSelectedOptions(0)
    } else {
      setCountSelectedOptions(0)
    }
  }, [assignedFunctionalCompetencies, unassignedFunctionalCompetencies])

  // Enable or disable delete button if there is a row checked
  useEffect(() => {
    if (!isEmpty(selectedRows)) {
      setDisableDeleteBtn(false)
    } else {
      setDisableDeleteBtn(true)
    }
  }, [selectedRows])

  // Set functional competency count
  useEffect(() => {
    if (!isEmpty(functionalCompetencies)) {
      setCompetencyCount(functionalCompetencies.length)
    } else {
      setCompetencyCount(0)
    }
  }, [functionalCompetencies])

  return (
    <>
      <Modal
        show={showEdt}
        onHide={() => {
          handleCloseEdt()
        }}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Functional Competency Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {modalData.itemNumber} | {modalData.positionTitle}
                  </CardTitle>
                  <CardSubtitle>
                    Assigned {competencyCount} out of 4 functional competencies
                  </CardSubtitle>

                  {/* Error Notif */}
                  {errorPositionFunctionalCompetencies ? (
                    <ToastrNotification
                      toastType={"error"}
                      notifMessage={errorPositionFunctionalCompetencies}
                    />
                  ) : null}
                  {errorAvailableFunctionalCompetencies ? (
                    <ToastrNotification
                      toastType={"error"}
                      notifMessage={errorAvailableFunctionalCompetencies}
                    />
                  ) : null}

                  {/* Success Notif */}
                  {!isEmpty(assignedFunctionalCompetencies) ? (
                    <ToastrNotification
                      toastType={"success"}
                      notifMessage={
                        "Functional competencies successfully assigned"
                      }
                    />
                  ) : null}
                  {!isEmpty(unassignedFunctionalCompetencies) ? (
                    <ToastrNotification
                      toastType={"success"}
                      notifMessage={
                        "Functional competencies successfully unassigned"
                      }
                    />
                  ) : null}

                  <Row className="mt-4">
                    <Col lg={12} className="card-table">
                      {loadingPositionFunctionalCompetencies ? (
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
                                  // isDisabled={competencyCount >= 4}
                                  isOptionDisabled={() =>
                                    competencyCount + countSelectedOptions >= 4
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <Button
                                  className="btn btn-info w-100"
                                  onClick={() =>
                                    handleAssignFunctionalCompetencies()
                                  }
                                  disabled={
                                    isEmpty(availableFunctionalCompetencies) ||
                                    competencyCount >= 4
                                  }
                                >
                                  Assign
                                </Button>
                              </Col>
                            </Row>
                          </div>

                          <TablePositionFunctionalCompetencies
                            columns={columns}
                            data={data}
                            handleDeleteRows={
                              handleUnassignFunctionalCompetencies
                            }
                            disableDeleteBtn={disableDeleteBtn}
                          />
                        </>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

EditPositionFunctionalCompetenciesModal.propTypes = {
  cell: PropTypes.any,
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
  match: PropTypes.object,
}

export default EditPositionFunctionalCompetenciesModal
