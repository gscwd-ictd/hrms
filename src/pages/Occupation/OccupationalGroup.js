import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOccupations,
  fetchOGPositions,
  fetchPositionsWithoutOccupation,
  updatePositionsToOccupation,
  removePositionsToOccupation,
  resetOccupationResponses,
  selectPositionCheckBox,
  unselectPositionCheckBox,
  resetPositionCheckBoxes,
} from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'

import Select from 'react-select'
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Input,
  Spinner,
} from 'reactstrap'
import TableOccupationalGroup from 'components/Table/TableOccupationalGroup'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/global.scss'

const OccupationalGroup = () => {
  const dispatch = useDispatch()
  const { occupationId } = useParams()

  const [selectedPositions, setSelectedPositions] = useState([])
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)
  const [hideDeleteBtn, setHideDeleteBtn] = useState(false)

  // specific occupation details
  const { occupation } = useSelector(state => ({
    occupation: state.Occupation.response.occupations.find(
      occupation => occupation._id === occupationId
    ),
  }))

  // Redux state for current positions under the occupation
  const { positions, loadingOGPositions, errorOGPositions } = useSelector(
    state => ({
      positions: state.Occupation.response.occupationalGroup,
      loadingOGPositions: state.Occupation.loading.occupationalGroupLoading,
      errorOGPositions: state.Occupation.error.occupationalGroupError,
    })
  )

  //  Redux state for Multi-Select. Positions without occupation assignment
  const {
    positionsWithoutOccupation,
    positionsWithoutOccupationLoading,
    positionsWithoutOccupationError,
  } = useSelector(state => ({
    positionsWithoutOccupation: state.Occupation.positionsWithoutOccupation,
    positionsWithoutOccupationLoading:
      state.Occupation.loading.positionsWithoutOccupationLoading,
    positionsWithoutOccupationError:
      state.Occupation.error.positionsWithoutOccupationError,
  }))

  // Redux state for assigning and unassigning positions to occupations
  const {
    assignedPositions,
    unassignedPositions,
    assignPositionsLoading,
    assignPositionsError,
  } = useSelector(state => ({
    assignedPositions: state.Occupation.response.assignedPositions,
    unassignedPositions: state.Occupation.response.unassignedPositions,
    assignPositionsLoading: state.Occupation.loading.assignPositionsLoading,
    assignPositionsError: state.Occupation.error.assignPositionsError,
  }))

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.Occupation.selectedRows,
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
      accessor: 'positionId',
      disableGlobalFilter: true,
    },
    {
      Header: 'Item No.',
      accessor: 'itemNumber',
    },
    {
      Header: 'Position Title',
      accessor: 'positionTitle',
    },
    {
      Header: 'Salary Grade',
      accessor: 'salaryGrade',
    },
    {
      Header: 'Assigned To',
      accessor: 'assignedTo',
      Filter: SelectColumnFilter,
    },
  ]

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => positions, [positions])

  // Multi-select dropdown
  const handleMultiSelect = selectedMulti => {
    let array = []
    selectedMulti.map(option => {
      const positionId = option.value.positionId
      array.push(positionId)
    })
    setSelectedPositions(array)
  }

  // Checkbox action
  const handleCheckBox = (cellRowValues, isChecked) => {
    if (isChecked) {
      dispatch(selectPositionCheckBox(cellRowValues.values.positionId))
    } else {
      dispatch(unselectPositionCheckBox(cellRowValues.values.positionId))
    }
  }

  // Assigning of positions to occupation
  const handleAssignPositions = () => {
    const positionIds = {
      positionIds: selectedPositions,
    }
    dispatch(updatePositionsToOccupation(occupationId, positionIds))
  }

  // Unassigning of positions from occupation
  const handleDeleteRows = () => {
    if (!isEmpty(selectedRows)) {
      const positionIds = {
        positionIds: selectedRows,
      }

      dispatch(removePositionsToOccupation(occupationId, positionIds))
      setDisableDeleteBtn(true)
    }
  }

  // get specific occupation details
  useEffect(() => {
    dispatch(fetchOccupations(occupationId))
    dispatch(resetOccupationResponses())
  }, [occupationId])

  // Get occupational group and list of positions without occupation assigned
  useEffect(() => {
    dispatch(fetchOGPositions(occupationId))
    dispatch(fetchPositionsWithoutOccupation())
  }, [])

  // Trigger when assigning position is success
  useEffect(() => {
    if (!isEmpty(assignedPositions) || !isEmpty(unassignedPositions)) {
      dispatch(fetchOGPositions(occupationId))
      dispatch(fetchPositionsWithoutOccupation())
      dispatch(resetOccupationResponses())
      dispatch(resetPositionCheckBoxes())
    }
  }, [assignedPositions, unassignedPositions])

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
      <Can I="access" this="Occupations">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title={'Occupations'}
              titleUrl="/occupations"
              breadcrumbItem={
                occupation ? occupation.occupationName : 'Occupational Group'
              }
            />

            {/* Error Notif */}
            {errorOGPositions ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorOGPositions}
              />
            ) : null}
            {positionsWithoutOccupationError ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={positionsWithoutOccupationError}
              />
            ) : null}
            {assignPositionsError ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={assignPositionsError}
              />
            ) : null}

            {/* Success Notif */}
            {!isEmpty(assignedPositions) ? (
              <ToastrNotification
                toastType={'success'}
                notifMessage={'Positions successfully assigned'}
              />
            ) : null}
            {!isEmpty(unassignedPositions) ? (
              <ToastrNotification
                toastType={'success'}
                notifMessage={'Positions successfully unassigned'}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingOGPositions || assignPositionsLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="multi-select-top-right-actions">
                          <Row className="justify-content-end">
                            {positionsWithoutOccupationLoading ? (
                              <Spinner className="ms-2" color="secondary" />
                            ) : null}
                            <Col md={8}>
                              <Select
                                isMulti={true}
                                onChange={e => {
                                  handleMultiSelect(e)
                                }}
                                name="select-employees"
                                options={positionsWithoutOccupation}
                              />
                            </Col>
                            <Col md={2}>
                              <Button
                                className="btn btn-info w-100"
                                onClick={() => handleAssignPositions()}
                                disabled={isEmpty(positionsWithoutOccupation)}
                              >
                                Assign
                              </Button>
                            </Col>
                          </Row>
                        </div>

                        <TableOccupationalGroup
                          columns={columns}
                          data={data}
                          handleDeleteRows={handleDeleteRows}
                          disableDeleteBtn={disableDeleteBtn}
                          hideDeleteBtn={hideDeleteBtn}
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

      <Can not I="access" this="Occupations">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

OccupationalGroup.propTypes = {
  cell: PropTypes.any,
}

export default OccupationalGroup
