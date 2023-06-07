import { call, put, takeEvery } from 'redux-saga/effects'
import { getSchedules } from 'helpers/backend_helper'
import { fetchSchedulesSuccess, fetchSchedulesFailed } from './actions'
import { GET_SCHEDULES } from './actionTypes'

function* fetchSchedules() {
  try {
    const response = yield call(getSchedules)

    yield put(fetchSchedulesSuccess(response))
  } catch (error) {
    yield put(fetchSchedulesFailed(error))
  }
}

function* scheduleSaga() {
  yield takeEvery(GET_SCHEDULES, fetchSchedules)
}

export default scheduleSaga
