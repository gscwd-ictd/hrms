import {
  GET_JOB_DESCRIPTION,
  GET_JOB_DESCRIPTION_SUCCESS,
  UPDATE_JOB_DESCRIPTION,
  UPDATE_JOB_DESCRIPTION_SUCCESS,
  JOB_DESCRIPTION_API_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    get: {
      positionId: "",
      itemNumber: "",
      positionTitle: "",
      salaryGrade: 0,
      stepIncrement: 0,
      actualSalary: 0,
      natureOfAppointment: "",
      summary: "",
      description: "",
      reportsTo: "",
      assignedTo: {
        office: "",
        department: "",
        division: "",
      },
    },
    patch: {},
  },
  loading: {
    loadingJobDescription: false,
  },
  error: {
    errorJobDescription: null,
  },
}

const jobDescription = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_JOB_DESCRIPTION:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            positionId: "",
            itemNumber: "",
            positionTitle: "",
            salaryGrade: 0,
            stepIncrement: 0,
            actualSalary: 0,
            natureOfAppointment: "",
            summary: "",
            description: "",
            reportsTo: "",
            assignedTo: {
              ...state.response.get.assignedTo,
              office: "",
              department: "",
              division: "",
            },
          },
        },
        loading: {
          ...state.loading,
          loadingJobDescription: true,
        },
        error: {
          ...state.error,
          errorJobDescription: null,
        },
      }
    case GET_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            positionId: action.payload.positionId,
            itemNumber: action.payload.itemNumber,
            positionTitle: action.payload.positionTitle,
            salaryGrade: action.payload.salaryGrade,
            stepIncrement: action.payload.stepIncrement,
            actualSalary: action.payload.actualSalary,
            natureOfAppointment: action.payload.natureOfAppointment,
            summary: action.payload.summary,
            description: action.payload.description,
            reportsTo: action.payload.reportsTo,
            assignedTo: {
              ...state.response.get.assignedTo,
              office: action.payload.assignedTo.office,
              department: action.payload.assignedTo.department,
              division: action.payload.assignedTo.division,
            },
          },
        },
        loading: {
          ...state.loading,
          loadingJobDescription: false,
        },
      }

    case UPDATE_JOB_DESCRIPTION:
      return {
        ...state,
        response: {
          ...state.response,
          patch: {},
        },
        loading: {
          ...state.loading,
          loadingJobDescription: true,
        },
        error: {
          ...state.error,
          errorJobDescription: null,
        },
      }
    case UPDATE_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          patch: action.payload,
        },
        loading: {
          ...state.loading,
          loadingJobDescription: false,
        },
      }

    case JOB_DESCRIPTION_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingJobDescription: false,
        },
        error: {
          ...state.error,
          errorJobDescription: action.payload,
        },
      }
    default:
      return state
  }
}

export default jobDescription
