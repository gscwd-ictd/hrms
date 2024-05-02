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

// Get Position Competency Proficiency Levels
export const fetchCompetencyProficiencyLevels = positionId => ({
  type: GET_COMPETENCY_PROFICIENCY_LEVELS,
  payload: positionId,
})
export const fetchCompetencyProficiencyLevelsSuccess =
  positionCompetencies => ({
    type: GET_COMPETENCY_PROFICIENCY_LEVELS_SUCCESS,
    payload: positionCompetencies,
  })
export const fetchCompetencyProficiencyLevelsFail = error => ({
  type: GET_COMPETENCY_PROFICIENCY_LEVELS_FAIL,
  payload: error,
})

// Update Key Action Details
export const updateCompetencyProficiciencyLevel = (index, domain, level) => ({
  type: UPDATE_COMPETENCY_PROFICIENCY_LEVEL,
  payload: { index, domain, level },
})

// Update Position Competency Proficiency Levels
export const updatePositionCompetencyProficiencyLevels = proficiencyLevels => ({
  type: UPDATE_POSITION_PROFICIENCY_LEVELS,
  payload: proficiencyLevels,
})
export const updatePositionCompetencyProficiencyLevelsSuccess =
  updatedProficiencyLevels => ({
    type: UPDATE_POSITION_PROFICIENCY_LEVELS_SUCCESS,
    payload: updatedProficiencyLevels,
  })
export const updatePositionCompetencyProficiencyLevelsFail = error => ({
  type: UPDATE_POSITION_PROFICIENCY_LEVELS_FAIL,
  payload: error,
})

// Get Functional Competency of a position
export const fetchPositionFunctionalCompetencies = positionId => ({
  type: GET_POSITION_FUNCTIONAL_COMPETENCIES,
  payload: positionId,
})
export const fetchPositionFunctionalCompetenciesSuccess =
  positionFunctionalCompetencies => ({
    type: GET_POSITION_FUNCTIONAL_COMPETENCIES_SUCCESS,
    payload: positionFunctionalCompetencies,
  })
export const fetchPositionFunctionalCompetenciesFail = error => ({
  type: GET_POSITION_FUNCTIONAL_COMPETENCIES_FAIL,
  payload: error,
})

// Get Managerial Competency of a position
export const fetchPositionManagerialCompetencies = positionId => ({
  type: GET_POSITION_MANAGERIAL_COMPETENCIES,
  payload: positionId,
})
export const fetchPositionManagerialCompetenciesSuccess =
  positionManagerialCompetencies => ({
    type: GET_POSITION_MANAGERIAL_COMPETENCIES_SUCCESS,
    payload: positionManagerialCompetencies,
  })
export const fetchPositionManagerialCompetenciesFail = error => ({
  type: GET_POSITION_MANAGERIAL_COMPETENCIES_FAIL,
  payload: error,
})

// Get pool for available functional competencies that can be assigned
export const fetchAvailableFunctionalCompetencies = positionId => ({
  type: GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  payload: positionId,
})
export const fetchAvailableFunctionalCompetenciesSuccess =
  availableFunctionalCompetencies => ({
    type: GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS,
    payload: availableFunctionalCompetencies,
  })
export const fetchAvailableFunctionalCompetenciesFail = error => ({
  type: GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL,
  payload: error,
})

// Assign functional competencies to position
export const updateCompetenciesOfPosition = (
  positionId,
  selectedCompetencies
) => ({
  type: ASSIGN_COMPETENCIES_OF_POSITION,
  payload: { positionId, selectedCompetencies },
})
export const updateCompetenciesOfPositionSuccess = assignedCompetencies => ({
  type: ASSIGN_COMPETENCIES_OF_POSITION_SUCCESS,
  payload: assignedCompetencies,
})
export const updateCompetenciesOfPositionFail = error => ({
  type: ASSIGN_COMPETENCIES_OF_POSITION_FAIL,
  payload: error,
})

// Remove functional competencies to position
export const removeCompetenciesOfPosition = selectedCompetencies => ({
  type: UNASSIGN_COMPETENCIES_OF_POSITION,
  payload: selectedCompetencies,
})
export const removeCompetenciesOfPositionSuccess = assignedCompetencies => ({
  type: UNASSIGN_COMPETENCIES_OF_POSITION_SUCCESS,
  payload: assignedCompetencies,
})
export const removeCompetenciesOfPositionFail = error => ({
  type: UNASSIGN_COMPETENCIES_OF_POSITION_FAIL,
  payload: error,
})

// Reset all response values
export const resetPositionCompetencyResponses = () => ({
  type: RESET_POSITION_COMPETENCIES,
})

// Select Checkbox
export const selectFunctionalCompetencyCheckBox = pcplId => ({
  type: SELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW,
  payload: pcplId,
})

// Unselect Checkbox
export const unselectFunctionalCompetencyCheckBox = pcplId => ({
  type: UNSELECT_POSITION_FUNCTIONAL_COMPETENCY_ROW,
  payload: pcplId,
})

// Reset selected checkboxs state
export const resetFunctionalCompetencyCheckBoxes = () => ({
  type: RESET_POSITION_SELECTED_FUNCTIONAL_COMPETENCY_ROWS,
})
