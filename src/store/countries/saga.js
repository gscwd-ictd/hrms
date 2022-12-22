import { call, put, takeEvery } from "redux-saga/effects"
import { getCountryList } from "helpers/external_api_helper"
import { getCountriesSuccess, getCountriesFail } from "./actions"
import { GET_COUNTRIES } from "./actionTypes"

const restCountriesAPI = process.env.REACT_APP_COUNTRY_LIST

function* fetchCountryList() {
  try {
    const response = yield call(
      getCountryList,
      restCountriesAPI
    )
    yield put(getCountriesSuccess(response))
  } catch (error) {
    yield put(getCountriesFail(error))
  }
}

function* countriesSaga() {
  yield takeEvery(GET_COUNTRIES, fetchCountryList)
}

export default countriesSaga
