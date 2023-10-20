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
  PUT_COMPETENCY_DETAILS_SUCCESS,
  PUT_COMPETENCY_DETAILS_FAIL,
} from './actionTypes'

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

// Update compectency details
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