import {
  GET_COMPETENCY_DOMAINS,
  GET_COMPETENCY_DOMAINS_SUCCESS,
  GET_COMPETENCY_DOMAINS_FAIL,
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
  POST_COMPETENCY_DETAILS,
  POST_COMPETENCY_DETAILS_SUCCESS,
  POST_COMPETENCY_DETAILS_FAIL,
  PUT_COMPETENCY_DETAILS,
  PUT_COMPETENCY_DETAILS_FAIL,
  PUT_COMPETENCY_DETAILS_SUCCESS,
  DELETE_COMPETENCY_DETAILS,
  DELETE_COMPETENCY_DETAILS_SUCCESS,
  DELETE_COMPETENCY_DETAILS_FAIL,
} from './actionTypes'
import update from 'immutability-helper'

const INIT_STATE = {
  competencyDomains: [],
  coreModels: [],
  functionalModels: [],
  crossCuttingModels: [],
  managerialModels: [],
  proficiencyKeyActions: [],
  response: {
    postCompetencyDetails: {},
    putCompetencyDetails: {},
    deleteCompetencyDetails: {},
  },
  loading: {
    loadingCompetencyDomains: false,
    loadingCoreModels: false,
    loadingFunctionalModels: false,
    loadingCrossCuttingModels: false,
    loadingManagerialModels: false,
    loadingProficiencyKeyActions: false,
    loadingResponse: false,
  },
  error: {
    errorCompetencyDomains: null,
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
    case GET_COMPETENCY_DOMAINS:
      return {
        ...state,
        competencyDomains: [],
        loading: {
          ...state.loading,
          loadingCompetencyDomains: true,
        },
        error: {
          ...state.error,
          errorCompetencyDomains: null,
        },
      }
    case GET_COMPETENCY_DOMAINS_SUCCESS:
      return {
        ...state,
        competencyDomains: action.payload,
        loading: {
          ...state.loading,
          loadingCompetencyDomains: false,
        },
        error: {
          ...state.error,
          errorCompetencyDomains: null,
        },
      }
    case GET_COMPETENCY_DOMAINS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCompetencyDomains: false,
        },
        error: {
          ...state.error,
          errorCompetencyDomains: action.payload,
        },
      }
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

    case POST_COMPETENCY_DETAILS:
      return {
        ...state,
        response: {
          ...state.response,
          postCompetencyDetails: {},
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
    case POST_COMPETENCY_DETAILS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          postCompetencyDetails: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }
    case POST_COMPETENCY_DETAILS_FAIL:
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

    case DELETE_COMPETENCY_DETAILS:
      return {
        ...state,
        response: {
          ...state.response,
          deleteCompetencyDetails: {},
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
    case DELETE_COMPETENCY_DETAILS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          deleteCompetencyDetails: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }
    case DELETE_COMPETENCY_DETAILS_FAIL:
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
        response: {},
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
