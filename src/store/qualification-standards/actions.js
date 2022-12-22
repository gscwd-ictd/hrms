import {
  GET_QUALIFICATION_STANDARDS_LIST,
  GET_QUALIFICATION_STANDARDS_LIST_SUCCESS,
  GET_QUALIFICATION_STANDARDS_LIST_FAIL,
  GET_POSITION_QUALIFICATION_STANDARDS,
  GET_POSITION_QUALIFICATION_STANDARDS_SUCCESS,
  GET_POSITION_QUALIFICATION_STANDARDS_FAIL,
  PUT_POSITION_QUALIFICATION_STANDARDS,
  PUT_POSITION_QUALIFICATION_STANDARDS_SUCCESS,
  PUT_POSITION_QUALIFICATION_STANDARDS_FAIL,
  RESET_QUALIFICATION_STANDARDS,
} from "./actionTypes"

// Get ALL qualification standards
export const fetchQualificationStandardsList = () => ({
  type: GET_QUALIFICATION_STANDARDS_LIST,
})

export const fetchQualificationStandardsListSuccess =
  qualificationStandardsList => ({
    type: GET_QUALIFICATION_STANDARDS_LIST_SUCCESS,
    payload: qualificationStandardsList,
  })

export const fetchQualificationStandardsListFail = error => ({
  type: GET_QUALIFICATION_STANDARDS_LIST_FAIL,
  payload: error,
})

// Get position qualification standards
export const fetchPositionQualificationStandards = positionId => ({
  type: GET_POSITION_QUALIFICATION_STANDARDS,
  payload: positionId,
})

export const fetchPositionQualificationStandardsSuccess =
  qualificationStandards => ({
    type: GET_POSITION_QUALIFICATION_STANDARDS_SUCCESS,
    payload: qualificationStandards,
  })

export const fetchPositionQualificationStandardsFail = error => ({
  type: GET_POSITION_QUALIFICATION_STANDARDS_FAIL,
  payload: error,
})

// Update position qualification standards
export const updatePositionQualificationStandards = (
  positionId,
  updatedQualificationStandards
) => ({
  type: PUT_POSITION_QUALIFICATION_STANDARDS,
  payload: { positionId, updatedQualificationStandards },
})

export const updatePositionQualificationStandardsSuccess =
  qualificationStandards => ({
    type: PUT_POSITION_QUALIFICATION_STANDARDS_SUCCESS,
    payload: qualificationStandards,
  })

export const updatePositionQualificationStandardsFail = error => ({
  type: PUT_POSITION_QUALIFICATION_STANDARDS_FAIL,
  payload: error,
})

// Reset state of all qualification standards
export const resetQualificationStandards = () => ({
  type: RESET_QUALIFICATION_STANDARDS,
})
