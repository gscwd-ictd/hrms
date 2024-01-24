import { call, put, takeEvery } from "redux-saga/effects"
import {
  getSalaryGradeList,
  getPreviousSalaryGradeList,
  getCurrentSalaryGradeList,
  putSalaryGradeList,
  postSalaryGradeList,
  getSalaryGradeWithStepIncrement,
  getSalaryGradeWithStepIncrementOne,
} from 'helpers/backend_helper'
import {
  fetchSalaryGradeListSuccess,
  fetchPreviousSalaryGradeListSuccess,
  fetchCurrentSalaryGradeListSuccess,
  updateSalaryGradeListSuccess,
  addSalaryGradeListSuccess,
  salaryGradeApiFail,
  previousSalaryGradeApiFail,
  currentSalaryGradeApiFail,
  fetchSGListStepIncreOneSuccess,
  fetchSGListStepIncreOneFail,
  fetchSGListStepIncrementSuccess,
  fetchSGListStepIncrementFail,
} from './actions'
import {
  GET_SALARY_GRADE_LIST,
  GET_PREVIOUS_SALARY_GRADE_LIST,
  GET_CURRENT_SALARY_GRADE_LIST,
  PUT_SALARY_GRADE_LIST,
  POST_SALARY_GRADE_LIST,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE,
} from './actionTypes'

function* fetchSalaryGradeList() {
  try {
    const response = yield call(getSalaryGradeList)
    yield put(fetchSalaryGradeListSuccess(response))
  } catch (error) {
    yield put(salaryGradeApiFail(error))
  }
}

// previous salary grade list
function* fetchPreviousSalaryGradeList() {
  try {
    const response = yield call(getPreviousSalaryGradeList)
    yield put(fetchPreviousSalaryGradeListSuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 404:
          errorMessage =
            'Sorry! some resources are missing for previous salary grade'
          break
        case 500:
          errorMessage = 'Sorry! something went wrong for previous salary grade'
          break
        case 408:
          errorMessage =
            'Request timeout for previous salary grade. Try again later'
          break
        default:
          errorMessage = 'Invalid request for previous salary grade'
          break
      }
    }
    yield put(previousSalaryGradeApiFail(errorMessage))
  }
}

// current salary grade list
function* fetchCurrentSalaryGradeList() {
  try {
    const response = yield call(getCurrentSalaryGradeList)
    yield put(fetchCurrentSalaryGradeListSuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 404:
          errorMessage =
            'Sorry! some resources are missing for current salary grade'
          break
        case 500:
          errorMessage = 'Sorry! something went wrong for current salary grade'
          break
        case 408:
          errorMessage =
            'Request timeout for current salary grade. Try again later'
          break
        default:
          errorMessage = 'Invalid request for current salary grade'
          break
      }
    }
    yield put(currentSalaryGradeApiFail(errorMessage))
  }
}

function* updateSalaryGradeList({ payload: updatedSalaryGradeList }) {
  try {
    const response = yield call(putSalaryGradeList, updatedSalaryGradeList)
    yield put(updateSalaryGradeListSuccess(response))
  } catch (error) {
    yield put(salaryGradeApiFail(error))
  }
}

function* addSalaryGradeList({ payload: addedSalaryGradeList }) {
  try {
    const response = yield call(postSalaryGradeList, addedSalaryGradeList)
    yield put(addSalaryGradeListSuccess(response))
  } catch (error) {
    yield put(salaryGradeApiFail(error))
  }
}

function* fetchSGListStepIncrement() {
  try {
    const response = yield call(getSalaryGradeWithStepIncrement)
    yield put(fetchSGListStepIncrementSuccess(response))
  } catch (error) {
    yield put(fetchSGListStepIncrementFail(error))
  }
}

function* fetchSGListStepIncreOne() {
  try {
    const response = yield call(getSalaryGradeWithStepIncrementOne)
    yield put(fetchSGListStepIncreOneSuccess(response))
  } catch (error) {
    yield put(fetchSGListStepIncreOneFail(error))
  }
}

function* salaryGradeSaga() {
  yield takeEvery(GET_SALARY_GRADE_LIST, fetchSalaryGradeList)
  yield takeEvery(GET_PREVIOUS_SALARY_GRADE_LIST, fetchPreviousSalaryGradeList)
  yield takeEvery(GET_CURRENT_SALARY_GRADE_LIST, fetchCurrentSalaryGradeList)

  yield takeEvery(PUT_SALARY_GRADE_LIST, updateSalaryGradeList)
  yield takeEvery(POST_SALARY_GRADE_LIST, addSalaryGradeList)
  yield takeEvery(
    GET_SALARY_GRADE_LIST_STEP_INCREMENT,
    fetchSGListStepIncrement
  )
  yield takeEvery(
    GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE,
    fetchSGListStepIncreOne
  )
}

export default salaryGradeSaga
