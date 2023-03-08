import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Button, Row, Input, Table, Col, Spinner, FormGroup } from "reactstrap"
import PropTypes from "prop-types"
import { fetchEmployeeList, assignCommitteeMembers } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"

// extra components
import ToastrNotification from "components/Notifications/ToastrNotification"

const AssignCommitteeMemberModal = props => {
  const { showMemberAssignment, handleClose, committeeId } = props
  const dispatch = useDispatch()

  // Data for dropdown input
  const [selectOptions, setSelectOptions] = useState([])

  // Data for selected employee in the dropdown
  const [selectedEmployee, setSelectedEmployee] = useState([])

  // List of employee IDs to send to assignEmployees()
  const [selectedEmployees, setSelectedEmployees] = useState([])

  // List of employees for table data
  const [selectedEmployeeTable, setSelectedEmployeeTable] = useState([])

  // Redux state for employees
  const { employeeListRes, loadingEmployee, errorEmployee } = useSelector(
    state => ({
      employeeListRes: state.employee.employeeListRes,
      loadingEmployee: state.employee.isLoading,
      errorEmployee: state.employee.error,
    })
  )

  // Redux state for member assignment
  const { assignedReceivedResponse, errorAssignMembers } = useSelector(
    state => ({
      assignedReceivedResponse:
        state.committee.assignedMembersData.receivedResponse,
      errorAssignMembers: state.committee.error.errorAssignMembers,
    })
  )

  // Add selected employee
  const addAssignedEmployee = () => {
    setSelectedEmployees(selectedEmployees => [
      ...selectedEmployees,
      selectedEmployee.employeeId,
    ])

    setSelectedEmployeeTable(selectedEmployeeTable => [
      ...selectedEmployeeTable,
      selectedEmployee,
    ])

    const result = selectOptions.filter(
      details => details.employeeId !== selectedEmployee.employeeId
    )
    setSelectOptions(result)
  }

  // Removing selected employee
  const removeAssignedEmployee = (employeeId, fullName) => {
    setSelectedEmployees(
      selectedEmployees.filter(employee => employee.employeeId !== employeeId)
    )

    setSelectedEmployeeTable(
      selectedEmployeeTable.filter(
        employee => employee.employeeId !== employeeId
      )
    )

    const employeeDetails = {
      employeeId: employeeId,
      fullName: fullName,
    }
    setSelectOptions(selectOptions => [...selectOptions, employeeDetails])
  }

  // Send assigned employees
  const handleSubmit = () => {
    const assignedEmployees = {
      committeeId: committeeId,
      employeeIds: selectedEmployees,
    }
    // console.log(assignedEmployees)
    dispatch(assignCommitteeMembers(assignedEmployees))
  }

  // Destructure the employee list return to fit the Select Components required data structure
  useEffect(() => {
    employeeListRes.map(employee => {
      const employeeDetails = {
        employeeId: employee.employmentDetails.employeeId,
        fullName: employee.personalDetails.fullName,
      }
      setSelectOptions(selectOptions => [...selectOptions, employeeDetails])
    })
  }, [employeeListRes])

  useEffect(() => {
    if (!isEmpty(assignedReceivedResponse)) {
      dispatch(fetchCommitteeMembers(committeeId))
      dispatch(resetAssignResponse())
      handleClose()
    }
  }, [assignedReceivedResponse])

  useEffect(() => {
    if (showMemberAssignment) {
      dispatch(fetchEmployeeList())
    }
  }, [showMemberAssignment])

  return (
    <>
      {/* Error Notif */}
      {errorEmployee ? (
        <ToastrNotification toastType={"error"} notifMessage={errorEmployee} />
      ) : null}

      {errorAssignMembers ? (
        <ToastrNotification
          toastType={"error"}
          notifMessage={errorAssignMembers}
        />
      ) : null}

      <Modal
        show={showMemberAssignment}
        onHide={handleClose}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Employees</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={4}>
              <Input
                type="select"
                disabled={loadingEmployee ? true : false}
                onChange={e => setSelectedEmployee(JSON.parse(e.target.value))}
              >
                <option values="">Select...</option>
                {selectOptions.map(employee => (
                  <option
                    key={employee.employeeId}
                    // value={employee.employmentDetails.employeeId}
                    value={JSON.stringify({
                      employeeId: employee.employeeId,
                      fullName: employee.fullName,
                    })}
                  >
                    {employee.fullName}
                  </option>
                ))}
              </Input>
            </Col>
            <Col md={2} className="ps-0">
              <Row>
                <Col lg={3}>
                  <Button
                    className="btn btn-info"
                    disabled={loadingEmployee ? true : false}
                    onClick={addAssignedEmployee}
                  >
                    {" "}
                    <i className="bx bx-user-plus"></i>
                  </Button>
                </Col>
                {loadingEmployee ? (
                  <Col lg={3}>
                    <Spinner className="ms-2" color="secondary" />
                  </Col>
                ) : null}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployeeTable.map(employee => {
                      return (
                        <tr key={employee.employeeId}>
                          <td>{employee.employeeId}</td>
                          <td>{employee.fullName}</td>
                          <td>
                            <Button
                              type="button"
                              className=" btn btn-danger"
                              onClick={e =>
                                removeAssignedEmployee(
                                  employee.employeeId,
                                  employee.fullName
                                )
                              }
                            >
                              <i className="bx bx-user-x"></i>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" color="info" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

AssignCommitteeMemberModal.propTypes = {
  showMemberAssignment: PropTypes.bool,
  handleClose: PropTypes.func,
  committeeId: PropTypes.string,
}

export default AssignCommitteeMemberModal
