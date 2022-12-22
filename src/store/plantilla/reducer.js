import {
  GET_PLANTILLA,
  GET_PLANTILLA_SUCCESS,
  GET_PLANTILLA_POSITION,
  GET_PLANTILLA_POSITION_SUCCESS,
  RESET_PLANTILLA_POSITION,
  GET_PLANTILLA_POSITIONS,
  GET_PLANTILLA_POSITIONS_SUCCESS,
  SUBMIT_POSITION,
  SUBMIT_POSITION_SUCCESS,
  PLANTILLA_API_ERROR,
} from "./actionTypes"

const INIT_STATE = {
  list: [],
  positionData: [], // response to submitting new plantilla position
  plantillaPosition: [],
  plantillaPositions: [], // data for multi-select dropdown
  isLoading: false,
  error: null,
}

const plantilla = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PLANTILLA:
      state = {
        ...state,
        list: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_PLANTILLA_SUCCESS:
      state = {
        ...state,
        list: action.payload,
        isLoading: false,
      }
      break

    case SUBMIT_POSITION:
      state = {
        ...state,
        positionData: [],
        isLoading: true,
        error: null,
      }
      break
    case SUBMIT_POSITION_SUCCESS:
      state = {
        ...state,
        positionData: action.payload,
        isLoading: false,
      }
      break

    case GET_PLANTILLA_POSITION:
      state = {
        ...state,
        plantillaPosition: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_PLANTILLA_POSITION_SUCCESS:
      state = {
        ...state,
        plantillaPosition: action.payload,
        isLoading: false,
      }
      break

    case GET_PLANTILLA_POSITIONS:
      state = {
        ...state,
        plantillaPositions: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_PLANTILLA_POSITIONS_SUCCESS:
      state = {
        ...state,
        plantillaPositions: action.payload,
        isLoading: false,
      }
      break

    case RESET_PLANTILLA_POSITION:
      state = {
        ...state,
        plantillaPosition: [],
      }
      break

    case PLANTILLA_API_ERROR:
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

export default plantilla
