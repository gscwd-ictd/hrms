import {
  POST_DUTY,
  POST_DUTY_SUCCESS,
  PUT_DUTY,
  PUT_DUTY_SUCCESS,
  DELETE_DUTY,
  DELETE_DUTY_SUCCESS,
  GET_DUTIES,
  GET_DUTIES_SUCCESS,
  DUTY_API_FAIL,
  GET_OCCUPATION_DUTIES,
  GET_OCCUPATION_DUTIES_SUCCESS,
  GET_OCCUPATION_DUTIES_FAIL,
  ASSIGN_OCCUPATION_DUTIES,
  ASSIGN_OCCUPATION_DUTIES_SUCCESS,
  ASSIGN_OCCUPATION_DUTIES_FAIL,
  UNASSIGN_OCCUPATION_DUTIES,
  UNASSIGN_OCCUPATION_DUTIES_SUCCESS,
  UNASSIGN_OCCUPATION_DUTIES_FAIL,
  GET_AVAILABLE_DUTIES,
  GET_AVAILABLE_DUTIES_SUCCESS,
  GET_AVAILABLE_DUTIES_FAIL,
  RESET_DUTIES_RESPONSES,
  SELECT_DUTY_ROW,
  UNSELECT_DUTY_ROW,
  RESET_SELECTED_DUTY_ROWS,
  GET_POSITION_DUTIES,
  GET_POSITION_DUTIES_SUCCESS,
  GET_POSITION_DUTIES_FAIL,
  POST_OCCUPATIONAL_DUTY_RESPONSIBILITY,
  POST_OCCUPATIONAL_DUTY_RESPONSIBILITY_SUCCESS,
  POST_OCCUPATIONAL_DUTY_RESPONSIBILITY_FAIL,
} from './actionTypes'

// Duty & Responsibility
// Add new duty & responsibility
export const addDutyResponsibility = dutyResponsibilityData => ({
  type: POST_DUTY,
  payload: dutyResponsibilityData,
})

export const addDutyResponsibilitySuccess = addedDutyResponsibilityData => ({
  type: POST_DUTY_SUCCESS,
  payload: addedDutyResponsibilityData,
})

// Update duty & responsibility details
export const updateDutyResponsibility = (
  dutyResponsibilityId,
  dutyResponsibilityData
) => ({
  type: PUT_DUTY,
  payload: { dutyResponsibilityId, dutyResponsibilityData },
})

export const updateDutyResponsibilitySuccess =
  updatedDutyResponsibilityData => ({
    type: PUT_DUTY_SUCCESS,
    payload: updatedDutyResponsibilityData,
  })

// Delete a duty & responsibility
export const removeDutyResponsibility = dutyResponsibilityId => ({
  type: DELETE_DUTY,
  payload: dutyResponsibilityId,
})

export const removeDutyResponsibilitySuccess =
  deletedDutyResponsibilityData => ({
    type: DELETE_DUTY_SUCCESS,
    payload: deletedDutyResponsibilityData,
  })

// Get all duty & responsibility
export const fetchDutyResponsibilities = () => ({
  type: GET_DUTIES,
})

export const fetchDutyResponsibilitiesSuccess = dutyResponsibilities => ({
  type: GET_DUTIES_SUCCESS,
  payload: dutyResponsibilities,
})

// If  create, read, update, delete functions for a duty & responsibility fails
export const dutyResponsibilityApiFail = error => ({
  type: DUTY_API_FAIL,
  payload: error,
})

// Get duties for specific occupation
export const fetchOccupationDuties = occupationId => ({
  type: GET_OCCUPATION_DUTIES,
  payload: occupationId,
})

export const fetchOccupationDutiesSuccess = dutyResponsibilities => ({
  type: GET_OCCUPATION_DUTIES_SUCCESS,
  payload: dutyResponsibilities,
})

export const fetchOccupationDutiesFail = error => ({
  type: GET_OCCUPATION_DUTIES_FAIL,
  payload: error,
})

