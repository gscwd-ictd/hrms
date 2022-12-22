import {
  POST_COMMITTEE,
  POST_COMMITTEE_SUCCESS,
  PUT_COMMITTEE,
  PUT_COMMITTEE_SUCCESS,
  DELETE_COMMITTEE,
  DELETE_COMMITTEE_SUCCESS,
  GET_COMMITTEES,
  GET_COMMITTEES_SUCCESS,
  COMMITTEE_API_FAIL,

  GET_COMMITTEE_MEMBERS,
  GET_COMMITTEE_MEMBERS_SUCCESS,
  GET_COMMITTEE_MEMBERS_FAIL,
  GET_UNASSIGNED_EMPLOYEES,
  GET_UNASSIGNED_EMPLOYEES_SUCCESS,
  GET_UNASSIGNED_EMPLOYEES_FAIL,

  ASSIGN_COMMITTEE_MEMBERS,
  ASSIGN_COMMITTEE_MEMBERS_SUCCESS,
  ASSIGN_COMMITTEE_MEMBERS_FAIL,
  UNASSIGN_COMMITTEE_MEMBERS,
  UNASSIGN_COMMITTEE_MEMBERS_SUCCESS,
  UNASSIGN_COMMITTEE_MEMBERS_FAIL,

  RESET_COMMITTEE_RESPONSES,
  SELECT_EMPLOYEE_ROW,
  UNSELECT_EMPLOYEE_ROW,
  RESET_SELECTED_EMPLOYEE_ROWS,
} from "./actionTypes"

// Committees
// Add new committe
export const addCommittee = committeeData => ({
  type: POST_COMMITTEE,
  payload: committeeData,
})
export const addCommitteeSuccess = addedCommitteeData => ({
  type: POST_COMMITTEE_SUCCESS,
  payload: addedCommitteeData,
})

// Update committee details
export const updateCommittee = (committeeId, committeeData) => ({
  type: PUT_COMMITTEE,
  payload: { committeeId, committeeData },
})
export const updateCommitteeSuccess = updatedCommitteeData => ({
  type: PUT_COMMITTEE_SUCCESS,
  payload: updatedCommitteeData,
})

// Delete a committee
export const removeCommittee = committeeId => ({
  type: DELETE_COMMITTEE,
  payload: committeeId,
})
export const removeCommitteeSuccess = deletedCommitteeData => ({
  type: DELETE_COMMITTEE_SUCCESS,
  payload: deletedCommitteeData,
})

// Get all committee
export const fetchCommittees = () => ({
  type: GET_COMMITTEES,
})
export const fetchCommitteesSuccess = committees => ({
  type: GET_COMMITTEES_SUCCESS,
  payload: committees,
})

// If  create, read, update, delete functions for a committee fails
export const committeeApiFail = error => ({
  type: COMMITTEE_API_FAIL,
  payload: error,
})

// Get committees Members
export const fetchCommitteeMembers = committeeId => ({
  type: GET_COMMITTEE_MEMBERS,
  payload: committeeId,
})
export const fetchCommitteeMembersSuccess = committeeMembers => ({
  type: GET_COMMITTEE_MEMBERS_SUCCESS,
  payload: committeeMembers,
})
export const fetchCommitteeMembersFail = error => ({
  type: GET_COMMITTEE_MEMBERS_FAIL,
  payload: error,
})

// Employees that are unassigned on a specific committee
export const getUnassignedEmployees = committeeId => ({
  type: GET_UNASSIGNED_EMPLOYEES,
  payload: committeeId,
})
export const getUnassignedEmployeesSuccess = unassignedEmployees => ({
  type: GET_UNASSIGNED_EMPLOYEES_SUCCESS,
  payload: unassignedEmployees,
})
export const getUnassignedEmployeesFail = error => ({
  type: GET_UNASSIGNED_EMPLOYEES_FAIL,
  payload: error,
})

// Assign Members
export const assignCommitteeMembers = assignedMembersData => ({
  type: ASSIGN_COMMITTEE_MEMBERS,
  payload: assignedMembersData,
})
export const assignCommitteeMembersSuccess = assignedMembersData => ({
  type: ASSIGN_COMMITTEE_MEMBERS_SUCCESS,
  payload: assignedMembersData,
})
export const assignCommitteeMembersFail = error => ({
  type: ASSIGN_COMMITTEE_MEMBERS_FAIL,
  payload: error,
})

// Unassign Members
export const unassignCommitteeMembers = unassignedMembersData => ({
  type: UNASSIGN_COMMITTEE_MEMBERS,
  payload: unassignedMembersData,
})
export const unassignCommitteeMembersSuccess = unassignedMembersData => ({
  type: UNASSIGN_COMMITTEE_MEMBERS_SUCCESS,
  payload: unassignedMembersData,
})
export const unassignCommitteeMembersFail = error => ({
  type: UNASSIGN_COMMITTEE_MEMBERS_FAIL,
  payload: error,
})



// Reset Assign, Unassign, Responses
export const resetCommitteeResponse = () => ({
  type: RESET_COMMITTEE_RESPONSES,
})

// Select Checkbox
export const selectEmployeeCheckBox = employeeId => ({
  type: SELECT_EMPLOYEE_ROW,
  payload: employeeId,
})

// Unselect Checkbox
export const unselectEmployeeCheckBox = employeeId => ({
  type: UNSELECT_EMPLOYEE_ROW,
  payload: employeeId,
})

// Reset selected checkboxs state
export const resetEmployeeCheckBoxes = () => ({
  type: RESET_SELECTED_EMPLOYEE_ROWS,
})
