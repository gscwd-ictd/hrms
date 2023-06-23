import {
  GET_JOB_DESCRIPTION,
  GET_JOB_DESCRIPTION_SUCCESS,
  UPDATE_JOB_DESCRIPTION,
  UPDATE_JOB_DESCRIPTION_SUCCESS,
  JOB_DESCRIPTION_API_FAIL,
  RESET_JOB_DESCRIPTION,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    get: {
      positionId: "",
      itemNumber: "",
      positionTitle: "",
      salary: {
        id: "",
        salaryGrade: 0,
        stepIncrement: 0,
        amount: 0,
      },
      natureOfAppointment: "",
      summary: "",
      description: "",
      reportsTo: "",
      assignedTo: {
        office: {
          id: "",
          name: "",
        },
        department: {
          id: "",
          name: "",
        },
        division: {
          id: "",
          name: "",
        },
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
            salary: {
              ...state.response.get.salary,
              id: "",
              salaryGrade: 0,
              stepIncrement: 0,
              amount: 0,
            },
            natureOfAppointment: "",
            summary: "",
            description: "",
            reportsTo: "",
            assignedTo: {
              ...state.response.get.assignedTo,
              office: {
                ...state.response.get.assignedTo.office,
                id: "",
                name: "",
              },
              department: {
                ...state.response.get.assignedTo.department,
                id: "",
                name: "",
              },
              division: {
                ...state.response.get.assignedTo.division,
                id: "",
                name: "",
              },
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
            salary: {
              ...state.response.get.salary,
              id: action.payload.salary.id,
              salaryGrade: action.payload.salary.salaryGrade,
              stepIncrement: action.payload.salary.stepIncrement,
              amount: action.payload.salary.amount,
            },
            natureOfAppointment: action.payload.natureOfAppointment,
            summary: action.payload.summary,
            description: action.payload.description,
            reportsTo: action.payload.reportsTo,
            assignedTo: {
              ...state.response.get.assignedTo,
              office: {
                ...state.response.get.assignedTo.office,
                id: action.payload.assignedTo.office.id,
                name: action.payload.assignedTo.office.name,
              },
              department: {
                ...state.response.get.assignedTo.department,
                id: action.payload.assignedTo.department.id,
                name: action.payload.assignedTo.department.name,
              },
              division: {
                ...state.response.get.assignedTo.division,
                id: action.payload.assignedTo.division.id,
                name: action.payload.assignedTo.division.name,
              },
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

    case RESET_JOB_DESCRIPTION:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            positionId: "",
            itemNumber: "",
            positionTitle: "",
            salary: {
              ...state.response.get.salary,
              id: "",
              salaryGrade: 0,
              stepIncrement: 0,
              amount: 0,
            },
            natureOfAppointment: "",
            summary: "",
            description: "",
            reportsTo: "",
            assignedTo: {
              ...state.response.get.assignedTo,
              office: {
                ...state.response.get.assignedTo.office,
                id: "",
                name: "",
              },
              department: {
                ...state.response.get.assignedTo.department,
                id: "",
                name: "",
              },
              division: {
                ...state.response.get.assignedTo.division,
                id: "",
                name: "",
              },
            },
          },
          patch: {},
        },
        error: {
          errorJobDescription: null,
        },
      }

    default:
      return state
  }
}

export default jobDescription
