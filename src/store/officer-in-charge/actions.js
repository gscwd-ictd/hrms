import {
  GET_ALL_OIC,
  GET_ALL_OIC_SUCCESS,
  GET_ALL_OIC_FAIL,
  GET_SG20_UP_EMPLOYEES,
  GET_SG20_UP_EMPLOYEES_SUCCESS,
  GET_SG20_UP_EMPLOYEES_FAIL,
  GET_VACANT_MANAGERIAL_POSITIONS,
  GET_VACANT_MANAGERIAL_POSITIONS_SUCCESS,
  GET_VACANT_MANAGERIAL_POSITIONS_FAIL,
  POST_ASSIGN_OIC,
  POST_ASSIGN_OIC_SUCCESS,
  POST_ASSIGN_OIC_FAIL,
  DELETE_UNASSIGN_OIC,
  DELETE_UNASSIGN_OIC_SUCCESS,
  DELETE_UNASSIGN_OIC_FAIL,
  RESET_OIC_RESPONSE,
} from "./actionTypes"

// Get all officer-in-charge list
export const fetchOICList = () => {
  return {
    type: GET_ALL_OIC,
  }
}
export const fetchOICListSuccess = response => {
  return {
    type: GET_ALL_OIC_SUCCESS,
    payload: response,
  }
}
export const fetchOICListFail = error => {
  return {
    type: GET_ALL_OIC_FAIL,
    payload: error,
  }
}

// Get all employees that are supervisory and up (Salary Grade 20 up)
export const fetchSG20UpEmployees = () => {
  return {
    type: GET_SG20_UP_EMPLOYEES,
  }
}
export const fetchSG20UpEmployeesSuccess = response => {
  return {
    type: GET_SG20_UP_EMPLOYEES_SUCCESS,
    payload: response,
  }
}
export const fetchSG20UpEmployeesFail = error => {
  return {
    type: GET_SG20_UP_EMPLOYEES_FAIL,
    payload: error,
  }
}

// Get all vacant managerial positions (Salary Grade 24 up) e.g. Div Manager, Dept Manager, AGM
export const fetchVacantManagerialPositions = () => {
  return {
    type: GET_VACANT_MANAGERIAL_POSITIONS,
  }
}
export const fetchVacantManagerialPositionsSuccess = response => {
  return {
    type: GET_VACANT_MANAGERIAL_POSITIONS_SUCCESS,
    payload: response,
  }
}
export const fetchVacantManagerialPositionsFail = error => {
  return {
    type: GET_VACANT_MANAGERIAL_POSITIONS_FAIL,
    payload: error,
  }
}

// Assign a employee as Officer-In-Charge
export const addAssignOIC = assignmentDetails => {
  return {
    type: POST_ASSIGN_OIC,
    payload: assignmentDetails,
  }
}
export const addAssignOICSuccess = response => {
  return {
    type: POST_ASSIGN_OIC_SUCCESS,
    payload: response,
  }
}
export const addAssignOICFail = error => {
  return {
    type: POST_ASSIGN_OIC_FAIL,
    payload: error,
  }
}

// Unassign an employee from being an Officer-In-Charge
export const removeUnassignOIC = oicId => {
  return {
    type: DELETE_UNASSIGN_OIC,
    payload: oicId,
  }
}
export const removeUnassignOICSuccess = response => {
  return {
    type: DELETE_UNASSIGN_OIC_SUCCESS,
    payload: response,
  }
}
export const removeUnassignOICFail = error => {
  return {
    type: DELETE_UNASSIGN_OIC_FAIL,
    payload: error,
  }
}

// Reset responses post, delete, update
export const resetOICResponse = () => {
  return {
    type: RESET_OIC_RESPONSE,
  }
}
