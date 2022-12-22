import {
  GET_JOB_DESCRIPTION,
  GET_JOB_DESCRIPTION_SUCCESS,
  UPDATE_JOB_DESCRIPTION,
  UPDATE_JOB_DESCRIPTION_SUCCESS,
  JOB_DESCRIPTION_API_FAIL,
} from "./actionTypes"

// Get position job description details
export const fetchJobDescription = positionId => ({
  type: GET_JOB_DESCRIPTION,
  payload: positionId,
})
export const fetchJobDescriptionSuccess = jobDescription => ({
  type: GET_JOB_DESCRIPTION_SUCCESS,
  payload: jobDescription,
})

// Update position job description details
export const updateJobDescription = (
  positionId,
  updatedJobDescription
) => ({
  type: UPDATE_JOB_DESCRIPTION,
  payload: { positionId, updatedJobDescription },
})
export const updateJobDescriptionSuccess = updatedJobDescription => ({
  type: UPDATE_JOB_DESCRIPTION_SUCCESS,
  payload: updatedJobDescription,
})

export const jobDescriptionApiFail = error => ({
  type: JOB_DESCRIPTION_API_FAIL,
  payload: error,
})
