import { call, put, takeEvery } from 'redux-saga/effects'
import { getEmployeeTrainings } from 'helpers/backend_helper'
import {
  fetchEmployeeTrainingsSuccess,
  fetchEmployeeTrainingsFail,
} from './actions'
import { GET_EMPLOYEE_TRAININGS } from './actionTypes'

function* fetchEmployeeTrainings({ payload: employeeId }) {
  try {
    const response = yield call(getEmployeeTrainings, employeeId)

    yield put(fetchEmployeeTrainingsSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchEmployeeTrainingsFail(message))
  }
}

function* learningDevelopmentSaga() {
  yield takeEvery(GET_EMPLOYEE_TRAININGS, fetchEmployeeTrainings)
}

export default learningDevelopmentSaga
