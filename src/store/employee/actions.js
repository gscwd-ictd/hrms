import {
  SUBMIT_EMPLOYEE_ASSIGN,
  SUBMIT_EMPLOYEE_ASSIGN_SUCCESS,
  SUBMIT_EMPLOYEE_ASSIGN_FAILED,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_LIST_FAILED,
  GET_EMPLOYEE_PDS,
  GET_EMPLOYEE_PDS_SUCCESS,
  GET_EMPLOYEE_PDS_FAILED,
  GET_EMPLOYEE_201,
  GET_EMPLOYEE_201_SUCCESS,
  GET_EMPLOYEE_201_FAILED,
  RESET_EMPLOYEE_ASSIGN,
  RESET_EMPLOYEE_ERROR_LOG,
  GET_EMPLOYEE_DETAILS_REPORT,
  GET_EMPLOYEE_DETAILS_REPORT_SUCCESS,
  GET_EMPLOYEE_DETAILS_REPORT_FAIL,
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  GET_EMPLOYEE_BASIC_INFO_FAIL,
  UPDATE_EMPLOYEE_BASIC_INFO,
  UPDATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  UPDATE_EMPLOYEE_BASIC_INFO_FAIL,
  RESET_RESPONSE_ON_UPDATE_BASIC_INFO,
} from './actionTypes'

// Assign employee to position and enroll to portal
export const submitEmpAssgn = empassgndata => {
  return {
    type: SUBMIT_EMPLOYEE_ASSIGN,
    payload: empassgndata,
  }
}
export const submitEmpAssgnSuccess = empassgndata => {
  return {
    type: SUBMIT_EMPLOYEE_ASSIGN_SUCCESS,
    payload: empassgndata,
  }
}
export const submitEmpAssgnFailed = error => {
  return {
    type: SUBMIT_EMPLOYEE_ASSIGN_FAILED,
    payload: error,
  }
}

// Reset employee responses
export const resetEmpAssgnResponse = () => {
  return {
    type: RESET_EMPLOYEE_ASSIGN,
  }
}

// Get employee list
export const fetchEmployeeList = () => {
  return {
    type: GET_EMPLOYEE_LIST,
  }
}
export const fetchEmployeeListSuccess = employeeList => {
  return {
    type: GET_EMPLOYEE_LIST_SUCCESS,
    payload: employeeList,
  }
}
export const fetchEmployeeListFailed = error => {
  return {
    type: GET_EMPLOYEE_LIST_FAILED,
    payload: error,
  }
}

// Get employee personal data sheet
export const fetchEmployeePds = employeeId => {
  return {
    type: GET_EMPLOYEE_PDS,
    payload: employeeId,
  }
}
export const fetchEmployeePdsSuccess = employeePds => {
  return {
    type: GET_EMPLOYEE_PDS_SUCCESS,
    payload: employeePds,
  }
}
export const fetchEmployeePdsFailed = error => {
  return {
    type: GET_EMPLOYEE_PDS_FAILED,
    payload: error,
  }
}

// Get employee 201
export const fetchEmployee201 = employeeId => {
  return {
    type: GET_EMPLOYEE_201,
    payload: employeeId,
  }
}
export const fetchEmployee201Success = response => {
  return {
    type: GET_EMPLOYEE_201_SUCCESS,
    payload: response,
  }
}
export const fetchEmployee201Failed = error => {
  return {
    type: GET_EMPLOYEE_201_FAILED,
    payload: error,
  }
}

// get employee details report
export const fetchEmployeeDetailsReport = payload => {
  return {
    type: GET_EMPLOYEE_DETAILS_REPORT,
    payload: payload,
  }
}
export const fetchEmployeeDetailsReportSuccess = response => {
  return {
    type: GET_EMPLOYEE_DETAILS_REPORT_SUCCESS,
    payload: response,
  }
}
export const fetchEmployeeDetailsReportFail = error => {
  return {
    type: GET_EMPLOYEE_DETAILS_REPORT_FAIL,
    payload: error,
  }
}

// get employee basic information
export const fetchEmpBasicInfo = payload => {
  return {
    type: GET_EMPLOYEE_BASIC_INFO,
    payload: payload,
  }
}
export const fetchEmpBasicInfoSuccess = response => {
  return {
    type: GET_EMPLOYEE_BASIC_INFO_SUCCESS,
    payload: response,
  }
}
export const fetchEmpBasicInfoFail = error => {
  return {
    type: GET_EMPLOYEE_BASIC_INFO_FAIL,
    payload: error,
  }
}

// reset employee response on fecth request
export const resetEmployeeErrorLog = () => {
  return {
    type: RESET_EMPLOYEE_ERROR_LOG,
  }
}

// update employee basic information
export const updateEmpBasicInfo = payload => {
  return {
    type: UPDATE_EMPLOYEE_BASIC_INFO,
    payload: payload,
  }
}
export const updateEmpBasicInfoSuccess = response => {
  return {
    type: UPDATE_EMPLOYEE_BASIC_INFO_SUCCESS,
    payload: response,
  }
}
export const updateEmpBasicInfoFail = error => {
  return {
    type: UPDATE_EMPLOYEE_BASIC_INFO_FAIL,
    payload: error,
  }
}

// Reset employee update basic info
export const resetEmpBasicInfoResponse = () => {
  return {
    type: RESET_RESPONSE_ON_UPDATE_BASIC_INFO,
  }
}
