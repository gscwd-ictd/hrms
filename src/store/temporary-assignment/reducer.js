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

const INIT_STATE = {
  employeeTemporaryAssignmentList: [],
  assignableEmployeeList: [],
  employeeTemporaryAssignmentDetails: [],
  allOrganizations: [],
  response: {
    postEmployeeTemporaryAssignment: {},
    patchEmployeeTemporaryAssignment: {},
    deleteEmployeeTemporaryAssignment: {},
  },
  loading: {
    loadingEmployeeTemporaryAssignmentList: false,
    loadingAssignableEmployeeList: false,
    loadingEmployeeTemporaryAssignmentDetails: false,
    loadingAllOrganizations: false,
    loadingPostEmployeeTemporaryAssignment: false,
    loadingPatchEmployeeTemporaryAssignment: false,
    loadingDeleteEmployeeTemporaryAssignment: false,
  },
  error: {
    errorEmployeeTemporaryAssignmentList: null,
    errorAssignableEmployeeList: null,
    errorEmployeeTemporaryAssignmentDetails: null,
    errorAllOrganizations: null,
    errorPostEmployeeTemporaryAssignment: null,
    errorPatchEmployeeTemporaryAssignment: null,
    errorDeleteEmployeeTemporaryAssignment: null,
  },
}

const temporaryAssignment = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get all employee with temporary assignment
    case GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT:
      return {
        ...state,
        employeeTemporaryAssignmentList: [],
        loading: {
          ...state.loading,
          loadingEmployeeTemporaryAssignmentList: true,
        },
        error: {
          ...state.error,
          errorEmployeeTemporaryAssignmentList: null,
        },
      }
    case GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        employeeTemporaryAssignmentList: action.payload,
        loading: {
          ...state.loading,
          loadingEmployeeTemporaryAssignmentList: false,
        },
      }
    case GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingEmployeeTemporaryAssignmentList: false,
        },
        error: {
          ...state.error,
          errorEmployeeTemporaryAssignmentList: action.payload,
        },
      }

    // Get all assignable employees for temporary assignment
    case GET_ASSIGNABLE_EMPLOYEES:
      return {
        ...state,
        assignableEmployeeList: [],
        loading: {
          ...state.loading,
          loadingAssignableEmployeeList: true,
        },
        error: {
          ...state.error,
          errorAssignableEmployeeList: null,
        },
      }
    case GET_ASSIGNABLE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        assignableEmployeeList: action.payload,
        loading: {
          ...state.loading,
          loadingAssignableEmployeeList: false,
        },
      }
    case GET_ASSIGNABLE_EMPLOYEES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAssignableEmployeeList: false,
        },
        error: {
          ...state.error,
          errorAssignableEmployeeList: action.payload,
        },
      }

    // Get employee temporary assignment details
    case GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS:
      return {
        ...state,
        employeeTemporaryAssignmentDetails: [],
        loading: {
          ...state.loading,
          loadingEmployeeTemporaryAssignmentDetails: true,
        },
        error: {
          ...state.error,
          errorEmployeeTemporaryAssignmentDetails: null,
        },
      }
    case GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS_SUCCESS:
      return {
        ...state,
        employeeTemporaryAssignmentDetails: action.payload,
        loading: {
          ...state.loading,
          loadingEmployeeTemporaryAssignmentDetails: false,
        },
      }
    case GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingEmployeeTemporaryAssignmentDetails: false,
        },
        error: {
          ...state.error,
          errorEmployeeTemporaryAssignmentDetails: action.payload,
        },
      }

    // Get all organizations
    case GET_ALL_ORGANIZATIONS:
      return {
        ...state,
        allOrganizations: [],
        loading: {
          ...state.loading,
          loadingAllOrganizations: true,
        },
        error: {
          ...state.error,
          errorAllOrganizations: null,
        },
      }
    case GET_ALL_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        allOrganizations: action.payload,
        loading: {
          ...state.loading,
          loadingAllOrganizations: false,
        },
      }
    case GET_ALL_ORGANIZATIONS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAllOrganizations: false,
        },
        error: {
          ...state.error,
          errorAllOrganizations: action.payload,
        },
      }

    // Add employee for temporary assignment
    case POST_EMPLOYEE_TEMPORARY_ASSIGNMENT:
      return {
        ...state,
        response: {
          ...state.response,
          postEmployeeTemporaryAssignment: {},
        },
        loading: {
          ...state.loading,
          loadingPostEmployeeTemporaryAssignment: true,
        },
        error: {
          ...state.error,
          errorPostEmployeeTemporaryAssignment: null,
        },
      }
    case POST_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          postEmployeeTemporaryAssignment: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPostEmployeeTemporaryAssignment: false,
        },
      }
    case POST_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPostEmployeeTemporaryAssignment: false,
        },
        error: {
          ...state.error,
          errorPostEmployeeTemporaryAssignment: action.payload,
        },
      }

    // Update employee for temporary assignment
    case PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT:
      return {
        ...state,
        response: {
          ...state.response,
          patchEmployeeTemporaryAssignment: {},
        },
        loading: {
          ...state.loading,
          loadingPatchEmployeeTemporaryAssignment: true,
        },
        error: {
          ...state.error,
          errorPatchEmployeeTemporaryAssignment: null,
        },
      }
    case PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          patchEmployeeTemporaryAssignment: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPatchEmployeeTemporaryAssignment: false,
        },
      }
    case PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPatchEmployeeTemporaryAssignment: false,
        },
        error: {
          ...state.error,
          errorPatchEmployeeTemporaryAssignment: action.payload,
        },
      }

    // Remove employee in temporary assignment list
    case DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT:
      return {
        ...state,
        response: {
          ...state.response,
          deleteEmployeeTemporaryAssignment: {},
        },
        loading: {
          ...state.loading,
          loadingDeleteEmployeeTemporaryAssignment: true,
        },
        error: {
          ...state.error,
          errorDeleteEmployeeTemporaryAssignment: null,
        },
      }
    case DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          deleteEmployeeTemporaryAssignment: action.payload,
        },
        loading: {
          ...state.loading,
          loadingDeleteEmployeeTemporaryAssignment: false,
        },
      }
    case DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingDeleteEmployeeTemporaryAssignment: false,
        },
        error: {
          ...state.error,
          errorDeleteEmployeeTemporaryAssignment: action.payload,
        },
      }

    case RESET_EMPLOYEE_TEMPORARY_ASSIGNMENT_RESPONSE:
      return {
        ...state,
        response: {
          ...state.response,
          postEmployeeTemporaryAssignment: {},
          patchEmployeeTemporaryAssignment: {},
          deleteEmployeeTemporaryAssignment: {},
        },
      }

    default:
      return state
  }
}

export default temporaryAssignment
