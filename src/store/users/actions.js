import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_NON_HRMS_USERS,
  GET_NON_HRMS_USERS_SUCCESS,
  GET_NON_HRMS_USERS_FAIL,
  POST_USER,
  POST_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_USER_ROLES,
  GET_USER_ROLES_SUCCESS,
  PATCH_USER_ROLES,
  PATCH_USER_ROLES_SUCCESS,
  RESET_USER_RESPONSE,
  USER_API_FAIL,
} from "./actionTypes"

// Get all HRMS users
export const fetchUsers = () => {
  return {
    type: GET_USERS,
  }
}
export const fetchUsersSuccess = response => {
  return {
    type: GET_USERS_SUCCESS,
    payload: response,
  }
}
export const fetchUsersFail = error => {
  return {
    type: GET_USERS_FAIL,
    payload: error,
  }
}

// Get all non HRMS users
export const fetchNonUsers = () => {
  return {
    type: GET_NON_HRMS_USERS,
  }
}
export const fetchNonUsersSuccess = response => {
  return {
    type: GET_NON_HRMS_USERS_SUCCESS,
    payload: response,
  }
}
export const fetchNonUsersFail = error => {
  return {
    type: GET_NON_HRMS_USERS_FAIL,
    payload: error,
  }
}

// Add new HRMS user
export const addUser = userDetails => {
  return {
    type: POST_USER,
    payload: userDetails,
  }
}
export const addUserSuccess = response => {
  return {
    type: POST_USER_SUCCESS,
    payload: response,
  }
}

// Delete HRMS user
export const removeUser = employeeId => {
  return {
    type: DELETE_USER,
    payload: employeeId,
  }
}
export const removeUserSuccess = response => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: response,
  }
}

// Get user details and roles
export const fetchUserRoles = employeeId => {
  return {
    type: GET_USER_ROLES,
    payload: employeeId,
  }
}
export const fetchUserRolesSuccess = response => {
  return {
    type: GET_USER_ROLES_SUCCESS,
    payload: response,
  }
}

// Update HRMS user roles
export const updateUserRoles = (employeeId, updatedUserRoles) => {
  return {
    type: PATCH_USER_ROLES,
    payload: { employeeId, updatedUserRoles },
  }
}
export const updateUserRolesSuccess = response => {
  return {
    type: PATCH_USER_ROLES_SUCCESS,
    payload: response,
  }
}

// Error action for failed api request
export const userApiFail = error => {
  return {
    type: USER_API_FAIL,
    payload: error,
  }
}

// Reset add, update and delete responses
export const resetUserResponse = () => {
  return {
    type: RESET_USER_RESPONSE,
  }
}
