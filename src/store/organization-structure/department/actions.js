import {
  GET_DEPARTMENTS,
  GET_DEPARTMENTS_SUCCESS,
  POST_DEPARTMENT,
  POST_DEPARTMENT_SUCCESS,
  PUT_DEPARTMENT,
  PUT_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  RESET_DEPARTMENT,
  DEPARTMENT_API_ERROR,
} from "./actionTypes"

// Departments
export const getDepartments = () => ({
  type: GET_DEPARTMENTS,
})

export const getDepartmentsSuccess = departments => ({
  type: GET_DEPARTMENTS_SUCCESS,
  payload: departments,
})

export const postDepartment = departmentData => ({
  type: POST_DEPARTMENT,
  payload: departmentData,
})

export const postDepartmentSuccess = departmentResponse => ({
  type: POST_DEPARTMENT_SUCCESS,
  payload: departmentResponse,
})

export const updateDepartment = (departmentId, departmentData) => ({
  type: PUT_DEPARTMENT,
  payload: { departmentId, departmentData },
})

export const updateDepartmentSuccess = departmentResponse => ({
  type: PUT_DEPARTMENT_SUCCESS,
  payload: departmentResponse,
})

export const deleteDepartment = departmentId => ({
  type: DELETE_DEPARTMENT,
  payload: departmentId,
})

export const deleteDepartmentSuccess = departmentResponse => ({
  type: DELETE_DEPARTMENT_SUCCESS,
  payload: departmentResponse,
})

export const resetDepartment = () => ({
  type: RESET_DEPARTMENT,
})

export const departmentApiFail = error => ({
  type: DEPARTMENT_API_ERROR,
  payload: error,
})
