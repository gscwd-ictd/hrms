import {
  GET_OFFICES,
  GET_OFFICES_SUCCESS,
  POST_OFFICE,
  POST_OFFICE_SUCCESS,
  PUT_OFFICE,
  PUT_OFFICE_SUCCESS,
  DELETE_OFFICE,
  DELETE_OFFICE_SUCCESS,
  RESET_OFFICE,
  OFFICE_API_ERROR,
} from "./actionTypes"

// Offices
export const getOffices = () => ({
  type: GET_OFFICES,
})

export const getOfficesSuccess = offices => ({
  type: GET_OFFICES_SUCCESS,
  payload: offices,
})

export const postOffice = officeData => ({
  type: POST_OFFICE,
  payload: officeData,
})

export const postOfficeSuccess = officeResponse => ({
  type: POST_OFFICE_SUCCESS,
  payload: officeResponse,
})

export const updateOffice = (officeId, officeData) => ({
  type: PUT_OFFICE,
  payload: { officeId, officeData },
})

export const updateOfficeSuccess = officeResponse => ({
  type: PUT_OFFICE_SUCCESS,
  payload: officeResponse,
})

export const deleteOffice = officeId => ({
  type: DELETE_OFFICE,
  payload: officeId,
})

export const deleteOfficeSuccess = officeResponse => ({
  type: DELETE_OFFICE_SUCCESS,
  payload: officeResponse,
})

export const resetOffice = () => ({
  type: RESET_OFFICE,
})

export const officeApiFail = error => ({
  type: OFFICE_API_ERROR,
  payload: error,
})
