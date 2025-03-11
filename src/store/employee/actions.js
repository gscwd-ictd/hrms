import {
  REGISTER_PERMANENT_EMPLOYEE,
  REGISTER_PERMANENT_EMPLOYEE_SUCCESS,
  REGISTER_PERMANENT_EMPLOYEE_FAILED,
  REGISTER_CAS_JO_COS_EMPLOYEE,
  REGISTER_CAS_JO_COS_EMPLOYEE_SUCCESS,
  REGISTER_CAS_JO_COS_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_BASIC_INFO,
  UPDATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  UPDATE_EMPLOYEE_BASIC_INFO_FAIL,
  RESET_EMPLOYEE_RESPONSE_AND_ERROR,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_LIST_FAILED,
  GET_EMPLOYEE_PDS,
  GET_EMPLOYEE_PDS_SUCCESS,
  GET_EMPLOYEE_PDS_FAILED,
  GET_EMPLOYEE_DETAILS_REPORT,
  GET_EMPLOYEE_DETAILS_REPORT_SUCCESS,
  GET_EMPLOYEE_DETAILS_REPORT_FAIL,
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  GET_EMPLOYEE_BASIC_INFO_FAIL,
  GET_EMPLOYEE_HEADER_INFO,
  GET_EMPLOYEE_HEADER_INFO_SUCCESS,
  GET_EMPLOYEE_HEADER_INFO_FAIL,
  RESET_EMPLOYEE_ERROR_LOG,
} from './actionTypes'

// Enroll permanent employee to portal
export const addPermanentEmployee = employeeData => {
  return {
    type: REGISTER_PERMANENT_EMPLOYEE,
    payload: employeeData,
  }
}
export const addPermanentEmployeeSuccess = response => {
  return {
    type: REGISTER_PERMANENT_EMPLOYEE_SUCCESS,
    payload: response,
  }
}
export const addPermanentEmployeeFailed = error => {
  return {
    type: REGISTER_PERMANENT_EMPLOYEE_FAILED,
    payload: error,
  }
}

// Enroll casual, job order, contract of service
export const addCasJoCosEmployee = employeeData => {
  return {
    type: REGISTER_CAS_JO_COS_EMPLOYEE,
    payload: employeeData,
  }
}
export const addCasJoCosEmployeeSuccess = response => {
  return {
    type: REGISTER_CAS_JO_COS_EMPLOYEE_SUCCESS,
    payload: response,
  }
}
export const addCasJoCosEmployeeFailed = error => {
  return {
    type: REGISTER_CAS_JO_COS_EMPLOYEE_FAILED,
    payload: error,
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

// Reset employee responses
export const resetEmpResponseAndError = () => {
  return {
    type: RESET_EMPLOYEE_RESPONSE_AND_ERROR,
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
// export const fetchEmployee201 = employeeId => {
//   return {
//     type: GET_EMPLOYEE_201,
//     payload: employeeId,
//   }
// }
// export const fetchEmployee201Success = response => {
//   return {
//     type: GET_EMPLOYEE_201_SUCCESS,
//     payload: response,
//   }
// }
// export const fetchEmployee201Failed = error => {
//   return {
//     type: GET_EMPLOYEE_201_FAILED,
//     payload: error,
//   }
// }

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

// get employee details for employee card header component
export const fetchEmpHeaderInfo = payload => {
  return {
    type: GET_EMPLOYEE_HEADER_INFO,
    payload: payload,
  }
}
export const fetchEmpHeaderInfoSuccess = response => {
  return {
    type: GET_EMPLOYEE_HEADER_INFO_SUCCESS,
    payload: response,
  }
}
export const fetchEmpHeaderInfoFail = error => {
  return {
    type: GET_EMPLOYEE_HEADER_INFO_FAIL,
    payload: error,
  }
}

// reset employee response on fecth request
export const resetEmployeeErrorLog = () => {
  return {
    type: RESET_EMPLOYEE_ERROR_LOG,
  }
}
