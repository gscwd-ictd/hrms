import {
  GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
  GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
  GET_ASSIGNABLE_EMPLOYEES,
  GET_ASSIGNABLE_EMPLOYEES_SUCCESS,
  GET_ASSIGNABLE_EMPLOYEES_FAIL,
  GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS,
  GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS_SUCCESS,
  GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS_FAIL,
  POST_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  POST_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
  POST_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
  PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
  PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
  DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
  DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
  RESET_EMPLOYEE_TEMPORARY_ASSIGNMENT_RESPONSE,
  GET_ALL_ORGANIZATIONS,
  GET_ALL_ORGANIZATIONS_SUCCESS,
  GET_ALL_ORGANIZATIONS_FAIL,
} from './actionTypes'

// Get all employee with temporary assignment
export const fetchEmployeeTemporaryAssignmentList = () => {
  return {
    type: GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  }
}
export const fetchEmployeeTemporaryAssignmentListSuccess = response => {
  return {
    type: GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
    payload: response,
  }
}
export const fetchEmployeeTemporaryAssignmentListFail = error => {
  return {
    type: GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
    payload: error,
  }
}

// Get all assignable employees for temporary assignment
export const fetchAssignableEmployeeList = () => {
  return {
    type: GET_ASSIGNABLE_EMPLOYEES,
  }
}
export const fetchAssignableEmployeeListSuccess = response => {
  return {
    type: GET_ASSIGNABLE_EMPLOYEES_SUCCESS,
    payload: response,
  }
}
export const fetchAssignableEmployeeListFail = error => {
  return {
    type: GET_ASSIGNABLE_EMPLOYEES_FAIL,
    payload: error,
  }
}

// Get employee temporary assignment details
export const fetchEmployeeTemporaryAssignmentDetails = () => {
  return {
    type: GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS,
  }
}
export const fetchEmployeeTemporaryAssignmentDetailsSuccess = response => {
  return {
    type: GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS_SUCCESS,
    payload: response,
  }
}
export const fetchEmployeeTemporaryAssignmentDetailsFail = error => {
  return {
    type: GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS_FAIL,
    payload: error,
  }
}

// Get all organizations (offices, departments, divisions)

export const fetchAllOrganizations = () => {
  return {
    type: GET_ALL_ORGANIZATIONS,
  }
}

export const fetchAllOrganizationsSuccess = response => {
  const allOrganizations = response
  const organization = [
    ...allOrganizations.offices.map(({ _id, name }) => ({ _id, name })),
    ...allOrganizations.departments.map(({ _id, name }) => ({ _id, name })),
    ...allOrganizations.divisions.map(({ _id, name }) => ({ _id, name })),
  ]

  return {
    type: GET_ALL_ORGANIZATIONS_SUCCESS,
    payload: organization,
  }
}

export const fetchAllOrganizationsFail = error => {
  return {
    type: GET_ALL_ORGANIZATIONS_FAIL,
    payload: error,
  }
}

// Add employee for temporary assignment
export const addEmployeeForTemporaryAssignment = employeeAssignmentDetails => {
  return {
    type: POST_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    payload: employeeAssignmentDetails,
  }
}
export const addEmployeeForTemporaryAssignmentSuccess = response => {
  return {
    type: POST_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
    payload: response,
  }
}
export const addEmployeeForTemporaryAssignmentFail = error => {
  return {
    type: POST_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
    payload: error,
  }
}

// Update employee for temporary assignment
export const updateEmployeeForTemporaryAssignment = (
  tempAssignmentId,
  employeeAssignmentDetails
) => {
  return {
    type: PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    payload: { tempAssignmentId, employeeAssignmentDetails },
  }
}
export const updateEmployeeForTemporaryAssignmentSuccess = response => {
  return {
    type: PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
    payload: response,
  }
}
export const updateEmployeeForTemporaryAssignmentFail = error => {
  return {
    type: PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
    payload: error,
  }
}

// Remove employee in temporary assignment list
export const removeEmployeeForTemporaryAssignment = temporaryAssignmentId => {
  return {
    type: DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    payload: temporaryAssignmentId,
  }
}
export const removeEmployeeForTemporaryAssignmentSuccess = response => {
  return {
    type: DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS,
    payload: response,
  }
}
export const removeEmployeeForTemporaryAssignmentFail = error => {
  return {
    type: DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL,
    payload: error,
  }
}

// Reset responses post, delete, update
export const resetEmployeeTemporaryAssignmentResponse = () => {
  return {
    type: RESET_EMPLOYEE_TEMPORARY_ASSIGNMENT_RESPONSE,
  }
}
