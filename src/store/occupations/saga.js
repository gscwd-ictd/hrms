import { call, put, takeEvery } from "redux-saga/effects"
import {
  getOccupations,
  getOccupation,
  getOccupationalGroupPositions,
  postOccupation,
  putOccupation,
  delOccupation,
  getPositionsWithoutOccupation,
  postPositionsToOccupation,
  delPositionsToOccupation,
} from "helpers/backend_helper"
import {
  fetchOccupationsSuccess,
  fetchOccupationsFail,
  fetchOccupationSuccess,
  fetchOccupationFail,
  fetchOGPositionsSuccess,
  fetchOGPositionsFail,
  addOccupationSuccess,
  addOccupationFail,
  updateOccupationSuccess,
  updateOccupationFail,
  removeOccupationSuccess,
  removeOccupationFail,
  fetchPositionsWithoutOccupationSuccess,
  fetchPositionsWithoutOccupationFail,
  updatePositionsToOccupationSuccess,
  updatePositionsToOccupationFail,
  removePositionsToOccupationSuccess,
  removePositionsToOccupationFail,
} from "./actions"
import {
  GET_OCCUPATIONS,
  GET_OCCUPATION,
  GET_OCCUPATIONAL_GROUP_POSITIONS,
  POST_OCCUPATION,
  PUT_OCCUPATION,
  DELETE_OCCUPATION,
  GET_POSITIONS_WITHOUT_OCCUPATION,
  ASSIGN_POSITIONS_TO_OCCUPATION,
  UNASSIGN_POSITIONS_TO_OCCUPATION,
} from "./actionTypes"

function* fetchOccupations() {
  try {
    const response = yield call(getOccupations)
    yield put(fetchOccupationsSuccess(response))
  } catch (error) {
    yield put(fetchOccupationsFail(error))
  }
}

function* fetchOccupation({ payload: occupationId }) {
  try {
    const response = yield call(getOccupation, occupationId)
    yield put(fetchOccupationSuccess(response))
  } catch (error) {
    yield put(fetchOccupationFail(error))
  }
}

function* addOccupation({ payload: occupation }) {
  try {
    const response = yield call(postOccupation, occupation)
    yield put(addOccupationSuccess(response))
  } catch (error) {
    yield put(addOccupationFail(error))
  }
}

function* updateOccupation({ payload: { occupationId, occupation } }) {
  try {
    const response = yield call(putOccupation, occupationId, occupation)
    yield put(updateOccupationSuccess(response))
  } catch (error) {
    yield updateOccupationFail(error)
  }
}

function* removeOccupation({ payload: occupationId }) {
  try {
    const response = yield call(delOccupation, occupationId)
    yield put(removeOccupationSuccess(response))
  } catch (error) {
    yield put(removeOccupationFail(error))
  }
}

function* fetchOccupationalGroupPositions({ payload: occupationId }) {
  try {
    const response = yield call(getOccupationalGroupPositions, occupationId)
    yield put(fetchOGPositionsSuccess(response))
  } catch (error) {
    yield put(fetchOGPositionsFail(error))
  }
}

function* fetchPositionsWithoutOccupation() {
  try {
    const response = yield call(getPositionsWithoutOccupation)
    yield put(fetchPositionsWithoutOccupationSuccess(response))
  } catch (error) {
    yield put(fetchPositionsWithoutOccupationFail(error))
  }
}

function* updateOccupationPositions({
  payload: { occupationId, selectedPositions },
}) {
  try {
    const response = yield call(
      postPositionsToOccupation,
      occupationId,
      selectedPositions
    )
    yield put(updatePositionsToOccupationSuccess(response))
  } catch (error) {
    yield put(updatePositionsToOccupationFail(error))
  }
}

function* removeOccupationPositions({
  payload: { occupationId, selectedPositions },
}) {
  try {
    const response = yield call(delPositionsToOccupation, occupationId, {
      data: selectedPositions,
    })
    yield put(removePositionsToOccupationSuccess(response))
  } catch (error) {
    if (error.response.status === 406) {
      yield put(removePositionsToOccupationFail(error.response.data.message))
    } else {
      yield put(removePositionsToOccupationFail(error))
    }
  }
}

function* occupationsSaga() {
  yield takeEvery(GET_OCCUPATIONS, fetchOccupations)
  yield takeEvery(GET_OCCUPATION, fetchOccupation)
  yield takeEvery(
    GET_OCCUPATIONAL_GROUP_POSITIONS,
    fetchOccupationalGroupPositions
  )
  yield takeEvery(POST_OCCUPATION, addOccupation)
  yield takeEvery(PUT_OCCUPATION, updateOccupation)
  yield takeEvery(DELETE_OCCUPATION, removeOccupation)
  yield takeEvery(
    GET_POSITIONS_WITHOUT_OCCUPATION,
    fetchPositionsWithoutOccupation
  )
  yield takeEvery(ASSIGN_POSITIONS_TO_OCCUPATION, updateOccupationPositions)
  yield takeEvery(UNASSIGN_POSITIONS_TO_OCCUPATION, removeOccupationPositions)
}

export default occupationsSaga
