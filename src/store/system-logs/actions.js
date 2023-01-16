import {
  GET_SYSTEM_LOGS,
  GET_SYSTEM_LOGS_SUCCESS,
  GET_SYSTEM_LOGS_FAIL,
  GET_SYSTEM_LOG,
  GET_SYSTEM_LOG_SUCCESS,
  GET_SYSTEM_LOG_FAIL,
} from "./actionTypes"

//  Get list of system logs
export const fetchSystemLogs = () => {
  return {
    type: GET_SYSTEM_LOGS,
  }
}
export const fetchSystemLogsSuccess = response => {
  return {
    type: GET_SYSTEM_LOGS_SUCCESS,
    payload: response,
  }
}
export const fetchSystemLogsFail = error => {
  return {
    type: GET_SYSTEM_LOGS_FAIL,
    payload: error,
  }
}

// Get single system log details
export const fetchSystemLog = logId => {
  return {
    type: GET_SYSTEM_LOG,
    payload: logId,
  }
}
export const fetchSystemLogSuccess = response => {
  return {
    type: GET_SYSTEM_LOG_SUCCESS,
    payload: response,
  }
}
export const fetchSystemLogFail = error => {
  return {
    type: GET_SYSTEM_LOG_FAIL,
    payload: error,
  }
}
