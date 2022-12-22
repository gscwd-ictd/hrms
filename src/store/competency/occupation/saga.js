import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import {
  getCompetenciesOfOccupation,
  getAvailableFunctionalCompetencies,
  postCompetenciesForOccupation,
  delCompetenciesForOccupation,
} from "helpers/backend_helper"
import {
  fetchOGCompetenciesSuccess,
  fetchOGCompetenciesFail,
  fetchAvailableFuncCompetenciesSuccess,
  fetchAvailableFuncCompetenciesFail,
  updateCompetenciesOfOccupationSuccess,
  updateCompetenciesOfOccupationFail,
  removeCompetenciesOfOccupationSuccess,
  removeCompetenciesOfOccupationFail,
} from "./actions"
import {
  GET_OCCUPATIONAL_GROUP_COMPETENCIES,
  GET_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  ASSIGN_COMPETENCIES_TO_OCCUPATION,
  UNASSIGN_COMPETENCIES_TO_OCCUPATION,
} from "./actionTypes"

function* fetchOGCompetencies({ payload: occupationId }) {
  try {
    const response = yield call(getCompetenciesOfOccupation, occupationId)
    yield put(fetchOGCompetenciesSuccess(response))
  } catch (error) {
    yield put(fetchOGCompetenciesFail(error))
  }
}

function* fetchAvailableFuncCompetencies({ payload: occupationId }) {
  try {
    const response = yield call(
      getAvailableFunctionalCompetencies,
      occupationId
    )
    yield put(fetchAvailableFuncCompetenciesSuccess(response))
  } catch (error) {
    yield put(fetchAvailableFuncCompetenciesFail(error))
  }
}

function* updateOccupationCompetencies({
  payload: { occupationId, selectedCompetencies },
}) {
  try {
    const response = yield call(
      postCompetenciesForOccupation,
      occupationId,
      selectedCompetencies
    )
    yield put(updateCompetenciesOfOccupationSuccess(response))
  } catch (error) {
    yield put(updateCompetenciesOfOccupationFail(error))
  }
}

function* removeOccupationCompetencies({
  payload: { occupationId, selectedCompetencies },
}) {
  try {
    const response = yield call(delCompetenciesForOccupation, occupationId, {
      data: selectedCompetencies,
    })
    yield put(removeCompetenciesOfOccupationSuccess(response))
  } catch (error) {
    yield put(removeCompetenciesOfOccupationFail(error))
  }
}

function* occupationalGroupCompetencySaga() {
  yield takeEvery(GET_OCCUPATIONAL_GROUP_COMPETENCIES, fetchOGCompetencies)
  yield takeEvery(
    GET_AVAILABLE_FUNCTIONAL_COMPETENCIES,
    fetchAvailableFuncCompetencies
  )
  yield takeEvery(
    ASSIGN_COMPETENCIES_TO_OCCUPATION,
    updateOccupationCompetencies
  )
  yield takeEvery(
    UNASSIGN_COMPETENCIES_TO_OCCUPATION,
    removeOccupationCompetencies
  )
}

export default occupationalGroupCompetencySaga
