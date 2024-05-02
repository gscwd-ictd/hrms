import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPositionFunctionalCompetencies,
  fetchPositionManagerialCompetencies,
  fetchAvailableFunctionalCompetencies,
  updateCompetenciesOfPosition,
  removeCompetenciesOfPosition,
  resetPositionCompetencyResponses,
  selectFunctionalCompetencyCheckBox,
  unselectFunctionalCompetencyCheckBox,
  resetFunctionalCompetencyCheckBoxes,
} from 'store/actions'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

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
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import Select from 'react-select'
import TablePositionFunctionalCompetencies from 'components/Table/TablePositionFunctionalCompetencies'

// extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const EditPositionFunctionalCompetenciesModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const [selectedFunctionalCompetencies, setSelectedFunctionalCompetencies] =
    useState([])
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)
  const [competencyCount, setCompetencyCount] = useState(0)

  const [competencyLimit, setCompetencyLimit] = useState(0)

  // count on selected options in the multi-select component
  const [countSelectedOptions, setCountSelectedOptions] = useState(0)

  // Redux state for current functional competencies set in a position
  const {
    functionalCompetencies,
    managerialCompetencies,

    loadingPositionCompetencies,
    errorPositionCompetencies,
  } = useSelector(state => ({
    functionalCompetencies:
      state.positionCompetencySet.response.positionFunctionalCompetencies
        .functional,
    managerialCompetencies:
      state.positionCompetencySet.response.positionManagerialCompetencies
        .managerial,

    loadingPositionCompetencies:
      state.positionCompetencySet.loading.loadingPositionCompetencies,
    errorPositionCompetencies:
      state.positionCompetencySet.error.errorPositionCompetencies,
  }))

  // Redux state for available competencies set in a position
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

  // Redux state for assigning and unassigning competencies to position
  const { assignedCompetencies, unassignedCompetencies } = useSelector(
    state => ({
      assignedCompetencies:
        state.positionCompetencySet.response.assignedCompetencies,
      unassignedCompetencies:
        state.positionCompetencySet.response.unassignedCompetencies,
    })
  )

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.positionCompetencySet.selectedRows,
  }))

  const tblColumns = [
    {
      id: 'selection',
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
      Header: 'ID',
      accessor: 'pcplId',
      disableGlobalFilter: true,
    },
    {
      Header: 'Code',
      accessor: 'code',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Level',
      accessor: 'level',
    },
  ]

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(
    () =>
      !isEmpty(functionalCompetencies)
        ? functionalCompetencies
        : managerialCompetencies,
    [
      !isEmpty(functionalCompetencies)
        ? functionalCompetencies
        : managerialCompetencies,
    ]
  )

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

    dispatch(updateCompetenciesOfPosition(modalData.positionId, proficiencyIds))
    setCountSelectedOptions(0)
  }

  // Unassigning of functional competencies to position
  const handleUnassignFunctionalCompetencies = () => {
    if (!isEmpty(selectedRows)) {
      const pcplIds = {
        pcplIds: selectedRows,
      }

      dispatch(removeCompetenciesOfPosition(pcplIds))
      setDisableDeleteBtn(true)
    }
  }

  const handleCompetencyLimit = positionSg => {
    if (positionSg >= 21)
      setCompetencyLimit(5) // set 5 for managerial competencies
    else setCompetencyLimit(4) // set 4 for function/cross-cutting competencies
  }

  // Get available competency pool from occupation and list of assigned competency for the position
  useEffect(() => {
    if (showEdt) {
      if (modalData.salaryGrade >= 21) {
        dispatch(fetchPositionManagerialCompetencies(modalData.positionId))
      } else {
        dispatch(fetchPositionFunctionalCompetencies(modalData.positionId))
      }

      dispatch(fetchAvailableFunctionalCompetencies(modalData.positionId))
      handleCompetencyLimit(modalData.salaryGrade)
    } else {
      setCountSelectedOptions(0)
    }
  }, [showEdt])

  // Trigger when assigning position is success
  useEffect(() => {
    if (!isEmpty(assignedCompetencies) || !isEmpty(unassignedCompetencies)) {
      if (modalData.salaryGrade >= 21) {
        dispatch(fetchPositionManagerialCompetencies(modalData.positionId))
      } else {
        dispatch(fetchPositionFunctionalCompetencies(modalData.positionId))
      }

      dispatch(fetchAvailableFunctionalCompetencies(modalData.positionId))
      dispatch(resetPositionCompetencyResponses())
      dispatch(resetFunctionalCompetencyCheckBoxes())
      setCountSelectedOptions(0)
    } else {
      setCountSelectedOptions(0)
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

  // Set functional competency count
  useEffect(() => {
    if (!isEmpty(functionalCompetencies)) {
      setCompetencyCount(functionalCompetencies.length)
    } else if (!isEmpty(managerialCompetencies)) {
      setCompetencyCount(managerialCompetencies.length)
    } else {
      setCompetencyCount(0)
    }
  }, [functionalCompetencies, managerialCompetencies])

  return (
    <>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="xl" centered>
        <ModalHeader toggle={handleCloseEdt}>
          {modalData.salaryGrade >= 21 ? 'Managerial' : 'Functional'} Competency
          Assignment
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {modalData.itemNumber} | {modalData.positionTitle}
                  </CardTitle>

                  <CardSubtitle>
                    Assigned {competencyCount} out of {competencyLimit}{' '}
                    functional competencies
                  </CardSubtitle>

                  {/* Error Notif */}
                  {errorPositionCompetencies ? (
                    <ToastrNotification
                      toastType={'error'}
                      notifMessage={errorPositionCompetencies}
                    />
                  ) : null}
                  {errorAvailableFunctionalCompetencies ? (
                    <ToastrNotification
                      toastType={'error'}
                      notifMessage={errorAvailableFunctionalCompetencies}
                    />
                  ) : null}

                  {/* Success Notif */}
                  {!isEmpty(assignedCompetencies) ? (
                    <ToastrNotification
                      toastType={'success'}
                      notifMessage={'Competencies successfully assigned'}
                    />
                  ) : null}
                  {!isEmpty(unassignedCompetencies) ? (
                    <ToastrNotification
                      toastType={'success'}
                      notifMessage={'Competencies successfully unassigned'}
                    />
                  ) : null}

                  <Row className="mt-4">
                    <Col lg={12} className="card-table">
                      {loadingPositionCompetencies ? (
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
                                  isOptionDisabled={() =>
                                    competencyCount + countSelectedOptions >=
                                    competencyLimit
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
                                    competencyCount >= competencyLimit
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
        </ModalBody>
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
