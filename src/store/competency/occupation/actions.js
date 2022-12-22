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

// Get competencies assigned to occupation
export const fetchOGCompetencies = occupationId => ({
  type: GET_OCCUPATIONAL_GROUP_COMPETENCIES,
  payload: occupationId,
})
export const fetchOGCompetenciesSuccess = oGCompetencies => ({
  type: GET_OCCUPATIONAL_GROUP_COMPETENCIES_SUCCESS,
  payload: oGCompetencies,
})
export const fetchOGCompetenciesFail = error => ({
  type: GET_OCCUPATIONAL_GROUP_COMPETENCIES_FAIL,
  payload: error,
})

// Get functional competencies that are not assigned yet to the current occupation
export const fetchAvailableFuncCompetencies = occupationId => ({
  type: GET_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  payload: occupationId,
})
export const fetchAvailableFuncCompetenciesSuccess =
  availableFunctionalCompetencies => ({
    type: GET_AVAILABLE_FUNCTIONAL_COMPETENCIES_SUCCESS,
    payload: availableFunctionalCompetencies,
  })
export const fetchAvailableFuncCompetenciesFail = error => ({
  type: GET_AVAILABLE_FUNCTIONAL_COMPETENCIES_FAIL,
  payload: error,
})

// Assign competencies to occupation
export const updateCompetenciesOfOccupation = (
  occupationId,
  selectedCompetencies
) => ({
  type: ASSIGN_COMPETENCIES_TO_OCCUPATION,
  payload: { occupationId, selectedCompetencies },
})
export const updateCompetenciesOfOccupationSuccess =
  assignedCompetenciesData => ({
    type: ASSIGN_COMPETENCIES_TO_OCCUPATION_SUCCESS,
    payload: assignedCompetenciesData,
  })
export const updateCompetenciesOfOccupationFail = error => ({
  type: ASSIGN_COMPETENCIES_TO_OCCUPATION_FAIL,
  payload: error,
})

// Remove competencies to occupation
export const removeCompetenciesOfOccupation = (
  occupationId,
  selectedCompetencies
) => ({
  type: UNASSIGN_COMPETENCIES_TO_OCCUPATION,
  payload: { occupationId, selectedCompetencies },
})
export const removeCompetenciesOfOccupationSuccess =
  assignedCompetenciesData => ({
    type: UNASSIGN_COMPETENCIES_TO_OCCUPATION_SUCCESS,
    payload: assignedCompetenciesData,
  })
export const removeCompetenciesOfOccupationFail = error => ({
  type: UNASSIGN_COMPETENCIES_TO_OCCUPATION_FAIL,
  payload: error,
})

// Reset the whole state of occupational group for competency
export const resetOGCompetencies = () => ({
  type: RESET_OCCUPATIONAL_GROUP_COMPETENCIES,
})

// Select Checkbox
export const selectCompetencyCheckBox = competencyId => ({
  type: SELECT_OCCUPATION_COMPETENCY_ROW,
  payload: competencyId,
})

// Unselect Checkbox
export const unselectCompetencyCheckBox = competencyId => ({
  type: UNSELECT_OCCUPATION_COMPETENCY_ROW,
  payload: competencyId,
})

// Reset selected checkboxs state
export const resetCompetencyCheckBoxes = () => ({
  type: RESET_SELECTED_OCCUPATION_COMPETENCY_ROWS,
})
