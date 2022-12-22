import {
  POST_SEND_OTP,
  POST_SEND_OTP_SUCCESS,
  POST_SEND_OTP_FAIL,
  POST_VERIFY_OTP, 
  POST_VERIFY_OTP_SUCCESS, 
  POST_VERIFY_OTP_FAIL,
} from "./actionTypes"

export const requestOtp = uuid => {
  return{
    type: POST_SEND_OTP,
    payload: uuid
  }
}

export const sendOtpSuccess = otpToken => {
  return {
    type: POST_SEND_OTP_SUCCESS,
    payload: otpToken,
  }
  
}

export const sendOtpFail = error => {
  return{
    type:POST_SEND_OTP_FAIL,
    payload: error,
  }
}

export const verifyOtp = verification => {
  return{
    type: POST_VERIFY_OTP,
    payload: verification
  }
}

export const verifyOtpSuccess = verificationStatus => {
  return {
    type: POST_VERIFY_OTP_SUCCESS,
    payload: verificationStatus,
  }
}

export const verifyOtpFail = error => {
  return{
    type:POST_VERIFY_OTP_FAIL,
    payload: error,
  }
}
