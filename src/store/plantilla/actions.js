import {
  GET_PLANTILLA,
  GET_PLANTILLA_SUCCESS,
  GET_PLANTILLA_POSITION,
  GET_PLANTILLA_POSITION_SUCCESS,
  RESET_PLANTILLA_POSITION,
  GET_PLANTILLA_POSITIONS,
  GET_PLANTILLA_POSITIONS_SUCCESS,
  RESET_PLANTILLA_POSITIONS,
  SUBMIT_POSITION,
  SUBMIT_POSITION_SUCCESS,
  PLANTILLA_API_ERROR,
  GET_EMPLOYEE_DETAILS_BY_PLANTILLA,
  GET_EMPLOYEE_DETAILS_BY_PLANTILLA_SUCCESS,
  GET_EMPLOYEE_DETAILS_BY_PLANTILLA_FAIL,
} from './actionTypes'

// Get list of all plantilla position
export const fetchPlantilla = () => {
  return {
    type: GET_PLANTILLA,
  }
}
export const fetchPlantillaSuccess = plantilla => {
  return {
    type: GET_PLANTILLA_SUCCESS,
    payload: plantilla,
  }
}

// Add new plantilla position
export const submitPosition = positionData => {
  return {
    type: SUBMIT_POSITION,
    payload: positionData,
  }
}
export const submitPositionSuccess = positionData => {
  return {
    type: SUBMIT_POSITION_SUCCESS,
    payload: positionData,
  }
}

// Get details of single plantilla position
export const fetchPlantillaPosition = positionId => {
  return {
    type: GET_PLANTILLA_POSITION,
    payload: positionId,
  }
}
export const fetchPlantillaPositionSuccess = positionDetails => {
  return {
    type: GET_PLANTILLA_POSITION_SUCCESS,
    payload: positionDetails,
  }
}
export const resetPlantillaPosition = () => {
  return {
    type: RESET_PLANTILLA_POSITION,
  }
}

// Get list of plantilla positions to be used for dropdown component
export const fetchPlantillaPositionsSelect = () => {
  return {
    type: GET_PLANTILLA_POSITIONS,
  }
}
export const fetchPlantillaPositionsSelectSuccess = plantillaPositions => {
  return {
    type: GET_PLANTILLA_POSITIONS_SUCCESS,
    payload: plantillaPositions,
  }
}
export const resetPlantillaPositions = () => {
  return {
    type: RESET_PLANTILLA_POSITIONS,
  }
}

// Get employee details by plantilla id
export const fetchEmployeeDetailsByPlantilla = plantillaId => {
  return {
    type: GET_EMPLOYEE_DETAILS_BY_PLANTILLA,
    payload: plantillaId,
  }
}

export const fetchEmployeeDetailsByPlantillaSuccess = employeeDetails => {
  return {
    type: GET_EMPLOYEE_DETAILS_BY_PLANTILLA_SUCCESS,
    payload: employeeDetails,
  }
}

export const fetchEmployeeDetailsByPlantillaFail = error => {
  return {
    type: GET_EMPLOYEE_DETAILS_BY_PLANTILLA_FAIL,
    payload: error,
  }
}

// Error action if api call fails
export const plantillaApiFail = error => {
  return {
    type: PLANTILLA_API_ERROR,
    payload: error,
  }
}
