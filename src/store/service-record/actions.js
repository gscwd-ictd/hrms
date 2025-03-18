import {
  GET_SERVICE_RECORDS,
  GET_SERVICE_RECORDS_SUCCESS,
  GET_SERVICE_RECORDS_FAIL,
  RESET_SERVICE_RECORD_ERROR_LOG,
  POST_EMPLOYEE_SEPARATION,
  POST_EMPLOYEE_SEPARATION_SUCCESS,
  POST_EMPLOYEE_SEPARATION_FAIL,
} from './actionTypes'

// Get service records
export const fetchServiceRecords = employeeId => {
  return {
    type: GET_SERVICE_RECORDS,
    payload: employeeId,
  }
}
export const fetchServiceRecordsSuccess = serviceRecords => {
  return {
    type: GET_SERVICE_RECORDS_SUCCESS,
    payload: serviceRecords,
  }
}
export const fetchServiceRecordsFail = error => {
  return {
    type: GET_SERVICE_RECORDS_FAIL,
    payload: error,
  }
}

// reset employee response on fecth request
export const resetServiceRecordErrorLog = () => {
  return {
    type: RESET_SERVICE_RECORD_ERROR_LOG,
  }
}

// Submit employee separation
export const submitEmployeeSeparation = data => {
  return {
    type: POST_EMPLOYEE_SEPARATION,
    payload: data,
  }
}
export const submitEmployeeSeparationSuccess = response => {
  return {
    type: POST_EMPLOYEE_SEPARATION_SUCCESS,
    payload: response,
  }
}
export const submitEmployeeSeparationFail = error => {
  return {
    type: POST_EMPLOYEE_SEPARATION_FAIL,
    payload: error,
  }
}
