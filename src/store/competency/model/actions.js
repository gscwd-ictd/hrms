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
  PUT_COMPETENCY_DETAILS_SUCCESS,
  PUT_COMPETENCY_DETAILS_FAIL,
  DELETE_COMPETENCY_DETAILS,
  DELETE_COMPETENCY_DETAILS_SUCCESS,
  DELETE_COMPETENCY_DETAILS_FAIL,
} from './actionTypes'

// domains
export const fetchCompetencyDomains = () => ({
  type: GET_COMPETENCY_DOMAINS,
})

export const fetchCompetencyDomainsSuccess = competencyDomains => ({
  type: GET_COMPETENCY_DOMAINS_SUCCESS,
  payload: competencyDomains,
})
export const fetchCompetencyDomainsFail = error => ({
  type: GET_COMPETENCY_DOMAINS_FAIL,
  payload: error,
})

// Core
export const fetchCoreCompetencies = () => ({
  type: GET_CORE_COMPETENCIES,
})
export const fetchCoreCompetenciesSuccess = competencyModels => ({
  type: GET_CORE_COMPETENCIES_SUCCESS,
  payload: competencyModels,
})
export const fetchCoreCompetenciesFail = error => ({
  type: GET_CORE_COMPETENCIES_FAIL,
  payload: error,
})

// Functional
export const fetchFunctionalCompetencies = () => ({
  type: GET_FUNCTIONAL_COMPETENCIES,
})
export const fetchFunctionalCompetenciesSuccess = competencyModels => ({
  type: GET_FUNCTIONAL_COMPETENCIES_SUCCESS,
  payload: competencyModels,
})
export const fetchFunctionalCompetenciesFail = error => ({
  type: GET_FUNCTIONAL_COMPETENCIES_FAIL,
  payload: error,
})

// Cross-Cutting
export const fetchCrossCuttingCompetencies = () => ({
  type: GET_CROSSCUTTING_COMPETENCIES,
})
export const fetchCrossCuttingCompetenciesSuccess = competencyModels => ({
  type: GET_CROSSCUTTING_COMPETENCIES_SUCCESS,
  payload: competencyModels,
})
export const fetchCrossCuttingCompetenciesFail = error => ({
  type: GET_CROSSCUTTING_COMPETENCIES_FAIL,
  payload: error,
})

// Managerial
export const fetchManagerialCompetencies = () => ({
  type: GET_MANAGERIAL_COMPETENCIES,
})
export const fetchManagerialCompetenciesSuccess = competencyModels => ({
  type: GET_MANAGERIAL_COMPETENCIES_SUCCESS,
  payload: competencyModels,
})
export const fetchManagerialCompetenciesFail = error => ({
  type: GET_MANAGERIAL_COMPETENCIES_FAIL,
  payload: error,
})

// Get Single Model
export const fetchProficiencyKeyActions = competencyId => ({
  type: GET_PROFICIENCY_KEY_ACTIONS,
  payload: competencyId,
})
export const fetchProficiencyKeyActionsSuccess = proficiencyKeyActions => ({
  type: GET_PROFICIENCY_KEY_ACTIONS_SUCCESS,
  payload: proficiencyKeyActions,
})
export const fetchProficiencyKeyActionsFail = error => ({
  type: GET_PROFICIENCY_KEY_ACTIONS_FAIL,
  payload: error,
})

// Update Key Action Details
export const updateKeyActionDetails = (index, keyActions) => ({
  type: UPDATE_KEY_ACTION_DETAILS,
  payload: { index, keyActions },
})

// Reset response/errors from competency
export const resetCompetencyResponse = () => ({
  type: RESET_COMPETENCY_RESPONSES,
})

// Add competency details
export const addCompetencyDetails = competencyDetails => ({
  type: POST_COMPETENCY_DETAILS,
  payload: competencyDetails,
})
export const addCompetencyDetailsSuccess = competencyDetailsResponse => ({
  type: POST_COMPETENCY_DETAILS_SUCCESS,
  payload: competencyDetailsResponse,
})
export const addCompetencyDetailsFail = error => ({
  type: POST_COMPETENCY_DETAILS_FAIL,
  payload: error,
})

// Update competency details
export const updateCompetencyDetails = competencyDetails => ({
  type: PUT_COMPETENCY_DETAILS,
  payload: competencyDetails,
})
export const updateCompetencyDetailsSuccess = competencyDetailsResponse => ({
  type: PUT_COMPETENCY_DETAILS_SUCCESS,
  payload: competencyDetailsResponse,
})
export const updateCompetencyDetailsFail = error => ({
  type: PUT_COMPETENCY_DETAILS_FAIL,
  payload: error,
})

// Delete competency details
export const removeCompetencyDetails = competencyId => ({
  type: DELETE_COMPETENCY_DETAILS,
  payload: competencyId,
})

export const removeCompetencyDetailsSuccess = competencyDetails => ({
  type: DELETE_COMPETENCY_DETAILS_SUCCESS,
  payload: competencyDetails,
})

export const removeCompetencyDetailsFail = competencyDetails => ({
  type: DELETE_COMPETENCY_DETAILS_FAIL,
  payload: competencyDetails,
})