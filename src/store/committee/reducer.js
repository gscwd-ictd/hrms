import {
  POST_COMMITTEE,
  POST_COMMITTEE_SUCCESS,
  PUT_COMMITTEE,
  PUT_COMMITTEE_SUCCESS,
  DELETE_COMMITTEE,
  DELETE_COMMITTEE_SUCCESS,
  GET_COMMITTEES,
  GET_COMMITTEES_SUCCESS,
  COMMITTEE_API_FAIL,
  GET_COMMITTEE_MEMBERS,
  GET_COMMITTEE_MEMBERS_SUCCESS,
  GET_COMMITTEE_MEMBERS_FAIL,
  GET_UNASSIGNED_EMPLOYEES,
  GET_UNASSIGNED_EMPLOYEES_SUCCESS,
  GET_UNASSIGNED_EMPLOYEES_FAIL,
  ASSIGN_COMMITTEE_MEMBERS,
  ASSIGN_COMMITTEE_MEMBERS_SUCCESS,
  ASSIGN_COMMITTEE_MEMBERS_FAIL,
  UNASSIGN_COMMITTEE_MEMBERS,
  UNASSIGN_COMMITTEE_MEMBERS_SUCCESS,
  UNASSIGN_COMMITTEE_MEMBERS_FAIL,
  RESET_COMMITTEE_RESPONSES,
  SELECT_EMPLOYEE_ROW,
  UNSELECT_EMPLOYEE_ROW,
  RESET_SELECTED_EMPLOYEE_ROWS,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    committee: {
      post: {},
      put: {},
      delete: {},
    },
    committees: [],

    members: [],
    availableUnassignedEmployees: [],
    assignedMembers: [],
    unassignedMembers: [],
  },
  selectedRows: [],
  loading: {
    loadingCommittees: false,
    loadingMembers: false,
    loadingAvailableUnassignedEmployees: false,
  },
  error: {
    errorCommittees: null,
    errorMembers: null,
    errorAvailableUnassignedEmployees: null,
  },
}

const committee = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_COMMITTEE:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            post: {},
          },
        },
        loading: {
          ...state.loading,
          loadingCommittees: true,
        },
        error: {
          ...state.error,
          errorCommittees: null,
        },
      }
    case POST_COMMITTEE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            post: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingCommittees: false,
        },
      }

    case PUT_COMMITTEE:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            put: {},
          },
        },
        loading: {
          ...state.loading,
          loadingCommittees: true,
        },
        error: {
          ...state.error,
          errorCommittees: null,
        },
      }
    case PUT_COMMITTEE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            put: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingCommittees: false,
        },
      }

    case DELETE_COMMITTEE:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            delete: {},
          },
        },
        loading: {
          ...state.loading,
          loadingCommittees: true,
        },
        error: {
          ...state.error,
          errorCommittees: null,
        },
      }
    case DELETE_COMMITTEE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            delete: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingCommittees: false,
        },
      }

    case GET_COMMITTEES:
      return {
        ...state,
        response: {
          ...state.response,
          committees: [],
        },
        loading: {
          ...state.loading,
          loadingCommittees: true,
        },
        error: {
          ...state.error,
          errorCommittees: null,
        },
      }
    case GET_COMMITTEES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          committees: action.payload,
        },
        loading: {
          ...state.loading,
          loadingCommittees: false,
        },
      }

    case COMMITTEE_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCommittees: false,
        },
        error: {
          ...state.error,
          errorCommittees: action.payload,
        },
      }

    case GET_COMMITTEE_MEMBERS:
      return {
        ...state,
        response: {
          ...state.response,
          members: [],
        },
        loading: {
          ...state.loading,
          loadingMembers: true,
        },
        error: {
          ...state.error,
          errorMembers: null,
        },
      }
    case GET_COMMITTEE_MEMBERS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          members: action.payload,
        },
        loading: {
          ...state.loading,
          loadingMembers: false,
        },
      }
    case GET_COMMITTEE_MEMBERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingMembers: false,
        },
        error: {
          ...state.error,
          errorMembers: action.payload,
        },
      }

    case GET_UNASSIGNED_EMPLOYEES:
      return {
        ...state,
        response: {
          ...state.response,
          availableUnassignedEmployees: [],
        },
        loading: {
          ...state.loading,
          loadingAvailableUnassignedEmployees: true,
        },
        error: {
          ...state.error,
          errorAvailableUnassignedEmployees: null,
        },
      }
    case GET_UNASSIGNED_EMPLOYEES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          availableUnassignedEmployees: action.payload,
        },
        loading: {
          ...state.loading,
          loadingAvailableUnassignedEmployees: false,
        },
      }
    case GET_UNASSIGNED_EMPLOYEES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableUnassignedEmployees: false,
        },
        error: {
          ...state.error,
          errorAvailableUnassignedEmployees: action.payload,
        },
      }

    case ASSIGN_COMMITTEE_MEMBERS:
      return {
        ...state,
        response: {
          ...state.response,
          assignedMembers: [],
        },
        loading: {
          ...state.loading,
          loadingMembers: true,
        },
        error: {
          ...state.error,
          errorMembers: null,
        },
      }
    case ASSIGN_COMMITTEE_MEMBERS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          assignedMembers: action.payload,
        },
        loading: {
          ...state.loading,
          loadingMembers: false,
        },
      }
    case ASSIGN_COMMITTEE_MEMBERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingMembers: false,
        },
        error: {
          ...state.error,
          errorMembers: action.payload,
        },
      }

    case UNASSIGN_COMMITTEE_MEMBERS:
      return {
        ...state,
        response: {
          ...state.response,
          unassignedMembers: [],
        },
        loading: {
          ...state.loading,
          loadingMembers: true,
        },
        error: {
          ...state.error,
          errorMembers: null,
        },
      }
    case UNASSIGN_COMMITTEE_MEMBERS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          unassignedMembers: action.payload,
        },
        loading: {
          ...state.loading,
          loadingMembers: false,
        },
      }
    case UNASSIGN_COMMITTEE_MEMBERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingMembers: false,
        },
        error: {
          ...state.error,
          errorMembers: action.payload,
        },
      }

    case RESET_COMMITTEE_RESPONSES:
      return {
        ...state,
        response: {
          ...state.response,
          committee: {
            ...state.response.committee,
            post: {},
            put: {},
            delete: {},
          },
          assignedMembers: [],
          unassignedMembers: [],
        },
        error: {
          ...state.error,
          errorCommittees: null,
          errorMembers: null,
          errorAvailableUnassignedEmployees: null,
        },
      }
    case SELECT_EMPLOYEE_ROW:
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      }
    case UNSELECT_EMPLOYEE_ROW:
      return {
        ...state,
        selectedRows: [
          ...state.selectedRows.filter(
            filteredId => filteredId !== action.payload
          ),
        ],
      }
    case RESET_SELECTED_EMPLOYEE_ROWS:
      return {
        ...state,
        selectedRows: [],
      }
    default:
      return state
  }
}

export default committee
