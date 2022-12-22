import {
  GET_OCCUPATIONS,
  GET_OCCUPATIONS_FAIL,
  GET_OCCUPATIONS_SUCCESS,
  GET_OCCUPATION,
  GET_OCCUPATION_SUCCESS,
  GET_OCCUPATION_FAIL,
  POST_OCCUPATION,
  POST_OCCUPATION_SUCCESS,
  POST_OCCUPATION_FAIL,
  PUT_OCCUPATION,
  PUT_OCCUPATION_SUCCESS,
  PUT_OCCUPATION_FAIL,
  DELETE_OCCUPATION,
  DELETE_OCCUPATION_SUCCESS,
  DELETE_OCCUPATION_FAIL,
  GET_OCCUPATIONAL_GROUP_POSITIONS,
  GET_OCCUPATIONAL_GROUP_POSITIONS_SUCCESS,
  GET_OCCUPATIONAL_GROUP_POSITIONS_FAIL,
  RESET_OCCUPATION_RESPONSES,
  GET_POSITIONS_WITHOUT_OCCUPATION,
  GET_POSITIONS_WITHOUT_OCCUPATION_SUCCESS,
  GET_POSITIONS_WITHOUT_OCCUPATION_FAIL,
  ASSIGN_POSITIONS_TO_OCCUPATION,
  ASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS,
  ASSIGN_POSITIONS_TO_OCCUPATION_FAIL,
  UNASSIGN_POSITIONS_TO_OCCUPATION,
  UNASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS,
  UNASSIGN_POSITIONS_TO_OCCUPATION_FAIL,
  SELECT_POSITION_ROW,
  UNSELECT_POSITION_ROW,
  RESET_SELECTED_POSITION_ROWS,
} from "./actionTypes"

// Get Occupations
export const fetchOccupations = () => ({
  type: GET_OCCUPATIONS,
})
export const fetchOccupationsSuccess = occupations => ({
  type: GET_OCCUPATIONS_SUCCESS,
  payload: occupations,
})
export const fetchOccupationsFail = error => ({
  type: GET_OCCUPATIONS_FAIL,
  payload: error,
})

// Get Occupation
export const fetchOccupation = occupationId => ({
  type: GET_OCCUPATION,
  payload: occupationId,
})
export const fetchOccupationSuccess = occupation => ({
  type: GET_OCCUPATION_SUCCESS,
  payload: occupation,
})
export const fetchOccupationFail = error => ({
  type: GET_OCCUPATION_FAIL,
  payload: error,
})

// Add Occupation
export const addOccupation = occupation => ({
  type: POST_OCCUPATION,
  payload: occupation,
})
export const addOccupationSuccess = occupationResponse => ({
  type: POST_OCCUPATION_SUCCESS,
  payload: occupationResponse,
})
export const addOccupationFail = error => ({
  type: POST_OCCUPATION_FAIL,
  payload: error,
})

// Update Occupation
export const updateOccupation = (occupationId, occupation) => ({
  type: PUT_OCCUPATION,
  payload: { occupationId, occupation },
})
export const updateOccupationSuccess = occupationResponse => ({
  type: PUT_OCCUPATION_SUCCESS,
  payload: occupationResponse,
})
export const updateOccupationFail = error => ({
  type: PUT_OCCUPATION_FAIL,
  payload: error,
})

// Delete Occupation
export const removeOccupation = occupationId => ({
  type: DELETE_OCCUPATION,
  payload: occupationId,
})
export const removeOccupationSuccess = occupationResponse => ({
  type: DELETE_OCCUPATION_SUCCESS,
  payload: occupationResponse,
})
export const removeOccupationFail = error => ({
  type: DELETE_OCCUPATION_FAIL,
  payload: error,
})

// Get Occupational Group
export const fetchOGPositions = occupationId => ({
  type: GET_OCCUPATIONAL_GROUP_POSITIONS,
  payload: occupationId,
})
export const fetchOGPositionsSuccess = occupationalGroupPositions => ({
  type: GET_OCCUPATIONAL_GROUP_POSITIONS_SUCCESS,
  payload: occupationalGroupPositions,
})
export const fetchOGPositionsFail = error => ({
  type: GET_OCCUPATIONAL_GROUP_POSITIONS_FAIL,
  payload: error,
})

// Get plantilla positions without occupation
export const fetchPositionsWithoutOccupation = () => ({
  type: GET_POSITIONS_WITHOUT_OCCUPATION,
})
export const fetchPositionsWithoutOccupationSuccess =
  positionsWithoutOccupation => ({
    type: GET_POSITIONS_WITHOUT_OCCUPATION_SUCCESS,
    payload: positionsWithoutOccupation,
  })
export const fetchPositionsWithoutOccupationFail = error => ({
  type: GET_POSITIONS_WITHOUT_OCCUPATION_FAIL,
  payload: error,
})

// Assign plantilla positions to occupation
export const updatePositionsToOccupation = (
  occupationId,
  selectedPositions
) => ({
  type: ASSIGN_POSITIONS_TO_OCCUPATION,
  payload: { occupationId, selectedPositions },
})
export const updatePositionsToOccupationSuccess = assignedPositionsData => ({
  type: ASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS,
  payload: assignedPositionsData,
})
export const updatePositionsToOccupationFail = error => ({
  type: ASSIGN_POSITIONS_TO_OCCUPATION_FAIL,
  payload: error,
})

// Remove plantilla positions to occupation
export const removePositionsToOccupation = (
  occupationId,
  selectedPositions
) => ({
  type: UNASSIGN_POSITIONS_TO_OCCUPATION,
  payload: { occupationId, selectedPositions },
})
export const removePositionsToOccupationSuccess = assignedPositionsData => ({
  type: UNASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS,
  payload: assignedPositionsData,
})
export const removePositionsToOccupationFail = error => ({
  type: UNASSIGN_POSITIONS_TO_OCCUPATION_FAIL,
  payload: error,
})

// Reset all response values
export const resetOccupationResponses = () => ({
  type: RESET_OCCUPATION_RESPONSES,
})

// Select Checkbox
export const selectPositionCheckBox = positionId => ({
  type: SELECT_POSITION_ROW,
  payload: positionId,
})

// Unselect Checkbox
export const unselectPositionCheckBox = positionId => ({
  type: UNSELECT_POSITION_ROW,
  payload: positionId,
})

// Reset selected checkboxs state
export const resetPositionCheckBoxes = () => ({
  type: RESET_SELECTED_POSITION_ROWS,
})
