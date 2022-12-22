import { call, put, takeEvery } from "redux-saga/effects"
import * as mockData from "../../../common/data/index"
import {
  getDivisionList,
  postDivision,
  putDivision,
  delDivision,
} from "helpers/backend_helper"
import {
  divisionApiFail,
  getDivisionsSuccess,
  postDivisionSuccess,
  updateDivisionSuccess,
  deleteDivisionSuccess,
} from "./actions"
import {
  GET_DIVISIONS,
  POST_DIVISION,
  PUT_DIVISION,
  DELETE_DIVISION,
} from "./actionTypes"

function* fetchDivisionList() {
  try {
    const response = yield call(getDivisionList)
    yield put(getDivisionsSuccess(response))

    // yield put(getDivisionsSuccess(mockData.divisions))
  } catch (error) {
    yield put(divisionApiFail(error))
  }
}

function* addDivision({ payload: divisionData }) {
  try {
    const response = yield call(postDivision, divisionData)
    yield put(postDivisionSuccess(response))
  } catch (error) {
    yield put(divisionApiFail(error))
  }
}

function* updateDivision({ payload: { divisionId, divisionData } }) {
  try {
    const response = yield call(putDivision, divisionId, divisionData)
    yield put(updateDivisionSuccess(response))
  } catch (error) {
    yield put(divisionApiFail(error))
  }
}

function* deleteDivision({ payload: divisionId }) {
  try {
    const response = yield call(delDivision, divisionId)
    yield put(deleteDivisionSuccess(response))
  } catch (error) {
    yield put(divisionApiFail(error))
  }
}

function* divisionsSaga() {
  yield takeEvery(GET_DIVISIONS, fetchDivisionList)
  yield takeEvery(POST_DIVISION, addDivision)
  yield takeEvery(PUT_DIVISION, updateDivision)
  yield takeEvery(DELETE_DIVISION, deleteDivision)
}

export default divisionsSaga
