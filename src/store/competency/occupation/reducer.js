import {
  GET_OCCUPATIONAL_GROUP_COMPETENCIES,
  GET_OCCUPATIONAL_GROUP_COMPETENCIES_SUCCESS,
  GET_OCCUPATIONAL_GROUP_COMPETENCIES_FAIL,
  GET_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  GET_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS,
  GET_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL,
  ASSIGN_COMPETENCIES_TO_OCCUPATION,
  ASSIGN_COMPETENCIES_TO_OCCUPATION_SUCCESS,
  ASSIGN_COMPETENCIES_TO_OCCUPATION_FAIL,
  UNASSIGN_COMPETENCIES_TO_OCCUPATION,
  UNASSIGN_COMPETENCIES_TO_OCCUPATION_SUCCESS,
  UNASSIGN_COMPETENCIES_TO_OCCUPATION_FAIL,
  RESET_OCCUPATIONAL_GROUP_COMPETENCIES,
  SELECT_OCCUPATION_COMPETENCY_ROW,
  UNSELECT_OCCUPATION_COMPETENCY_ROW,
  RESET_SELECTED_OCCUPATION_COMPETENCY_ROWS,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    occupationName: "",
    competencies: [],
    assignedCompetencies: [],
    unassignedCompetencies: [],
  },
  availableFunctionalCompetencies: [],
  selectedRows: [],
  loading: {
    loadingOccupationCompetencies: false,
    loadingAvailableFunctionalCompetencies: false,
  },
  error: {
    errorOccupationCompetencies: null,
    errorAvailableFunctionalCompetencies: null,
  },
}

const occupationCompetencySet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OCCUPATIONAL_GROUP_COMPETENCIES:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: true,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: null,
        },
        response: {
          ...state.response,
          occupationName: "",
          competencies: [],
        },
      }
    case GET_OCCUPATIONAL_GROUP_COMPETENCIES_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
        },
        response: {
          ...state.response,
          occupationName: action.payload.occupationName,
          competencies: action.payload.competencies,
        },
      }
    case GET_OCCUPATIONAL_GROUP_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: action.payload,
        },
      }

    case GET_AVAILABLE_FUNCTIONAL_COMPETENCIES:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableFunctionalCompetencies: true,
        },
        error: {
          ...state.error,
          errorAvailableFunctionalCompetencies: null,
        },
        response: {
          ...state.response,
          occupationName: "",
          competencies: [],
        },
      }
    case GET_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableFunctionalCompetencies: false,
        },
        availableFunctionalCompetencies: action.payload,
      }
    case GET_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorAvailableFunctionalCompetencies: action.payload,
        },
      }

    case ASSIGN_COMPETENCIES_TO_OCCUPATION:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: true,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: null,
        },
        response: {
          ...state.response,
          assignedCompetencies: [],
        },
      }
    case ASSIGN_COMPETENCIES_TO_OCCUPATION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
        },
        response: {
          ...state.response,
          assignedCompetencies: action.payload,
        },
      }
    case ASSIGN_COMPETENCIES_TO_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: action.payload,
        },
      }

    case UNASSIGN_COMPETENCIES_TO_OCCUPATION:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: true,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: null,
        },
        response: {
          ...state.response,
          unassignedCompetencies: [],
        },
      }
    case UNASSIGN_COMPETENCIES_TO_OCCUPATION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
        },
        response: {
          ...state.response,
          unassignedCompetencies: action.payload,
        },
      }
    case UNASSIGN_COMPETENCIES_TO_OCCUPATION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: action.payload,
        },
      }

    case RESET_OCCUPATIONAL_GROUP_COMPETENCIES:
      return {
        ...state,
        response: {
          ...state.response,
          occupationName: "",
          competencies: [],
          assignedCompetencies: [],
          unassignedCompetencies: [],
        },
        availableFunctionalCompetencies: [],
        selectedRows: [],
        loading: {
          ...state.loading,
          loadingOccupationCompetencies: false,
          loadingAvailableFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorOccupationCompetencies: null,
          errorAvailableFunctionalCompetencies: null,
        },
      }

    case SELECT_OCCUPATION_COMPETENCY_ROW:
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      }
    case UNSELECT_OCCUPATION_COMPETENCY_ROW:
      return {
        ...state,
        selectedRows: [
          ...state.selectedRows.filter(
            filteredId => filteredId !== action.payload
          ),
        ],
      }
    case RESET_SELECTED_OCCUPATION_COMPETENCY_ROWS:
      return {
        ...state,
        selectedRows: [],
      }
    default:
      return state
  }
}

export default occupationCompetencySet
