import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import * as mockData from "common/data/index"
import {
  getCoreModels,
  getFunctionalModels,
  getCrossCuttingModels,
  getManagerialModels,
  getProficiencyKeyActions,
  putCompetencyDetails,
} from 'helpers/backend_helper'
import {
  fetchCoreCompetenciesSuccess,
  fetchCoreCompetenciesFail,
  fetchFunctionalCompetenciesSuccess,
  fetchFunctionalCompetenciesFail,
  fetchCrossCuttingCompetenciesSuccess,
  fetchCrossCuttingCompetenciesFail,
  fetchManagerialCompetenciesSuccess,
  fetchManagerialCompetenciesFail,
  fetchProficiencyKeyActionsSuccess,
  fetchProficiencyKeyActionsFail,
  updateCompetencyDetailsSuccess,
  updateCompetencyDetailsFail,
} from './actions'
import {
  GET_CORE_COMPETENCIES,
  GET_FUNCTIONAL_COMPETENCIES,
  GET_CROSSCUTTING_COMPETENCIES,
  GET_MANAGERIAL_COMPETENCIES,
  GET_PROFICIENCY_KEY_ACTIONS,
  PUT_COMPETENCY_DETAILS,
} from './actionTypes'

function* fetchCoreCompetencies() {
  try {
    const response = yield call(getCoreModels)
    yield put(fetchCoreCompetenciesSuccess(response))

    // yield put(fetchCoreCompetenciesSuccess(mockData.coreModels))
  } catch (error) {
    yield put(fetchCoreCompetenciesFail(error))
  }
}

function* fetchFunctionalCompetencies() {
  try {
    const response = yield call(getFunctionalModels)
    yield put(fetchFunctionalCompetenciesSuccess(response))

    // yield put(fetchFunctionalCompetenciesSuccess(mockData.funcionalModels))
  } catch (error) {
    yield put(fetchFunctionalCompetenciesFail(error))
  }
}

function* fetchCrossCuttingCompetencies() {
  try {
    const response = yield call(getCrossCuttingModels)
    yield put(fetchCrossCuttingCompetenciesSuccess(response))

    // yield put(fetchCrossCuttingCompetenciesSuccess(mockData.crossCuttingModels))
  } catch (error) {
    yield put(fetchCrossCuttingCompetenciesFail(error))
  }
}

function* fetchManagerialCompetencies() {
  try {
    const response = yield call(getManagerialModels)
    yield put(fetchManagerialCompetenciesSuccess(response))

    // yield put(fetchManagerialCompetenciesSuccess(mockData.managerialModels))
  } catch (error) {
    yield put(fetchManagerialCompetenciesFail(error))
  }
}

function* fetchProficiencyKeyActions({ payload: competencyId }) {
  try {
    const response = yield call(getProficiencyKeyActions, competencyId)
    yield put(fetchProficiencyKeyActionsSuccess(response))

    // const filtered = mockData.allCompetencyModels.filter((model) => model.competencyId === parseInt(competencyId))
    // yield put(fetchSingleCompetencyModelSuccess(filtered[0]))
  } catch (error) {
    yield put(fetchProficiencyKeyActionsFail(error))
  }
}

// saga for updateCompetencyDetails
function* updateCompetencyDetails({ payload: competencyDetails }) {
  try {
    const response = yield call(updateCompetencyDetails, competencyDetails)
    yield put(updateCompetencyDetailsSuccess(response))
  } catch (error) {
    yield put(updateCompetencyDetailsFail(error))
  }
}

function* competencyModelSaga() {
  yield takeEvery(GET_CORE_COMPETENCIES, fetchCoreCompetencies)
  yield takeEvery(GET_FUNCTIONAL_COMPETENCIES, fetchFunctionalCompetencies)
  yield takeEvery(GET_CROSSCUTTING_COMPETENCIES, fetchCrossCuttingCompetencies)
  yield takeEvery(GET_MANAGERIAL_COMPETENCIES, fetchManagerialCompetencies)
  yield takeEvery(GET_PROFICIENCY_KEY_ACTIONS, fetchProficiencyKeyActions)

  //
  yield takeEvery(PUT_COMPETENCY_DETAILS, updateCompetencyDetails)
}

export default competencyModelSaga
