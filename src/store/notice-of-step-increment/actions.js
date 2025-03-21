import {
  GET_EMPLOYEES_FOR_NOSI,
  GET_EMPLOYEES_FOR_NOSI_SUCCESS,
  GET_EMPLOYEES_FOR_NOSI_FAIL,
  GET_NOSI_DETAILS,
  GET_NOSI_DETAILS_SUCCESS,
  GET_NOSI_DETAILS_FAIL,
  POST_NOSI_FOR_APPROVAL,
  POST_NOSI_FOR_APPROVAL_SUCCESS,
  POST_NOSI_FOR_APPROVAL_FAIL,
} from './actionTypes'

// Get employees for NOSI
export const fetchEmployeesForNosi = monthYear => {
  return {
    type: GET_EMPLOYEES_FOR_NOSI,
    payload: monthYear,
  }
}
export const fetchEmployeesForNosiSuccess = response => {
  return {
    type: GET_EMPLOYEES_FOR_NOSI_SUCCESS,
    payload: response,
  }
}
export const fetchEmployeesForNosiFail = error => {
  return {
    type: GET_EMPLOYEES_FOR_NOSI_FAIL,
    payload: error,
  }
}

// Get NOSI details
export const fetchNosiDetails = nosiId => {
  return {
    type: GET_NOSI_DETAILS,
    payload: nosiId,
  }
}
export const fetchNosiDetailsSuccess = response => {
  return {
    type: GET_NOSI_DETAILS_SUCCESS,
    payload: response,
  }
}
export const fetchNosiDetailsFail = error => {
  return {
    type: GET_NOSI_DETAILS_FAIL,
    payload: error,
  }
}

// Submit NOSI for approval of General Manager/Head of Office
export const submitNosiForApproval = data => {
  return {
    type: POST_NOSI_FOR_APPROVAL,
    payload: data,
  }
}
export const submitNosiForApprovalSuccess = response => {
  return {
    type: POST_NOSI_FOR_APPROVAL_SUCCESS,
    payload: response,
  }
}
export const submitNosiForApprovalFail = error => {
  return {
    type: POST_NOSI_FOR_APPROVAL_FAIL,
    payload: error,
  }
}
