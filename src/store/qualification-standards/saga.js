import { call, put, takeEvery } from "redux-saga/effects"
import {
  getQualificationStandardsList,
  getPositionQualificationStandard,
  putPositionQualificationStandard,
} from "helpers/backend_helper"
import {
  fetchQualificationStandardsListSuccess,
  fetchQualificationStandardsListFail,
  fetchPositionQualificationStandardsSuccess,
  fetchPositionQualificationStandardsFail,
  updatePositionQualificationStandardsSuccess,
  updatePositionQualificationStandardsFail,
} from "./actions"
import {
  GET_QUALIFICATION_STANDARDS_LIST,
  GET_POSITION_QUALIFICATION_STANDARDS,
  PUT_POSITION_QUALIFICATION_STANDARDS,
} from "./actionTypes"

function* fetchQualificationStandardsList() {
  try {
    const response = yield call(getQualificationStandardsList)
    yield put(fetchQualificationStandardsListSuccess(response))
  } catch (error) {
    yield put(fetchQualificationStandardsListFail(error))
  }
}

function* fetchPositionQualificationStandards({ payload: positionId }) {
  try {
    const response = yield call(getPositionQualificationStandard, positionId)
    yield put(fetchPositionQualificationStandardsSuccess(response))
  } catch (error) {
    yield put(fetchPositionQualificationStandardsFail(error))
  }
}

function* updatePositionQualificationStandards({ payload: { positionId, updatedQualificationStandards } }) {
  try {
    const response = yield call(putPositionQualificationStandard, positionId, updatedQualificationStandards)
    yield put(updatePositionQualificationStandardsSuccess(response))
  } catch (error) {
    yield put(updatePositionQualificationStandardsFail(error))
  }
}

function* qualificationStandardsSaga() {
  yield takeEvery(
    GET_QUALIFICATION_STANDARDS_LIST,
    fetchQualificationStandardsList
  )
  yield takeEvery(
    GET_POSITION_QUALIFICATION_STANDARDS,
    fetchPositionQualificationStandards
  )
  yield takeEvery(
    PUT_POSITION_QUALIFICATION_STANDARDS,
    updatePositionQualificationStandards
  )
}

export default qualificationStandardsSaga