// Assign duties for specific occupation
export const addAssignOccupationDuties = (
  occupationId,
  assignedDutyResponsibilities
) => ({
  type: ASSIGN_OCCUPATION_DUTIES,
  payload: { occupationId, assignedDutyResponsibilities },
})

export const addAssignOccupationDutiesSuccess =
  assignedDutyResponsibilities => ({
    type: ASSIGN_OCCUPATION_DUTIES_SUCCESS,
    payload: assignedDutyResponsibilities,
  })

export const addAssignOccupationDutiesFail = error => ({
  type: ASSIGN_OCCUPATION_DUTIES_FAIL,
  payload: error,
})

// Unassign duties for specific occupation
export const removeUnassignOccupationDuties =
  unassignedDutyResponsibilities => ({
    type: UNASSIGN_OCCUPATION_DUTIES,
    payload: unassignedDutyResponsibilities,
  })

export const removeUnassignOccupationDutiesSuccess =
  unassignedDutyResponsibilities => ({
    type: UNASSIGN_OCCUPATION_DUTIES_SUCCESS,
    payload: unassignedDutyResponsibilities,
  })

export const removeUnassignOccupationDutiesFail = error => ({
  type: UNASSIGN_OCCUPATION_DUTIES_FAIL,
  payload: error,
})

// Duties that are not yet assigned on the occupation
export const fetchAvailableDuties = occupationId => ({
  type: GET_AVAILABLE_DUTIES,
  payload: occupationId,
})

export const fetchAvailableDutiesSuccess = availableDutyResponsibilities => ({
  type: GET_AVAILABLE_DUTIES_SUCCESS,
  payload: availableDutyResponsibilities,
})

export const fetchAvailableDutiesFail = error => ({
  type: GET_AVAILABLE_DUTIES_FAIL,
  payload: error,
})

// Reset Assign, Unassign, Responses
export const resetDutiesResponse = () => ({
  type: RESET_DUTIES_RESPONSES,
})

// Select Checkbox
export const selectDutyCheckBox = dutyResponsibilityId => ({
  type: SELECT_DUTY_ROW,
  payload: dutyResponsibilityId,
})

// Unselect Checkbox
export const unselectDutyCheckBox = dutyResponsibilityId => ({
  type: UNSELECT_DUTY_ROW,
  payload: dutyResponsibilityId,
})

// Reset selected checkboxs state
export const resetDutyCheckBoxes = () => ({
  type: RESET_SELECTED_DUTY_ROWS,
})

// Get Duties & Responsibilities of a Position
export const fetchPositionDuties = positionId => ({
  type: GET_POSITION_DUTIES,
  payload: positionId,
})

export const fetchPositionSuccess = positionDuties => ({
  type: GET_POSITION_DUTIES_SUCCESS,
  payload: positionDuties,
})

export const fetchPositionFail = error => ({
  type: GET_POSITION_DUTIES_FAIL,
  payload: error,
})

// rework
// export const addOccupationalDutyResponsibility =
//   occupationalDutyResponsibility => ({
//     type: POST_OCCUPATIONAL_DUTY_RESPONSIBILITY,
//     payload: occupationalDutyResponsibility,
//   })
export const addOccupationalDutyResponsibility = (
  occupationId,
  dutyResponsibilityData
) => {
  return {
    type: POST_OCCUPATIONAL_DUTY_RESPONSIBILITY,
    payload: { occupationId, dutyResponsibilityData },
  }
}

export const addOccupationalDutyResponsibilitySuccess =
  addedDutyResponsibilityData => ({
    type: POST_OCCUPATIONAL_DUTY_RESPONSIBILITY_SUCCESS,
    payload: addedDutyResponsibilityData,
  })

export const addOccupationalDutyResponsibilityFail = error => ({
  type: POST_OCCUPATIONAL_DUTY_RESPONSIBILITY_FAIL,
  payload: error,
})