import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCommitteeMembers,
  unassignCommitteeMembers,
  resetCommitteeResponse,
  getUnassignedEmployees,
  assignCommitteeMembers,
  selectEmployeeCheckBox,
  unselectEmployeeCheckBox,
  resetEmployeeCheckBoxes,
} from "store/actions"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Spinner,
} from "reactstrap"
import Select from "react-select"

// table components
import TableCommitteeMembers from "components/Table/TableCommitteeMembers"

// extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"

const CommitteeMembers = props => {
  const dispatch = useDispatch()

  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)
  const [disableAssignBtn, setDisableAssignBtn] = useState(true)
  const [selectedEmployees, setSelectedEmployees] = useState([])

  const tableColumns = [
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
      accessor: "employeeId",
      disableGlobalFilter: true,
    },
    {
      Header: "Name",
      accessor: "fullName",
    },
  ]

  // Reducer state for members
  const { committeeName, members, loadingMembers, errorMembers } = useSelector(
    state => ({
      committeeName: state.committee.response.members.committeeName,
      members: state.committee.response.members.employees,
      loadingMembers: state.committee.loading.loadingMembers,
      errorMembers: state.committee.error.errorMembers,
    })
  )

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.committee.selectedRows,
  }))

  // Redux state for member assignment
  const { assignedMembers, unassignedMembers } = useSelector(state => ({
    assignedMembers: state.committee.response.assignedMembers,
    unassignedMembers: state.committee.response.unassignedMembers,
  }))

  // Redux state for Multi-Select input of unassigned employees
  const {
    availableUnassignedEmployees,
    loadingAvailableUnassignedEmployees,
    errorAvailableUnassignedEmployees,
  } = useSelector(state => ({
    availableUnassignedEmployees:
      state.committee.response.availableUnassignedEmployees,
    loadingAvailableUnassignedEmployees:
      state.committee.loading.loadingAvailableUnassignedEmployees,
    errorAvailableUnassignedEmployees:
      state.committee.error.errorAvailableUnassignedEmployees,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => members, [members])

  // Set list of positionIds from selected options
  const handleMultiSelect = selectedMulti => {
    let array = []
    selectedMulti.map(option => {
      const employeeId = option.value.employeeId
      array.push(employeeId)
    })
    setSelectedEmployees(array)
  }

  // Checkbox action
  const handleCheckBox = (cellRowValues, isChecked) => {
    if (isChecked) {
      dispatch(selectEmployeeCheckBox(cellRowValues.values.employeeId))
    } else {
      dispatch(unselectEmployeeCheckBox(cellRowValues.values.employeeId))
    }
  }

  // Assigning of employees to committee
  const handleAssignEmlpoyees = () => {
    const assignedEmployees = {
      committeeId: props.match.params.id,
      employeeIds: selectedEmployees,
    }
    dispatch(assignCommitteeMembers(assignedEmployees))
  }

  // Unassigning of employees from committee
  const handleDeleteRows = () => {
    if (!isEmpty(selectedRows)) {
      const availableUnassignedEmployees = {
        committeeId: props.match.params.id,
        employeeIds: selectedRows,
      }
      dispatch(unassignCommitteeMembers(availableUnassignedEmployees))
    }
    setDisableDeleteBtn(true)
  }

  // Disable/Enable button for deletion of rows
  useEffect(() => {
    if (!isEmpty(selectedRows)) {
      setDisableDeleteBtn(false)
    } else {
      setDisableDeleteBtn(true)
    }
  }, [selectedRows])

  // Trigger if assigning of memebrs response is succesful
  useEffect(() => {
    if (!isEmpty(assignedMembers)) {
      dispatch(fetchCommitteeMembers(props.match.params.id))
      dispatch(getUnassignedEmployees(props.match.params.id))
      dispatch(resetCommitteeResponse())
      dispatch(resetEmployeeCheckBoxes())
      setSelectedEmployees([])
    }
  }, [assignedMembers])

  // Trigger if unassigning of memebrs response is succesful
  useEffect(() => {
    if (!isEmpty(unassignedMembers)) {
      dispatch(fetchCommitteeMembers(props.match.params.id))
      dispatch(getUnassignedEmployees(props.match.params.id))
      dispatch(resetCommitteeResponse())
      dispatch(resetEmployeeCheckBoxes())
      setSelectedEmployees([])
    }
  }, [unassignedMembers])

  // Enable/Disable button for assigning dependent on the state of input
  useEffect(() => {
    if (!isEmpty(selectedEmployees)) {
      setDisableAssignBtn(false)
    } else {
      setDisableAssignBtn(true)
    }
  }, [selectedEmployees])

  // On load of the page
  useEffect(() => {
    dispatch(fetchCommitteeMembers(props.match.params.id))
    dispatch(getUnassignedEmployees(props.match.params.id))
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Committees"
            titleUrl="/committees"
            breadcrumbItem={committeeName}
          />

          {/* Error Notif */}
          {errorMembers ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorMembers}
            />
          ) : null}
          {errorAvailableUnassignedEmployees ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorAvailableUnassignedEmployees}
            />
          ) : null}

          {/* Success Notif */}
          {!isEmpty(assignedMembers) ? (
            <ToastrNotification
              toastType={"success"}
              notifMessage={"Members successfully assigned"}
            />
          ) : null}
          {!isEmpty(unassignedMembers) ? (
            <ToastrNotification
              toastType={"success"}
              notifMessage={"Members successfully unassigned"}
            />
          ) : null}

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="card-table">
                  {loadingMembers ? (
                    <LoadingIndicator />
                  ) : (
                    <>
                      <div className="multi-select-top-right-actions">
                        <Row className="justify-content-end">
                          {loadingAvailableUnassignedEmployees ? (
                            <Spinner className="ms-2" color="secondary" />
                          ) : null}
                          <Col md={8}>
                            <Select
                              isMulti={true}
                              onChange={e => {
                                handleMultiSelect(e)
                              }}
                              name="select-employees"
                              options={availableUnassignedEmployees}
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              className="btn btn-info w-100"
                              onClick={() => handleAssignEmlpoyees()}
                              disabled={disableAssignBtn}
                            >
                              Assign
                            </Button>
                          </Col>
                        </Row>
                      </div>

                      <TableCommitteeMembers
                        columns={columns}
                        data={!isEmpty(data) ? data : []}
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
    </React.Fragment>
  )
}

CommitteeMembers.propTypes = {
  cell: PropTypes.any,
  match: PropTypes.object,
}

export default CommitteeMembers
