import {
  GET_SCHEDULES,
  GET_SCHEDULES_SUCCESS,
  GET_SCHEDULES_FAILED,
} from './actionTypes'

const INIT_STATE = {
  schedules: [],
  isLoading: false,
  error: null,
}

const schedules = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      state = {
        ...state,
        schedules: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_SCHEDULES_SUCCESS:
      state = {
        ...state,
        schedules: action.payload,
        isLoading: false,
      }
      break
    case GET_SCHEDULES_FAILED:
      state = {
        ...state,
        isLoading: false,
        error: action.payload,
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default schedules
