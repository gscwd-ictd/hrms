import { call, put, takeEvery } from "redux-saga/effects"
import {
  getPositionCompetencyProficiencyLevels,
  getPositionFunctionalCompetenciesProficiencyLevels,
  getPositionCompetencyPool,
  postFunctionalCompetenciesOfPosition,
  delFunctionalCompetenciesOfPosition,
  patchPositionCompetencyProficiencyLevels,
} from "helpers/backend_helper"
import {
  fetchCompetencyProficiencyLevelsSuccess,
  fetchCompetencyProficiencyLevelsFail,
  fetchPositionFunctionalCompetenciesSuccess,
  fetchPositionFunctionalCompetenciesFail,
  fetchAvailableFunctionalCompetenciesSuccess,
  fetchAvailableFunctionalCompetenciesFail,
  updateFunctionalCompetenciesOfPositionSuccess,
  updateFunctionalCompetenciesOfPositionFail,
  removeFunctionalCompetenciesOfPositionSuccess,
  removeFunctionalCompetenciesOfPositionFail,
  updatePositionCompetencyProficiencyLevelsSuccess,
  updatePositionCompetencyProficiencyLevelsFail,
} from "./actions"
import {
  GET_COMPETENCY_PROFICIENCY_LEVELS,
  GET_POSITION_FUNCTIONAL_COMPETENCIES,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION,
  UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION,
  UPDATE_POSITION_PROFICIENCY_LEVELS,
} from "./actionTypes"

function* fetchCompetencyProficiencyLevels({ payload: positionId }) {
  try {
    const response = yield call(
      getPositionCompetencyProficiencyLevels,
      positionId
    )

    yield put(fetchCompetencyProficiencyLevelsSuccess(response))

    // const filtered = mockData.positionCompetencies.filter((positionCompetency) => positionCompetency.positionId === parseInt(positionId))
    // yield put(fetchPositionCompetenciesSuccess(filtered[0]))
  } catch (error) {
    yield put(fetchCompetencyProficiencyLevelsFail(error))
  }
}

function* updatePositionCompetencyProficiencyLevels({
  payload: proficiencyLevels,
}) {
  try {
    const response = yield call(
      patchPositionCompetencyProficiencyLevels,
      proficiencyLevels
    )

    yield put(updatePositionCompetencyProficiencyLevelsSuccess(response))
  } catch (error) {
    yield put(updatePositionCompetencyProficiencyLevelsFail(error))
  }
}

function* fetchPositionFunctionalCompetencies({ payload: positionId }) {
  try {
    const response = yield call(
      getPositionFunctionalCompetenciesProficiencyLevels,
      positionId
    )

    yield put(fetchPositionFunctionalCompetenciesSuccess(response))
  } catch (error) {
    yield put(fetchPositionFunctionalCompetenciesFail)
  }
}

function* fetchAvailableFunctionalCompetencies({ payload: positionId }) {
  try {
    const response = yield call(getPositionCompetencyPool, positionId)

    yield put(fetchAvailableFunctionalCompetenciesSuccess(response))
  } catch (error) {
    yield put(fetchAvailableFunctionalCompetenciesFail)
  }
}

function* updateFunctionalCompetenciesOfPosition({
  payload: { positionId, selectedFunctionalCompetencies },
}) {
  try {
    const response = yield call(
      postFunctionalCompetenciesOfPosition,
      positionId,
      selectedFunctionalCompetencies
    )

    yield put(updateFunctionalCompetenciesOfPositionSuccess(response))
  } catch (error) {
    yield put(updateFunctionalCompetenciesOfPositionFail(error))
  }
}
function* removeFunctionalCompetenciesOfPosition({
  payload: selectedFunctionalCompetencies,
}) {
  try {
    const response = yield call(delFunctionalCompetenciesOfPosition, {
      data: selectedFunctionalCompetencies,
    })

    yield put(removeFunctionalCompetenciesOfPositionSuccess(response))
  } catch (error) {
    yield put(removeFunctionalCompetenciesOfPositionFail(error))
  }
}

function* positionCompetencySaga() {
  yield takeEvery(
    GET_COMPETENCY_PROFICIENCY_LEVELS,
    fetchCompetencyProficiencyLevels
  )
  yield takeEvery(
    UPDATE_POSITION_PROFICIENCY_LEVELS,
    updatePositionCompetencyProficiencyLevels
  )

  yield takeEvery(
    GET_POSITION_FUNCTIONAL_COMPETENCIES,
    fetchPositionFunctionalCompetencies
  )
  yield takeEvery(
    GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
    fetchAvailableFunctionalCompetencies
  )
  yield takeEvery(
    ASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION,
    updateFunctionalCompetenciesOfPosition
  )
  yield takeEvery(
    UNASSIGN_FUNCTIONAL_COMPETENCIES_OF_POSITION,
    removeFunctionalCompetenciesOfPosition
  )
}

export default positionCompetencySaga
