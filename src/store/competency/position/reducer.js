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
  GET_POSITION_MANAGERIAL_COMPETENCIES,
  GET_POSITION_MANAGERIAL_COMPETENCIES_SUCCESS,
  GET_POSITION_MANAGERIAL_COMPETENCIES_FAIL,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL,
  ASSIGN_COMPETENCIES_OF_POSITION,
  ASSIGN_COMPETENCIES_OF_POSITION_SUCCESS,
  ASSIGN_COMPETENCIES_OF_POSITION_FAIL,
  UNASSIGN_COMPETENCIES_OF_POSITION,
  UNASSIGN_COMPETENCIES_OF_POSITION_SUCCESS,
  UNASSIGN_COMPETENCIES_OF_POSITION_FAIL,
  RESET_POSITION_COMPETENCIES,
  SELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW,
  UNSELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW,
  RESET_POSITION_SELECTED_FUNCTIONAL_COMPETENCY_ROWS,
} from './actionTypes'
import update from 'immutability-helper'

const INIT_STATE = {
  response: {
    positionFunctionalCompetencies: {
      positionId: '',
      positionName: '',
      salaryGrade: 0,
      functional: [],
    },
    positionManagerialCompetencies: {
      positionId: '',
      positionName: '',
      salaryGrade: 0,
      managerial: [],
    },
    assignedCompetencies: [],
    unassignedCompetencies: [],
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
    loadingPositionCompetencies: false,
    loadingAvailableFunctionalCompetencies: false,
  },
  error: {
    errorProficiencyLevel: null,
    errorPositionCompetencies: null,
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
          loadingPositionCompetencies: true,
        },
        response: {
          ...state.response,
          positionFunctionalCompetencies: {
            ...state.response.positionFunctionalCompetencies,
            positionId: '',
            positionName: '',
            salaryGrade: 0,
            functional: [],
          },
        },
        error: {
          ...state.error,
          errorPositionCompetencies: null,
        },
      }
    case GET_POSITION_FUNCTIONAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
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
          loadingPositionCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionCompetencies: action.payload,
        },
      }

    case GET_POSITION_MANAGERIAL_COMPETENCIES:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: true,
        },
        response: {
          ...state.response,
          positionManagerialCompetencies: {
            ...state.response.positionManagerialCompetencies,
            positionId: '',
            positionName: '',
            salaryGrade: 0,
            managerial: [],
          },
        },
        error: {
          ...state.error,
          errorPositionCompetencies: null,
        },
      }
    case GET_POSITION_MANAGERIAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
        },
        response: {
          ...state.response,
          positionManagerialCompetencies: {
            ...state.response.positionManagerialCompetencies,
            positionId: action.payload.positionId,
            positionName: action.payload.positionName,
            salaryGrade: action.payload.salaryGrade,
            managerial: action.payload.managerial,
          },
        },
      }
    case GET_POSITION_MANAGERIAL_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionCompetencies: action.payload,
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

    case ASSIGN_COMPETENCIES_OF_POSITION:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: true,
        },
        error: {
          ...state.error,
          errorPositionCompetencies: null,
        },
        response: {
          ...state.response,
          assignedCompetencies: [],
        },
      }
    case ASSIGN_COMPETENCIES_OF_POSITION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
        },
        response: {
          ...state.response,
          assignedCompetencies: action.payload,
        },
      }
    case ASSIGN_COMPETENCIES_OF_POSITION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionCompetencies: action.payload,
        },
      }

    case UNASSIGN_COMPETENCIES_OF_POSITION:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: true,
        },
        error: {
          ...state.error,
          errorPositionCompetencies: null,
        },
        response: {
          ...state.response,
          unassignedCompetencies: [],
        },
      }
    case UNASSIGN_COMPETENCIES_OF_POSITION_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
        },
        response: {
          ...state.response,
          unassignedCompetencies: action.payload,
        },
      }
    case UNASSIGN_COMPETENCIES_OF_POSITION_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionCompetencies: false,
        },
        error: {
          ...state.error,
          errorPositionCompetencies: action.payload,
        },
      }

    case RESET_POSITION_COMPETENCIES:
      return {
        ...state,
        response: {
          ...state.response,
          positionFunctionalCompetencies: {
            ...state.response.positionFunctionalCompetencies,
            positionId: '',
            positionName: '',
            salaryGrade: 0,
            functional: [],
          },
          assignedCompetencies: [],
          unassignedCompetencies: [],
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
          loadingPositionCompetencies: false,
          loadingAvailableFunctionalCompetencies: false,
        },
        error: {
          ...state.error,
          errorProficiencyLevel: null,
          errorPositionCompetencies: null,
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
