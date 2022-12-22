import { call, put, takeEvery } from "redux-saga/effects"
import {
  getPlantillaTable,
  postNewPosition,
  getPositions,
  getPosition,
} from "helpers/backend_helper"
import {
  fetchPlantillaSuccess,
  fetchPlantillaPositionSuccess,
  fetchPlantillaPositionsSelectSuccess,
  submitPositionSuccess,
  plantillaApiFail,
} from "./actions"
import {
  GET_PLANTILLA,
  SUBMIT_POSITION,
  GET_PLANTILLA_POSITION,
  GET_PLANTILLA_POSITIONS,
} from "./actionTypes"

function* fetchPlantilla() {
  try {
    const response = yield call(getPlantillaTable)
    yield put(fetchPlantillaSuccess(response))
  } catch (error) {
    yield put(plantillaApiFail(error))
  }
}

function* submitPosition({ payload: positionData }) {
  try {
    const response = yield call(postNewPosition, positionData)
    yield put(submitPositionSuccess(response))
  } catch (error) {
    yield put(plantillaApiFail(error))
  }
}

function* fetchPlantillaPosition({ payload: positionId }) {
  try {
    const response = yield call(getPosition, positionId)
    yield put(fetchPlantillaPositionSuccess(response))
  } catch (error) {
    yield put(plantillaApiFail(error))
  }
}

function* fetchPlantillaPositions() {
  try {
    const response = yield call(getPositions)
    yield put(fetchPlantillaPositionsSelectSuccess(response))
  } catch (error) {
    yield put(plantillaApiFail(error))
  }
}

function* plantillaSaga() {
  yield takeEvery(GET_PLANTILLA, fetchPlantilla)
  yield takeEvery(SUBMIT_POSITION, submitPosition)
  yield takeEvery(GET_PLANTILLA_POSITION, fetchPlantillaPosition)
  yield takeEvery(GET_PLANTILLA_POSITIONS, fetchPlantillaPositions)
}

export default plantillaSaga
