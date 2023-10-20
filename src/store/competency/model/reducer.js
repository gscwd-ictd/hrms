import {
  GET_CORE_COMPETENCIES,
  GET_CORE_COMPETENCIES_SUCCESS,
  GET_CORE_COMPETENCIES_FAIL,
  GET_FUNCTIONAL_COMPETENCIES,
  GET_FUNCTIONAL_COMPETENCIES_SUCCESS,
  GET_FUNCTIONAL_COMPETENCIES_FAIL,
  GET_CROSSCUTTING_COMPETENCIES,
  GET_CROSSCUTTING_COMPETENCIES_SUCCESS,
  GET_CROSSCUTTING_COMPETENCIES_FAIL,
  GET_MANAGERIAL_COMPETENCIES,
  GET_MANAGERIAL_COMPETENCIES_SUCCESS,
  GET_MANAGERIAL_COMPETENCIES_FAIL,
  GET_PROFICIENCY_KEY_ACTIONS,
  GET_PROFICIENCY_KEY_ACTIONS_SUCCESS,
  GET_PROFICIENCY_KEY_ACTIONS_FAIL,
  UPDATE_KEY_ACTION_DETAILS,
  RESET_COMPETENCY_RESPONSES,
  PUT_COMPETENCY_DETAILS,
  PUT_COMPETENCY_DETAILS_FAIL,
  PUT_COMPETENCY_DETAILS_SUCCESS,
} from './actionTypes'
import update from 'immutability-helper'
import { putCompetencyDetails } from './actions'

const INIT_STATE = {
  coreModels: [],
  functionalModels: [],
  crossCuttingModels: [],
  managerialModels: [],
  proficiencyKeyActions: [],
  response: {
    putCompetencyDetails: {},
    deleteCompetency: {},
  },
  loading: {
    loadingCoreModels: false,
    loadingFunctionalModels: false,
    loadingCrossCuttingModels: false,
    loadingManagerialModels: false,
    loadingProficiencyKeyActions: false,
    loadingResponse: false,
  },
  error: {
    errorCoreModels: null,
    errorFunctionalModels: null,
    errorCrossCuttingModels: null,
    errorManagerialModels: null,
    errorProficiencyKeyActions: null,
    errorResponse: null,
  },
}

const competencyModel = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CORE_COMPETENCIES:
      return {
        ...state,
        coreModels: [],
        loading: {
          ...state.loading,
          loadingCoreModels: true,
        },
        error: {
          ...state.error,
          errorCoreModels: null,
        },
      }
    case GET_CORE_COMPETENCIES_SUCCESS:
      return {
        ...state,
        coreModels: action.payload,
        loading: {
          ...state.loading,
          loadingCoreModels: false,
        },
        error: {
          ...state.error,
          errorCoreModels: null,
        },
      }
    case GET_CORE_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCoreModels: false,
        },
        error: {
          ...state.error,
          errorCoreModels: action.payload,
        },
      }

    case GET_FUNCTIONAL_COMPETENCIES:
      return {
        ...state,
        functionalModels: [],
        loading: {
          ...state.loading,
          loadingFunctionalModels: true,
        },
        error: {
          ...state.error,
          errorFunctionalModels: null,
        },
      }
    case GET_FUNCTIONAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        functionalModels: action.payload,
        loading: {
          ...state.loading,
          loadingFunctionalModels: false,
        },
        error: {
          ...state.error,
          errorFunctionalModels: null,
        },
      }
    case GET_FUNCTIONAL_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingFunctionalModels: false,
        },
        error: {
          ...state.error,
          errorFunctionalModels: action.payload,
        },
      }

    case GET_CROSSCUTTING_COMPETENCIES:
      return {
        ...state,
        crossCuttingModels: [],
        loading: {
          ...state.loading,
          loadingCrossCuttingModels: true,
        },
        error: {
          ...state.error,
          errorCrossCuttingModels: null,
        },
      }
    case GET_CROSSCUTTING_COMPETENCIES_SUCCESS:
      return {
        ...state,
        crossCuttingModels: action.payload,
        loading: {
          ...state.loading,
          loadingCrossCuttingModels: false,
        },
        error: {
          ...state.error,
          errorCrossCuttingModels: null,
        },
      }
    case GET_CROSSCUTTING_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCrossCuttingModels: false,
        },
        error: {
          ...state.error,
          errorCrossCuttingModels: action.payload,
        },
      }

    case GET_MANAGERIAL_COMPETENCIES:
      return {
        ...state,
        managerialModels: [],
        loading: {
          ...state.loading,
          loadingManagerialModels: true,
        },
        error: {
          ...state.error,
          errorManagerialModels: null,
        },
      }
    case GET_MANAGERIAL_COMPETENCIES_SUCCESS:
      return {
        ...state,
        managerialModels: action.payload,
        loading: {
          ...state.loading,
          loadingManagerialModels: false,
        },
        error: {
          ...state.error,
          errorManagerialModels: null,
        },
      }
    case GET_MANAGERIAL_COMPETENCIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingManagerialModels: false,
        },
        error: {
          ...state.error,
          errorManagerialModels: action.payload,
        },
      }

    case GET_PROFICIENCY_KEY_ACTIONS:
      return {
        ...state,
        proficiencyKeyActions: [],
        loading: {
          ...state.loading,
          loadingProficiencyKeyActions: true,
        },
        error: {
          ...state.error,
          errorProficiencyKeyActions: null,
        },
      }
    case GET_PROFICIENCY_KEY_ACTIONS_SUCCESS:
      return {
        ...state,
        proficiencyKeyActions: action.payload,
        loading: {
          ...state.loading,
          loadingProficiencyKeyActions: false,
        },
        error: {
          ...state.error,
          errorProficiencyKeyActions: null,
        },
      }
    case GET_PROFICIENCY_KEY_ACTIONS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingProficiencyKeyActions: false,
        },
        error: {
          ...state.error,
          errorProficiencyKeyActions: action.payload,
        },
      }

    case UPDATE_KEY_ACTION_DETAILS:
      return update(state, {
        proficiencyKeyActions: {
          [action.payload.index]: {
            keyActions: { $set: action.payload.keyActions },
          },
        },
      })

    case PUT_COMPETENCY_DETAILS:
      return {
        ...state,
        response: {
          ...state.response,
          putCompetencyDetails: {},
        },
        loading: {
          ...state.loading,
          loadingResponse: true,
        },
        error: {
          ...state.error,
          errorResponse: null,
        },
      }
    case PUT_COMPETENCY_DETAILS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          putCompetencyDetails: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }
    case PUT_COMPETENCY_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
        error: {
          ...state.error,
          errorResponse: action.payload,
        },
      }

    case RESET_COMPETENCY_RESPONSES:
      return {
        ...state,
        error: {
          ...state.error,
          errorCoreModels: null,
          errorFunctionalModels: null,
          errorCrossCuttingModels: null,
          errorManagerialModels: null,
          errorProficiencyKeyActions: null,
        },
      }

    default:
      return state
  }
}

export default competencyModel
