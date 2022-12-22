import {
  GET_OCCUPATIONS,
  GET_OCCUPATIONS_FAIL,
  GET_OCCUPATIONS_SUCCESS,
  GET_OCCUPATION,
  GET_OCCUPATION_SUCCESS,
  GET_OCCUPATION_FAIL,
  POST_OCCUPATION,
  POST_OCCUPATION_SUCCESS,
  POST_OCCUPATION_FAIL,
  PUT_OCCUPATION,
  PUT_OCCUPATION_SUCCESS,
  PUT_OCCUPATION_FAIL,
  DELETE_OCCUPATION,
  DELETE_OCCUPATION_SUCCESS,
  DELETE_OCCUPATION_FAIL,
  GET_OCCUPATIONAL_GROUP_POSITIONS,
  GET_OCCUPATIONAL_GROUP_POSITIONS_SUCCESS,
  GET_OCCUPATIONAL_GROUP_POSITIONS_FAIL,
  RESET_OCCUPATION_RESPONSES,
  GET_POSITIONS_WITHOUT_OCCUPATION,
  GET_POSITIONS_WITHOUT_OCCUPATION_SUCCESS,
  GET_POSITIONS_WITHOUT_OCCUPATION_FAIL,
  ASSIGN_POSITIONS_TO_OCCUPATION,
  ASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS,
  ASSIGN_POSITIONS_TO_OCCUPATION_FAIL,
  UNASSIGN_POSITIONS_TO_OCCUPATION,
  UNASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS,
  UNASSIGN_POSITIONS_TO_OCCUPATION_FAIL,
  SELECT_POSITION_ROW,
  UNSELECT_POSITION_ROW,
  RESET_SELECTED_POSITION_ROWS,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    occupations: [],
    occupationalGroup: [],
    occupation: {
      get: {},
      post: {},
      put: {},
      delete: {},
    },
    assignedPositions: [],
    unassignedPositions: [],
  },
  positionsWithoutOccupation: [],
  selectedRows: [],
  loading: {
    occupationsLoading: false,
    occupationLoading: false,
    occupationalGroupLoading: false,
    positionsWithoutOccupationLoading: false,
    assignPositionsLoading: false,
  },
  error: {
    occupationsError: null,
    occupationError: null,
    occupationalGroupError: null,
    positionsWithoutOccupationError: null,
    assignPositionsError: null,
  },
}

