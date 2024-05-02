import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getPositionCompetencyProficiencyLevels,
  getPositionFunctionalCompetenciesProficiencyLevels,
  getPositionManagerialCompetenciesProficiencyLevels,
  getPositionCompetencyPool,
  postCompetenciesOfPosition,
  delCompetenciesOfPosition,
  patchPositionCompetencyProficiencyLevels,
} from 'helpers/backend_helper'
import {
  fetchCompetencyProficiencyLevelsSuccess,
  fetchCompetencyProficiencyLevelsFail,
  fetchPositionFunctionalCompetenciesSuccess,
  fetchPositionFunctionalCompetenciesFail,
  fetchPositionManagerialCompetenciesSuccess,
  fetchPositionManagerialCompetenciesFail,
  fetchAvailableFunctionalCompetenciesSuccess,
  fetchAvailableFunctionalCompetenciesFail,
  updateCompetenciesOfPositionSuccess,
  updateCompetenciesOfPositionFail,
  removeCompetenciesOfPositionSuccess,
  removeCompetenciesOfPositionFail,
  updatePositionCompetencyProficiencyLevelsSuccess,
  updatePositionCompetencyProficiencyLevelsFail,
} from './actions'
import {
  GET_COMPETENCY_PROFICIENCY_LEVELS,
  GET_POSITION_FUNCTIONAL_COMPETENCIES,
  GET_POSITION_MANAGERIAL_COMPETENCIES,
  GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
  ASSIGN_COMPETENCIES_OF_POSITION,
  UNASSIGN_COMPETENCIES_OF_POSITION,
  UPDATE_POSITION_PROFICIENCY_LEVELS,
} from './actionTypes'

function* fetchCompetencyProficiencyLevels({ payload: positionId }) {
  try {
    const response = yield call(
      getPositionCompetencyProficiencyLevels,
      positionId
    )

    yield put(fetchCompetencyProficiencyLevelsSuccess(response))
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

function* fetchPositionManagerialCompetencies({ payload: positionId }) {
  try {
    const response = yield call(
      getPositionManagerialCompetenciesProficiencyLevels,
      positionId
    )

    yield put(fetchPositionManagerialCompetenciesSuccess(response))
  } catch (error) {
    yield put(fetchPositionManagerialCompetenciesFail)
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

function* updateCompetenciesOfPosition({
  payload: { positionId, selectedCompetencies },
}) {
  try {
    const response = yield call(
      postCompetenciesOfPosition,
      positionId,
      selectedCompetencies
    )

    yield put(updateCompetenciesOfPositionSuccess(response))
  } catch (error) {
    yield put(updateCompetenciesOfPositionFail(error))
  }
}
function* removeCompetenciesOfPosition({ payload: selectedCompetencies }) {
  try {
    const response = yield call(delCompetenciesOfPosition, {
      data: selectedCompetencies,
    })

    yield put(removeCompetenciesOfPositionSuccess(response))
  } catch (error) {
    yield put(removeCompetenciesOfPositionFail(error))
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
    GET_POSITION_MANAGERIAL_COMPETENCIES,
    fetchPositionManagerialCompetencies
  )
  yield takeEvery(
    GET_POSITION_AVAILABLE_FUNCTIONAL_COMPETENCIES,
    fetchAvailableFunctionalCompetencies
  )
  yield takeEvery(ASSIGN_COMPETENCIES_OF_POSITION, updateCompetenciesOfPosition)
  yield takeEvery(
    UNASSIGN_COMPETENCIES_OF_POSITION,
    removeCompetenciesOfPosition
  )
}

export default positionCompetencySaga
