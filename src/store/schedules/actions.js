import {
  GET_SCHEDULES,
  GET_SCHEDULES_SUCCESS,
  GET_SCHEDULES_FAILED,
} from './actionTypes'

// Get list of schedules
export const fetchSchedules = () => {
  return {
    type: GET_SCHEDULES,
  }
}
export const fetchSchedulesSuccess = schedules => {
  return {
    type: GET_SCHEDULES_SUCCESS,
    payload: schedules,
  }
}
export const fetchSchedulesFailed = error => {
  return {
    type: GET_SCHEDULES_FAILED,
    payload: error,
  }
}
