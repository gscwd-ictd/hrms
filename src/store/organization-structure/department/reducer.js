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

const INIT_STATE = {
  departments: [],
  postDepartmentRes: [],
  putDepartmentRes: [],
  delDepartmentRes: [],
  isLoading: false,
  error: null,
}

const departmentList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        departments: action.payload,
      }
    case POST_DEPARTMENT:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case POST_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postDepartmentRes: action.payload,
      }
    case PUT_DEPARTMENT:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case PUT_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        putDepartmentRes: action.payload,
      }
    case DELETE_DEPARTMENT:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        delDepartmentRes: action.payload,
      }
    case RESET_DEPARTMENT:
      return {
        ...state,
        postDepartmentRes: [],
        putDepartmentRes: [],
        delDepartmentRes: [],
        error: null,
      }
    case DEPARTMENT_API_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default departmentList
