import {
  GET_PRFLIST,
  GET_PRFLIST_FAIL,
  GET_PRFLIST_SUCCESS,
  GET_APPROVED_PUBLICATION_POSITIONS,
  GET_APPROVED_PUBLICATION_POSITIONS_SUCCESS,
  GET_APPROVED_PUBLICATION_POSITIONS_FAIL,
  GET_SINGLE_PRF,
  GET_SINGLE_PRF_SUCCESS,
  GET_SINGLE_PRF_FAIL,
  GET_PRF_TRAIL,
  GET_PRF_TRAIL_SUCCESS,
  GET_PRF_TRAIL_FAIL,
} from './actionTypes'

// Get all PRF
export const getPRFList = () => ({
  type: GET_PRFLIST,
})

export const getPRFListSuccess = prflist => ({
  type: GET_PRFLIST_SUCCESS,
  payload: prflist,
})

export const getPRFListFail = error => ({
  type: GET_PRFLIST_FAIL,
  payload: error,
})

// Get all Approved PRF
// export const getApprovedPRFList = () => ({
//   type: GET_APPROVED_PRFLIST,
// })

// export const getApprovedPRFListSuccess = prflist => ({
//   type: GET_APPROVED_PRFLIST_SUCCESS,
//   payload: prflist,
// })

// export const getApprovedPRFListFail = error => ({
//   type: GET_APPROVED_PRFLIST_FAIL,
//   payload: error,
// })

// Get all approved publication positions
export const getApprovedPublicationPositions = yearFilter => ({
  type: GET_APPROVED_PUBLICATION_POSITIONS,
  payload: yearFilter,
})

export const getApprovedPublicationPositionsSuccess =
  pubilicationPositions => ({
    type: GET_APPROVED_PUBLICATION_POSITIONS_SUCCESS,
    payload: pubilicationPositions,
  })

export const getApprovedPublicationPositionsFail = error => ({
  type: GET_APPROVED_PUBLICATION_POSITIONS_FAIL,
  payload: error,
})

// Get details of a PRF
export const getSinglePRF = prfId => ({
  type: GET_SINGLE_PRF,
  payload: prfId,
})

export const getSinglePRFSuccess = prfDetails => ({
  type: GET_SINGLE_PRF_SUCCESS,
  payload: prfDetails,
})

export const getSinglePRFFail = error => ({
  type: GET_SINGLE_PRF_FAIL,
  payload: error,
})

// Get trail for a PRF
export const fetchPRFTrail = prfId => ({
  type: GET_PRF_TRAIL,
  payload: prfId,
})

export const fetchPRFTrailSuccess = prfTrail => ({
  type: GET_PRF_TRAIL_SUCCESS,
  payload: prfTrail,
})

export const fetchPRFTrailFail = error => ({
  type: GET_PRF_TRAIL_FAIL,
  payload: error,
})
