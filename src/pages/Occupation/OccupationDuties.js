import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchOccupationDuties,
  fetchAvailableDuties,
  addAssignOccupationDuties,
  removeUnassignOccupationDuties,
  resetDutiesResponse,
  selectDutyCheckBox,
  unselectDutyCheckBox,
  resetDutyCheckBoxes,
} from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"
import { isEmpty } from "lodash"

import Select from "react-select"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Input,
  Spinner,
} from "reactstrap"
import TableOccupationDuties from "components/Table/TableOccupationDuties"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/global.scss"

const OccupationDuties = props => {
  const dispatch = useDispatch()

  const [selectedDuties, setSelectedDuties] = useState([])
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)
  const [hideDeleteBtn, setHideDeleteBtn] = useState(false)
  const [disableAssignBtn, setDisableAssignBtn] = useState(true)

  // Redux state for current positions under the occupation
  const {
    occupationDutyResponsibilities,
    loadingOccupationDutyResponsibilities,
    errorOccupationDutyResponsibilities,
  } = useSelector(state => ({
    occupationDutyResponsibilities:
      state.dutiesResponsibilities.response.occupationDutyResponsibilities,
    loadingOccupationDutyResponsibilities:
      state.dutiesResponsibilities.loading
        .loadingOccupationDutyResponsibilities,
    errorOccupationDutyResponsibilities:
      state.dutiesResponsibilities.error.errorOccupationDutyResponsibilities,
  }))

  //  Redux state for Multi-Select. Duties without occupation assignment
  const {
    availableDutyResponsibilities,
    loadingAvailableDutyResponsibilities,
    errorAvailableDutyResponsibilities,
  } = useSelector(state => ({
    availableDutyResponsibilities:
      state.dutiesResponsibilities.response.availableDutyResponsibilities,
    loadingAvailableDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingAvailableDutyResponsibilities,
    errorAvailableDutyResponsibilities:
      state.dutiesResponsibilities.error.errorAvailableDutyResponsibilities,
  }))

  // Redux state for assigning and unassigning positions to occupations
  const { assignedDutyResponsibilities, unassignedDutyResponsibilities } =
    useSelector(state => ({
      assignedDutyResponsibilities:
        state.dutiesResponsibilities.response.assignedDutyResponsibilities,
      unassignedDutyResponsibilities:
        state.dutiesResponsibilities.response.unassignedDutyResponsibilities,
    }))

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.dutiesResponsibilities.selectedRows,
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
      accessor: "odrId",
      disableGlobalFilter: true,
    },
    {
      Header: "Description",
      accessor: "description",
    },
  ]

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(
    () => occupationDutyResponsibilities,
    [occupationDutyResponsibilities]
  )

  // Multi-select dropdown
  const handleMultiSelect = selectedMulti => {
    let array = []
    selectedMulti.map(option => {
      const dutyResponsibilityId = option.value.dutyResponsibilityId
      array.push(dutyResponsibilityId)
    })
    setSelectedDuties(array)
  }

  // Checkbox action
  const handleCheckBox = (cellRowValues, isChecked) => {
    if (isChecked) {
      dispatch(selectDutyCheckBox(cellRowValues.values.odrId))
    } else {
      dispatch(unselectDutyCheckBox(cellRowValues.values.odrId))
    }
  }

  // Assigning of duties to occupation
  const handleAssignPositions = () => {
    const dutyResponsibilityIds = {
      dutyResponsibilityIds: selectedDuties,
    }
    dispatch(
      addAssignOccupationDuties(
        props.match.params.occupationId,
        dutyResponsibilityIds
      )
    )
  }

  // Unassigning of duties from occupation
  const handleDeleteRows = () => {
    if (!isEmpty(selectedRows)) {
      const odrIds = {
        odrIds: selectedRows,
      }

      dispatch(removeUnassignOccupationDuties(odrIds))
      setDisableDeleteBtn(true)
    }
  }

  // Get duties & responsibilities assigned to the occupation
  useEffect(() => {
    dispatch(fetchOccupationDuties(props.match.params.occupationId))
    dispatch(fetchAvailableDuties(props.match.params.occupationId))
  }, [dispatch])

  // Trigger when assigning position is success
  useEffect(() => {
    if (
      !isEmpty(assignedDutyResponsibilities) ||
      !isEmpty(unassignedDutyResponsibilities)
    ) {
      dispatch(fetchOccupationDuties(props.match.params.occupationId))
      dispatch(fetchAvailableDuties())

      dispatch(resetDutiesResponse())
      dispatch(resetDutyCheckBoxes())
      setSelectedDuties([])
    }
  }, [assignedDutyResponsibilities, unassignedDutyResponsibilities])

  // Enable/Disable button for assigning dependent on the state of input
  useEffect(() => {
    if (!isEmpty(selectedDuties)) {
      setDisableAssignBtn(false)
    } else {
      setDisableAssignBtn(true)
    }
  }, [selectedDuties])

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
              title="Occupations"
              titleUrl="/occupations"
              breadcrumbItem="Occupation Duties"
            />

            {/* Error Notif */}
            {errorOccupationDutyResponsibilities ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorOccupationDutyResponsibilities}
              />
            ) : null}
            {errorAvailableDutyResponsibilities ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorAvailableDutyResponsibilities}
              />
            ) : null}
            {errorOccupationDutyResponsibilities ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorOccupationDutyResponsibilities}
              />
            ) : null}

            {/* Success Notif */}
            {!isEmpty(assignedDutyResponsibilities) ? (
              <ToastrNotification
                toastType={"success"}
                notifMessage={"Duties successfully assigned"}
              />
            ) : null}
            {!isEmpty(unassignedDutyResponsibilities) ? (
              <ToastrNotification
                toastType={"success"}
                notifMessage={"Duties successfully unassigned"}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingOccupationDutyResponsibilities ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="multi-select-top-right-actions">
                          <Row className="justify-content-end">
                            {loadingAvailableDutyResponsibilities ? (
                              <Spinner className="ms-2" color="secondary" />
                            ) : null}
                            <Col md={8}>
                              <Select
                                isMulti={true}
                                onChange={e => {
                                  handleMultiSelect(e)
                                }}
                                name="select-employees"
                                options={availableDutyResponsibilities}
                              />
                            </Col>
                            <Col md={2}>
                              <Button
                                className="btn btn-info w-100"
                                onClick={() => handleAssignPositions()}
                                disabled={disableAssignBtn}
                              >
                                Assign
                              </Button>
                            </Col>
                          </Row>
                        </div>

                        <TableOccupationDuties
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
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

OccupationDuties.propTypes = {
  cell: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
}

export default OccupationDuties
