import {
  GET_EMPLOYEE_TRAININGS,
  GET_EMPLOYEE_TRAININGS_SUCCESS,
  GET_EMPLOYEE_TRAININGS_FAIL,
} from './actionTypes'

// Get employee trainings
export const fetchEmployeeTrainings = employeeId => {
  return {
    type: GET_EMPLOYEE_TRAININGS,
    payload: employeeId,
  }
}
export const fetchEmployeeTrainingsSuccess = trainings => {
  return {
    type: GET_EMPLOYEE_TRAININGS_SUCCESS,
    payload: trainings,
  }
}
export const fetchEmployeeTrainingsFail = error => {
  return {
    type: GET_EMPLOYEE_TRAININGS_FAIL,
    payload: error,
  }
}
