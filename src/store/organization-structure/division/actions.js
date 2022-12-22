import {
  GET_DIVISIONS,
  GET_DIVISIONS_SUCCESS,
  POST_DIVISION,
  POST_DIVISION_SUCCESS,
  PUT_DIVISION,
  PUT_DIVISION_SUCCESS,
  DELETE_DIVISION,
  DELETE_DIVISION_SUCCESS,
  RESET_DIVISION,
  DIVISION_API_ERROR,
} from "./actionTypes"

// Divisions
export const getDivisions = () => ({
  type: GET_DIVISIONS,
})

export const getDivisionsSuccess = divisions => ({
  type: GET_DIVISIONS_SUCCESS,
  payload: divisions,
})

export const postDivision = divisionData => ({
  type: POST_DIVISION,
  payload: divisionData,
})

export const postDivisionSuccess = divisionResponse => ({
  type: POST_DIVISION_SUCCESS,
  payload: divisionResponse,
})

export const updateDivision = (divisionId, divisionData) => ({
  type: PUT_DIVISION,
  payload: {divisionId, divisionData},
})

export const updateDivisionSuccess = divisionResponse => ({
  type: PUT_DIVISION_SUCCESS,
  payload: divisionResponse,
})

export const deleteDivision = divisionId => ({
  type: DELETE_DIVISION,
  payload: divisionId,
})

export const deleteDivisionSuccess = divisionResponse => ({
  type: DELETE_DIVISION_SUCCESS,
  payload: divisionResponse,
})

export const resetDivision = () => ({
  type: RESET_DIVISION,
})

export const divisionApiFail = error => ({
  type: DIVISION_API_ERROR,
  payload: error,
})