const Occupation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OCCUPATIONS:
      return {
        ...state,
        response: {
          ...state.response,
          occupations: [],
        },
        loading: {
          ...state.loading,
          occupationsLoading: true,
        },
        error: {
          ...state.error,
          occupationsError: null,
        },
      }
    case GET_OCCUPATIONS_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationsLoading: false,
        },
        response: {
          ...state.response,
          occupations: action.payload,
        },
      }
    case GET_OCCUPATIONS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationsLoading: false,
        },
        error: {
          ...state.error,
          occupationsError: action.payload,
        },
      }

    case GET_OCCUPATION:
      return {
        ...state,
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            get: {},
          },
        },
        loading: {
          ...state.loading,
          occupationLoading: true,
        },
        error: {
          ...state.error,
          occupationError: null,
        },
      }
    case GET_OCCUPATION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            get: action.payload,
          },
        },
      }
    case GET_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationsLoading: false,
        },
        error: {
          ...state.error,
          occupationError: action.payload,
        },
      }

    case POST_OCCUPATION:
      return {
        ...state,
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            post: {},
          },
        },
        loading: {
          ...state.loading,
          occupationLoading: true,
        },
        error: {
          ...state.error,
          occupationError: null,
        },
      }
    case POST_OCCUPATION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            post: action.payload,
          },
        },
      }
    case POST_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        error: {
          ...state.error,
          occupationError: action.payload,
        },
      }
    case PUT_OCCUPATION:
      return {
        ...state,
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            put: {},
          },
        },
        loading: {
          ...state.response,
          occupationLoading: true,
        },
        error: {
          ...state.error,
          occupationError: null,
        },
      }
    case PUT_OCCUPATION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            put: action.payload,
          },
        },
      }
    case PUT_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        error: {
          ...state.error,
          occupationError: action.payload,
        },
      }
    case DELETE_OCCUPATION:
      return {
        ...state,
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            delete: {},
          },
        },
        loading: {
          ...state.loading,
          occupationLoading: true,
        },
        error: {
          ...state.error,
          occupationError: null,
        },
      }
    case DELETE_OCCUPATION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            delete: action.payload,
          },
        },
      }
    case DELETE_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationLoading: false,
        },
        error: {
          ...state.error,
          occupationError: action.payload,
        },
      }
    case GET_OCCUPATIONAL_GROUP_POSITIONS:
      return {
        ...state,
        response: {
          ...state.response,
          occupationalGroup: [],
        },
        loading: {
          ...state.loading,
          occupationalGroupLoading: true,
        },
        error: {
          ...state.error,
          occupationalGroupError: null,
        },
      }
    case GET_OCCUPATIONAL_GROUP_POSITIONS_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationalGroupLoading: false,
        },
        response: {
          ...state.response,
          occupationalGroup: action.payload,
        },
      }
    case GET_OCCUPATIONAL_GROUP_POSITIONS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          occupationalGroupLoading: false,
        },
        error: {
          ...state.error,
          occupationalGroupError: null,
        },
      }
    case RESET_OCCUPATION_RESPONSES:
      return {
        ...state,
        response: {
          ...state.response,
          occupation: {
            ...state.response.occupation,
            post: {},
            put: {},
            delete: {},
          },
          assignedPositions: [],
          unassignedPositions: [],
        },
      }
    case GET_POSITIONS_WITHOUT_OCCUPATION:
      return {
        ...state,
        positionsWithoutOccupation: [],
        loading: {
          ...state.loading,
          positionsWithoutOccupationLoading: true,
        },
        error: {
          ...state.error,
          positionsWithoutOccupationError: null,
        },
      }
    case GET_POSITIONS_WITHOUT_OCCUPATION_SUCCESS:
      return {
        ...state,
        positionsWithoutOccupation: action.payload,
        loading: {
          ...state.loading,
          positionsWithoutOccupationLoading: false,
        },
      }
    case GET_POSITIONS_WITHOUT_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          positionsWithoutOccupationLoading: false,
        },
        error: {
          ...state.error,
          positionsWithoutOccupationError: action.payload,
        },
      }
    case ASSIGN_POSITIONS_TO_OCCUPATION:
      return {
        ...state,
        response: {
          ...state.response,
          assignedPositions: [],
        },
        loading: {
          ...state.loading,
          assignPositionsLoading: true,
        },
        error: {
          ...state.error,
          assignPositionsError: null,
        },
      }
    case ASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          assignedPositions: action.payload,
        },
        loading: {
          ...state.loading,
          assignPositionsLoading: false,
        },
      }
    case ASSIGN_POSITIONS_TO_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          assignPositionsLoading: false,
        },
        error: {
          ...state.error,
          assignPositionsError: action.payload,
        },
      }
    case UNASSIGN_POSITIONS_TO_OCCUPATION:
      return {
        ...state,
        response: {
          ...state.response,
          unassignedPositions: [],
        },
        loading: {
          ...state.loading,
          assignPositionsLoading: true,
        },
        error: {
          ...state.error,
          assignPositionsError: null,
        },
      }
    case UNASSIGN_POSITIONS_TO_OCCUPATION_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          unassignedPositions: action.payload,
        },
        loading: {
          ...state.loading,
          assignPositionsLoading: false,
        },
      }
    case UNASSIGN_POSITIONS_TO_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          assignPositionsLoading: false,
        },
        error: {
          ...state.error,
          assignPositionsError: action.payload,
        },
      }
    case SELECT_POSITION_ROW:
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      }
    case UNSELECT_POSITION_ROW:
      return {
        ...state,
        selectedRows: [
          ...state.selectedRows.filter(
            filteredId => filteredId !== action.payload
          ),
        ],
      }
    case RESET_SELECTED_POSITION_ROWS:
      return {
        ...state,
        selectedRows: [],
      }
    default:
      return state
  }
}

export default Occupation
