import { call, put, takeEvery } from "redux-saga/effects"
import {
  getOfficeList,
  postOffice,
  putOffice,
  delOffice,
} from "helpers/backend_helper"
import {
  officeApiFail,
  getOfficesSuccess,
  postOfficeSuccess,
  updateOfficeSuccess,
  deleteOfficeSuccess,
} from "./actions"
import {
  GET_OFFICES,
  POST_OFFICE,
  PUT_OFFICE,
  DELETE_OFFICE,
} from "./actionTypes"

function* fetchOfficeList() {
  try {
    const response = yield call(getOfficeList)
    yield put(getOfficesSuccess(response))
  } catch (error) {
    yield put(officeApiFail(error))
  }
}

function* addOffice({ payload: officeData }) {
  try {
    const response = yield call(postOffice, officeData)
    yield put(postOfficeSuccess(response))
  } catch (error) {
    yield put(officeApiFail(error))
  }
}

function* updateOffice({ payload: { officeId, officeData } }) {
  try {
    const response = yield call(putOffice, officeId, officeData)
    yield put(updateOfficeSuccess(response))
  } catch (error) {
    yield put(officeApiFail(error))
  }
}

function* deleteOffice({ payload: officeId }) {
  try {
    const response = yield call(delOffice, officeId)
    yield put(deleteOfficeSuccess(response))
  } catch (error) {
    yield put(officeApiFail(error))
  }
}

function* officesSaga() {
  yield takeEvery(GET_OFFICES, fetchOfficeList)
  yield takeEvery(POST_OFFICE, addOffice)
  yield takeEvery(PUT_OFFICE, updateOffice)
  yield takeEvery(DELETE_OFFICE, deleteOffice)
}

export default officesSaga
