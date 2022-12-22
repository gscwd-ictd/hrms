import {
  GET_COMPETENCY_PROFICIENCY_LEVELS,
  GET_COMPETENCY_PROFICIENCY_LEVELS_SUCCESS,
  GET_COMPETENCY_PROFICIENCY_LEVELS_FAIL,
  UPDATE_COMPETENCY_PROFICIENCY_LEVEL,
  UPDATE_POSITION_PROFICIENCY_LEVELS,
  UPDATE_POSITION_PROFICIENCY_LEVELS_SUCCESS,
  UPDATE_POSITION_PROFICIENCY_LEVELS_FAIL,
  GET_POSITION_FUNCTIONAL_COMPETENCIES,
  GET_POSITION_FUNCTIONAL_COMPETENCIES_SUCCESS,
  GET_POSITION_FUNCTIONAL_COMPETENCIES_FAIL,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL,
  ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION,
  ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_SUCCESS,
  ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_FAIL,
  UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION,
  UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_SUCCESS,
  UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_FAIL,
  RESET_POSITION_COMPETENCIES,
  SELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW,
  UNSELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW,
  RESET_POSITION_SELECTED_FUNCTIONAL_COMPETENCY_ROWS,
} from "./actionTypes"
import update from "immutability-helper"

const INIT_STATE = {
  response: {
    positionFunctionalCompetencies: {
      positionId: "",
      positionName: "",
      salaryGrade: 0,
      functional: [],
    },
    assignedFunctionalCompetencies: [],
    unassignedFunctionalCompetencies: [],
    proficiencyLevel: {
      core: [],
      functional: [],
      crossCutting: [],
      managerial: [],
    },
  },
  availableFunctionalCompetencies: [],
  selectedRows: [],
  loading: {
    loadingProficiencyLevel: false,
    loadingPositionFunctionalCompetencies: false,
    loadingAvailableFunctionalCompetencies: false,
  },
  error: {
    errorProficiencyLevel: null,
    errorPositionFunctionalCompetencies: null,
    errorAvailableFunctionalCompetencies: null,
  },
}

const positionCompetencySet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPETENCY_PROFICIENCY_LEVELS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyLevel: true,
        },
        response: {
          ...state.response,
          proficiencyLevel: {
            ...state.response.proficiencyLevel,
            core: [],
            functional: [],
            crossCutting: [],
            managerial: [],
          },
        },
        error: {
          ...state.error,
          errorProficiencyLevel: null,
        },
      }
    case GET_COMPETENCY_PROFICIENCY_LEVELS_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyLevel: false,
        },
        response: {
          ...state.response,
          proficiencyLevel: {
            ...state.response.proficiencyLevel,
            core: action.payload.core,
            functional: action.payload.functional,
            crossCutting: action.payload.crossCutting,
            managerial: action.payload.managerial,
          },
        },
      }
    case GET_COMPETENCY_PROFICIENCY_LEVELS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyLevel: false,
        },
        error: {
          ...state.error,
          errorProficiencyLevel: action.payload,
        },
      }

    case UPDATE_COMPETENCY_PROFICIENCY_LEVEL: {
      return update(state, {
        response: {
          proficiencyLevel: {
            [action.payload.domain]: {
              [action.payload.index]: {
                level: { $set: action.payload.level },
              },
            },
          },
        },
      })
    }

    case UPDATE_POSITION_PROFICIENCY_LEVELS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyLevel: true,
        },
        response: {
          ...state.response,
          proficiencyLevel: {
            ...state.response.proficiencyLevel,
            core: [],
            functional: [],
            crossCutting: [],
            managerial: [],
          },
        },
        error: {
          ...state.error,
          errorProficiencyLevel: null,
        },
      }
    case UPDATE_POSITION_PROFICIENCY_LEVELS_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyLevel: false,
        },
        response: {
          ...state.response,
          proficiencyLevel: {
            ...state.response.proficiencyLevel,
            core: action.payload.core,
            functional: action.payload.functional,
            crossCutting: action.payload.crossCutting,
            managerial: action.payload.managerial,
          },
        },
      }
    case UPDATE_POSITION_PROFICIENCY_LEVELS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyLevel: false,
        },
        error: {
          ...state.error,
          errorProficiencyLevel: action.payload,
        },
      }

    case GET_POSITION_FUNCTIONAL_COMPETENCIES:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: true,
        },
        response: {
          ...state.response,
          positionFunctionalCompetencies: {
            ...state.response.positionFunctionalCompetencies,
            positionId: "",
            positionName: "",
            salaryGrade: 0,
            functional: [],
          },
        },
        error: {
          ...state.error,
          errorPositionFunctionalCompetencies: null,
        },
      }
    case GET_POSITION_FUNCTIONAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: false,
        },
        response: {
          ...state.response,
          positionFunctionalCompetencies: {
            ...state.response.positionFunctionalCompetencies,
            positionId: action.payload.positionId,
            positionName: action.payload.positionName,
            salaryGrade: action.payload.salaryGrade,
            functional: action.payload.functional,
          },
        },
      }
    case GET_POSITION_FUNCTIONAL_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionFunctionalCompetencies: action.payload,
        },
      }

    case GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableFunctionalCompetencies: true,
        },
        availableFunctionalCompetencies: [],
        error: {
          ...state.error,
          errorAvailableFunctionalCompetencies: null,
        },
      }
    case GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableFunctionalCompetencies: false,
        },
        availableFunctionalCompetencies: action.payload,
      }
    case GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL:
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

    case ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: true,
        },
        error: {
          ...state.error,
          errorPositionFunctionalCompetencies: null,
        },
        response: {
          ...state.response,
          assignedFunctionalCompetencies: [],
        },
      }
    case ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: false,
        },
        response: {
          ...state.response,
          assignedFunctionalCompetencies: action.payload,
        },
      }
    case ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionFunctionalCompetencies: action.payload,
        },
      }

    case UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: true,
        },
        error: {
          ...state.error,
          errorPositionFunctionalCompetencies: null,
        },
        response: {
          ...state.response,
          unassignedFunctionalCompetencies: [],
        },
      }
    case UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: false,
        },
        response: {
          ...state.response,
          unassignedFunctionalCompetencies: action.payload,
        },
      }
    case UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionFunctionalCompetencies: action.payload,
        },
      }

    case RESET_POSITION_COMPETENCIES:
      return {
        ...state,
        response: {
          ...state.response,
          positionFunctionalCompetencies: {
            ...state.response.positionFunctionalCompetencies,
            positionId: "",
            positionName: "",
            salaryGrade: 0,
            functional: [],
          },
          assignedFunctionalCompetencies: [],
          unassignedFunctionalCompetencies: [],
          proficiencyLevel: {
            ...state.response.proficiencyLevel,
            core: [],
            functional: [],
            crossCutting: [],
            managerial: [],
          },
        },
        availableFunctionalCompetencies: [],
        selectedRows: [],
        loading: {
          ...state.loading,
          loadingProficiencyLevel: false,
          loadingPositionFunctionalCompetencies: false,
          loadingAvailableFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorProficiencyLevel: null,
          errorPositionFunctionalCompetencies: null,
          errorAvailableFunctionalCompetencies: null,
        },
      }

    case SELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW:
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      }
    case UNSELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW:
      return {
        ...state,
        selectedRows: [
          ...state.selectedRows.filter(
            filteredId => filteredId !== action.payload
          ),
        ],
      }
    case RESET_POSITION_SELECTED_FUNCTIONAL_COMPETENCY_ROWS:
      return {
        ...state,
        selectedRows: [],
      }

    default:
      return state
  }
}

export default positionCompetencySet
