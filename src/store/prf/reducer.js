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

const INIT_STATE_PRFL = {
  prflist: [],
  publicationPositions: [],
  prfDetails: {
    _id: '',
    prfNo: '',
    withExam: 0,
    status: '',
    dateRequested: '',
    dateNeeded: '',
    disapprovedRemarks: '',
    for: {},
    from: {},
    prfPositions: [],
  },
  prfTrail: {
    division: {},
    department: {},
    agm: {},
    admin: {},
    gm: {},
  },
  loading: {
    loadingPrf: false,
    loadingPrfTrail: false,
    loadingPublicationPositions: false,
  },
  error: {
    errorPrf: null,
    errorPrfTrail: null,
    errorPublicationPositions: null,
  },
}

const positionRequest = (state = INIT_STATE_PRFL, action) => {
  switch (action.type) {
    case GET_PRFLIST:
      state = {
        ...state,
        prflist: [],
        loading: {
          ...state.loading,
          loadingPrf: true,
        },
        error: {
          ...state.error,
          errorPrf: null,
        },
      }
      break
    case GET_PRFLIST_SUCCESS:
      state = {
        ...state,
        prflist: action.payload,
        loading: {
          ...state.loading,
          loadingPrf: false,
        },
      }
      break
    case GET_PRFLIST_FAIL:
      state = {
        ...state,
        loading: {
          ...state.loading,
          loadingPrf: false,
        },
        error: {
          ...state.error,
          errorPrf: action.payload,
        },
      }
      break

    // case GET_APPROVED_PRFLIST:
    //   state = {
    //     ...state,
    //     prflist: [],
    //     loading: {
    //       ...state.loading,
    //       loadingPrf: true,
    //     },
    //     error: {
    //       ...state.error,
    //       errorPrf: null,
    //     },
    //   }
    //   break
    // case GET_APPROVED_PRFLIST_SUCCESS:
    //   state = {
    //     ...state,
    //     prflist: action.payload,
    //     loading: {
    //       ...state.loading,
    //       loadingPrf: false,
    //     },
    //   }
    //   break
    // case GET_APPROVED_PRFLIST_FAIL:
    //   state = {
    //     ...state,
    //     loading: {
    //       ...state.loading,
    //       loadingPrf: false,
    //     },
    //     error: {
    //       ...state.error,
    //       errorPrf: action.payload,
    //     },
    //   }
    //   break

    case GET_APPROVED_PUBLICATION_POSITIONS:
      state = {
        ...state,
        publicationPositions: [],
        loading: {
          ...state.loading,
          loadingPublicationPositions: true,
        },
        error: {
          ...state.error,
          errorPublicationPositions: null,
        },
      }
      break
    case GET_APPROVED_PUBLICATION_POSITIONS_SUCCESS:
      state = {
        ...state,
        publicationPositions: action.payload,
        loading: {
          ...state.loading,
          loadingPublicationPositions: false,
        },
      }
      break
    case GET_APPROVED_PUBLICATION_POSITIONS_FAIL:
      state = {
        ...state,
        loading: {
          ...state.loading,
          loadingPublicationPositions: false,
        },
        error: {
          ...state.error,
          errorPublicationPositions: action.payload,
        },
      }
      break

    case GET_SINGLE_PRF:
      state = {
        ...state,
        prfDetails: {
          ...state.prfDetails,
          _id: '',
          prfNo: '',
          withExam: 0,
          status: '',
          dateRequested: '',
          dateNeeded: '',
          disapprovedRemarks: '',
          for: {},
          from: {},
          prfPositions: [],
        },
        loading: {
          ...state.loading,
          loadingPrf: true,
        },
        error: {
          ...state.error,
          errorPrf: null,
        },
      }
      break
    case GET_SINGLE_PRF_SUCCESS:
      state = {
        ...state,
        prfDetails: {
          ...state.prfDetails,
          _id: action.payload._id,
          prfNo: action.payload.prfNo,
          withExam: action.payload.withExam,
          status: action.payload.status,
          dateRequested: action.payload.dateRequested,
          dateNeeded: action.payload.dateNeeded,
          disapprovedRemarks: action.payload.disapprovedRemarks,
          for: action.payload.for,
          from: action.payload.from,
          prfPositions: action.payload.prfPositions,
        },
        loading: {
          ...state.loading,
          loadingPrf: false,
        },
      }
      break
    case GET_SINGLE_PRF_FAIL:
      state = {
        ...state,
        loading: {
          ...state.loading,
          loadingPrf: true,
        },
        error: {
          ...state.error,
          errorPrf: action.payload,
        },
      }
      break

    case GET_PRF_TRAIL:
      state = {
        ...state,
        prfTrail: {
          ...state.prfTrail,
          division: {},
          department: {},
          agm: {},
          admin: {},
          gm: {},
        },
        loading: {
          ...state.loading,
          loadingPrfTrail: true,
        },
        error: {
          ...state.error,
          errorPrfTrail: null,
        },
      }
      break
    case GET_PRF_TRAIL_SUCCESS:
      state = {
        ...state,
        prfTrail: {
          ...state.prfTrail,
          division: action.payload.division,
          department: action.payload.department,
          agm: action.payload.agm,
          admin: action.payload.admin,
          gm: action.payload.gm,
        },
        loading: {
          ...state.loading,
          loadingPrfTrail: false,
        },
      }
      break
    case GET_PRF_TRAIL_FAIL:
      state = {
        ...state,
        loading: {
          ...state.loading,
          loadingPrfTrail: false,
        },
        error: {
          ...state.error,
          errorPrfTrail: action.payload,
        },
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default positionRequest
