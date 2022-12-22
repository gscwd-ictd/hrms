import {
  GET_COUNTRIES,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_SUCCESS,
} from "./actionTypes"

// Departments
export const getCountries = () => ({
  type: GET_COUNTRIES,
})

export const getCountriesSuccess = countries => ({
  type: GET_COUNTRIES_SUCCESS,
  payload: countries,
})

export const getCountriesFail = error => ({
  type: GET_COUNTRIES_FAIL,
  payload: error,
})
