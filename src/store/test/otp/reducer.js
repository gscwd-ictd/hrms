import {
  POST_SEND_OTP,
  POST_SEND_OTP_SUCCESS,
  POST_SEND_OTP_FAIL,
  POST_VERIFY_OTP, 
  POST_VERIFY_OTP_SUCCESS, 
  POST_VERIFY_OTP_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  otpToken: {},
  verification: {},
  isLoading: false,
  error: null,
  verifyOtpResponse: '',
}

const otpService = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_SEND_OTP:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case POST_SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpToken: action.payload,
      }
    case POST_SEND_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case POST_VERIFY_OTP:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case POST_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verifyOtpResponse: action.payload.message,
      }
    case POST_VERIFY_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default otpService
