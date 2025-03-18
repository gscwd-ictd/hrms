import {
  GET_EMPLOYEE_TRAININGS,
  GET_EMPLOYEE_TRAININGS_SUCCESS,
  GET_EMPLOYEE_TRAININGS_FAIL,
} from './actionTypes'

const INIT_STATE = {
  employeeTrainings: [],
  isLoading: false,
  error: null,
}

const learningDevelopment = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_TRAININGS:
      state = {
        ...state,
        employeeTrainings: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_EMPLOYEE_TRAININGS_SUCCESS:
      state = {
        ...state,
        employeeTrainings: action.payload,
        isLoading: false,
      }
      break
    case GET_EMPLOYEE_TRAININGS_FAIL:
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

export default learningDevelopment
