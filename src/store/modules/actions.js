import {
  GET_HRMS_MODULES,
  GET_HRMS_MODULES_SUCCESS,
  POST_HRMS_MODULE,
  POST_HRMS_MODULE_SUCCESS,
  DELETE_HRMS_MODULE,
  DELETE_HRMS_MODULE_SUCCESS,
  PATCH_HRMS_MODULE,
  PATCH_HRMS_MODULE_SUCCESS,
  HRMS_MODULE_API_FAIL,
  RESET_HRMS_MODULE_RESPONSE,
} from "./actionTypes"

// Get all HRMS modules
export const fetchHrmsModules = () => {
  return {
    type: GET_HRMS_MODULES,
  }
}
export const fetchHrmsModulesSuccess = response => {
  return {
    type: GET_HRMS_MODULES_SUCCESS,
    payload: response,
  }
}

// Add new module
export const addModule = moduleDetails => {
  return {
    type: POST_HRMS_MODULE,
    payload: moduleDetails,
  }
}
export const addModuleSuccess = response => {
  return {
    type: POST_HRMS_MODULE_SUCCESS,
    payload: response,
  }
}

// Delete a module
export const removeModule = moduleId => {
  return {
    type: DELETE_HRMS_MODULE,
    payload: moduleId,
  }
}
export const removeModuleSuccess = response => {
  return {
    type: DELETE_HRMS_MODULE_SUCCESS,
    payload: response,
  }
}

// Update module details
export const updateModule = (moduleId, updatedModuleDetails) => {
  return {
    type: PATCH_HRMS_MODULE,
    payload: { moduleId, updatedModuleDetails },
  }
}
export const updateModuleSuccess = response => {
  return {
    type: PATCH_HRMS_MODULE_SUCCESS,
    payload: response,
  }
}

// Error action for failed api request
export const moduleApiFail = error => {
  return {
    type: HRMS_MODULE_API_FAIL,
    payload: error,
  }
}

// Reset add, update and delete responses
export const resetModuleResponse = () => {
  return {
    type: RESET_HRMS_MODULE_RESPONSE,
  }
}
