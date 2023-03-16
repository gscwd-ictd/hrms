import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import {
  fetchUnassignedPSBMembers,
  addPSBMemberToTable,
  removePSBMemberFromTable,
  resetPSBMembersTable,
  addPSBMemberToOptions,
  removePSBMemberFromOptions,
  setPSBRoles,
  addPSBRoleToOptions,
  removePSBRoleFromOptions,
  updatePublicationStatus,
  getPublications,
  resetPublicationResponses,
} from "store/actions"

import { Modal } from "react-bootstrap"
import { Button, Col, Row, Alert, Spinner } from "reactstrap"
import Select from "react-select"
import ToastrNotification from "components/Notifications/ToastrNotification"

// table components
import TablePSBMembers from "components/Table/TablePSBMembers"

import { psb23AndBelow, psb24, psb26AndAbove } from "constants/selectInputs"

const CloseApplicationPSBMemberAssignment = props => {
  const {
    showCloseApplication,
    modalData,
    handleCloseCloseApplication,
    prfId,
  } = props
  const dispatch = useDispatch()

  // whole value of the selected option with the label
  const [mainSelectedPSBMember, setMainSelectedPSBMember] = useState("")

  // value of the selected option without label
  const [selectedPSBMember, setSelectedPSBMember] = useState({})

  // value of selected PSB role.
  const [selectedPSBRole, setSelectedPSBRole] = useState(0)

  // state for a row insert in table
  const [tableRow, setTableRow] = useState({})

  const tableColumns = [
    {
      Header: "ID",
      accessor: "employeeId",
      disableGlobalFilter: true,
    },
    {
      Header: "Name",
      accessor: "fullName",
    },
    {
      Header: "PSB Role",
      accessor: "psbNo",
    },
    {
      Header: "Action",
      accessor: "",
      disableGlobalFilter: true,
      Cell: function RowActions(cell) {
        return (
          <button
            onClick={() => {
              removeToTable(cell.row.original)
            }}
            className="btn btn-danger waves-effect waves-light"
          >
            <i className="fas fa-minus"></i>
          </button>
        )
      },
    },
  ]

  // Redux state for multi-select input of unassigned psb members
  const {
    getUnassignedPSBMembers,
    loadingGetUnassignedPSBMember,
    errorGetUnassignedPSBMember,
  } = useSelector(state => ({
    getUnassignedPSBMembers:
      state.personnelSelectionBoard.response.get.unassignedPSBMembers,
    loadingGetUnassignedPSBMember:
      state.personnelSelectionBoard.loading.loadingGetUnassignedPSBMember,
    errorGetUnassignedPSBMember:
      state.personnelSelectionBoard.error.errorGetUnassignedPSBMember,
  }))

  // Redux state for table data and psb role options
  const { tableData, psbRoles } = useSelector(state => ({
    tableData: state.personnelSelectionBoard.tableData,
    psbRoles: state.personnelSelectionBoard.psbRoles,
  }))

  // Redux state for submitting the psb members assignment on a specific publication schedule and closing the application
  const {
    responseCloseForApplication,
    loadingCloseForApplication,
    errorCloseForApplication,
  } = useSelector(state => ({
    responseCloseForApplication: state.publications.response.publicationStatus,
    loadingCloseForApplication:
      state.publications.loading.loadingPublicationStatus,
    errorCloseForApplication: state.publications.error.errorPublicationStatus,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => tableData, [tableData])

  // Add PSB member data to redux state
  const handleSelectPSBMember = optionValue => {
    setSelectedPSBMember(optionValue.value)
    setMainSelectedPSBMember(optionValue)

    setTableRow(tableRow => ({
      ...tableRow,
      ...optionValue.value,
    }))
  }

  // Add PSB role data to redux state
  const handleSelectPSBRole = optionValue => {
    setSelectedPSBRole(optionValue.target.value)

    let updatedValue = {}
    updatedValue = { psbNo: optionValue.target.value }

    setTableRow(tableRow => ({
      ...tableRow,
      ...updatedValue,
    }))
  }

  // Assigning of psb member to table
  const addToTable = () => {
    // remove the added psb member from redux state of psb members
    dispatch(removePSBMemberFromOptions(mainSelectedPSBMember))

    // remove the added role from redux state of psb roles
    dispatch(removePSBRoleFromOptions(selectedPSBRole))

    // clear input for psb member options
    setMainSelectedPSBMember("")
    setSelectedPSBMember({})
    setSelectedPSBRole(0)

    // add to redux state for table
    dispatch(addPSBMemberToTable(tableRow))
  }

  // Unassigning of psb members in table
  const removeToTable = cellValues => {
    let updatedValue = {}
    updatedValue = {
      label: cellValues.fullName,
      value: {
        employeeId: cellValues.employeeId,
        fullName: cellValues.fullName,
      },
    }

    dispatch(addPSBMemberToOptions(updatedValue))

    dispatch(addPSBRoleToOptions(parseInt(cellValues.psbNo)))

    // add to redux state for table
    dispatch(removePSBMemberFromTable(cellValues))
  }

  // Send data to api for closing of application with assigned psb members
  const handleAssignPSBMembers = () => {
    let closeApplicationData = {}
    closeApplicationData = {
      postingStatus: "Closed for application",
      assignedPSBMembers: tableData,
    }

    dispatch(updatePublicationStatus(modalData.vppId, closeApplicationData))
  }

  const handleNumberOfPSBMembers = () => {
    if (modalData.salaryGradeLevel <= 23) {
      dispatch(setPSBRoles(psb23AndBelow))
    } else if (modalData.salaryGradeLevel == 24) {
      dispatch(setPSBRoles(psb24))
    } else if (modalData.salaryGradeLevel >= 26) {
      dispatch(setPSBRoles(psb26AndAbove))
    } else {
      // console.log("Please supply salaryGradeLevel")
    }
  }

  // if update is success
  useEffect(() => {
    if (!isEmpty(responseCloseForApplication)) {
      dispatch(getPublications(prfId))
      handleCloseCloseApplication()
      dispatch(resetPSBMembersTable())
      dispatch(resetPublicationResponses())
    }
  }, [responseCloseForApplication])

  useEffect(() => {
    if (showCloseApplication) {
      dispatch(fetchUnassignedPSBMembers(modalData.vppId))

      // set local state for psb role options
      handleNumberOfPSBMembers()
    }
  }, [showCloseApplication])

  return (
    <>
      <Modal
        show={showCloseApplication}
        onHide={handleCloseCloseApplication}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Close Application</Modal.Title>
        </Modal.Header>

        {/* Error Notif */}
        {errorGetUnassignedPSBMember ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorGetUnassignedPSBMember}
          />
        ) : null}

        {errorCloseForApplication ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorCloseForApplication}
          />
        ) : null}

        {loadingCloseForApplication ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {!isEmpty(responseCloseForApplication) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={
              "PSB members added successfully. Proceed to assign roles."
            }
          />
        ) : null}

        <Modal.Body>
          <h6>Assign PSB Members</h6>
          <Row>
            <Col md={12}>
              <>
                <div className="multi-select-top-right-actions">
                  <Row className="justify-content-end">
                    {loadingGetUnassignedPSBMember ? (
                      <Spinner className="ms-2" color="secondary" />
                    ) : null}
                    <Col md={8}>
                      <Row className="justify-content-end">
                        <Col md={8}>
                          <Select
                            name="select-psb-member"
                            onChange={e => {
                              handleSelectPSBMember(e)
                            }}
                            value={mainSelectedPSBMember || ""}
                            options={getUnassignedPSBMembers}
                          />
                        </Col>
                        <Col md={4}>
                          <select
                            id="formrow-assignedto"
                            className="form-control"
                            name="directAssignment"
                            required
                            onChange={e => {
                              handleSelectPSBRole(e)
                            }}
                          >
                            <option value="">Choose Role...</option>
                            {psbRoles.map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Button
                        className="btn btn-info w-100"
                        onClick={addToTable}
                        disabled={
                          isEmpty(selectedPSBMember) || selectedPSBRole == 0
                            ? true
                            : false
                        }
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </div>

                <TablePSBMembers
                  columns={columns}
                  data={!isEmpty(data) ? data : []}
                  // handleDeleteRows={handleDeleteRows}
                  // disableDeleteBtn={disableDeleteBtn}
                />
              </>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            color="info"
            onClick={() => handleAssignPSBMembers()}
            // disabled={isEmpty(psbRoles) ? false : true}
          >
            Close Application
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

CloseApplicationPSBMemberAssignment.propTypes = {
  cell: PropTypes.any,
  showCloseApplication: PropTypes.bool,
  handleCloseCloseApplication: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default CloseApplicationPSBMemberAssignment
