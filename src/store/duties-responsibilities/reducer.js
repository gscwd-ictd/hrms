import {
  POST_DUTY,
  POST_DUTY_SUCCESS,
  PUT_DUTY,
  PUT_DUTY_SUCCESS,
  DELETE_DUTY,
  DELETE_DUTY_SUCCESS,
  GET_DUTIES,
  GET_DUTIES_SUCCESS,
  DUTY_API_FAIL,
  GET_OCCUPATION_DUTIES,
  GET_OCCUPATION_DUTIES_SUCCESS,
  GET_OCCUPATION_DUTIES_FAIL,
  ASSIGN_OCCUPATION_DUTIES,
  ASSIGN_OCCUPATION_DUTIES_SUCCESS,
  ASSIGN_OCCUPATION_DUTIES_FAIL,
  UNASSIGN_OCCUPATION_DUTIES,
  UNASSIGN_OCCUPATION_DUTIES_SUCCESS,
  UNASSIGN_OCCUPATION_DUTIES_FAIL,
  GET_AVAILABLE_DUTIES,
  GET_AVAILABLE_DUTIES_SUCCESS,
  GET_AVAILABLE_DUTIES_FAIL,
  RESET_DUTIES_RESPONSES,
  SELECT_DUTY_ROW,
  UNSELECT_DUTY_ROW,
  RESET_SELECTED_DUTY_ROWS,
  GET_POSITION_DUTIES,
  GET_POSITION_DUTIES_SUCCESS,
  GET_POSITION_DUTIES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    dutyResponsibility: {
      post: {},
      put: {},
      delete: {},
    },
    dutyResponsibilities: [], // all duty and responsibilities

    occupationDutyResponsibilities: [], // assigned duty and responsibilities of a occupation
    assignedDutyResponsibilities: [], // response after assigning duties
    unassignedDutyResponsibilities: [], // response after unassigning duties
    availableDutyResponsibilities: [], // dropdown data for  duty and responsibilities that can be assigned

    positionDutyResponsibilities: {
      positionId: "",
      summary: "",
      duties: {
        core: [],
        support: [],
      },
    },
  },
  selectedRows: [],
  loading: {
    loadingPositionDuties: false,
    loadingDutyResponsibilities: false,
    loadingOccupationDutyResponsibilities: false,
    loadingAvailableDutyResponsibilities: false,
  },
  error: {
    errorPositionDuties: null,
    errorDutyResponsibilities: null,
    errorOccupationDutyResponsibilities: null,
    errorAvailableDutyResponsibilities: null,
  },
}

const dutiesResponsibilities = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_DUTY:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            post: {},
          },
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorDutyResponsibilities: null,
        },
      }
    case POST_DUTY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            post: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: false,
        },
      }

    case PUT_DUTY:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            put: {},
          },
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorDutyResponsibilities: null,
        },
      }
    case PUT_DUTY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            put: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: false,
        },
      }

    case DELETE_DUTY:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            delete: {},
          },
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorDutyResponsibilities: null,
        },
      }
    case DELETE_DUTY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            delete: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: false,
        },
      }

    case GET_DUTIES:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibilities: [],
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorDutyResponsibilities: null,
        },
      }
    case GET_DUTIES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibilities: action.payload,
        },
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: false,
        },
      }

    case DUTY_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingDutyResponsibilities: false,
        },
        error: {
          ...state.error,
          errorDutyResponsibilities: action.payload,
        },
      }

    case GET_OCCUPATION_DUTIES:
      return {
        ...state,
        response: {
          ...state.response,
          occupationDutyResponsibilities: [],
        },
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorOccupationDutyResponsibilities: null,
        },
      }
    case GET_OCCUPATION_DUTIES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          occupationDutyResponsibilities: action.payload,
        },
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: false,
        },
      }
    case GET_OCCUPATION_DUTIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: false,
        },
        error: {
          ...state.error,
          errorOccupationDutyResponsibilities: action.payload,
        },
      }

    case ASSIGN_OCCUPATION_DUTIES:
      return {
        ...state,
        response: {
          ...state.response,
          assignedDutyResponsibilities: [],
        },
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorOccupationDutyResponsibilities: null,
        },
      }
    case ASSIGN_OCCUPATION_DUTIES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          assignedDutyResponsibilities: action.payload,
        },
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: false,
        },
      }
    case ASSIGN_OCCUPATION_DUTIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: false,
        },
        error: {
          ...state.error,
          errorOccupationDutyResponsibilities: action.payload,
        },
      }

    case UNASSIGN_OCCUPATION_DUTIES:
      return {
        ...state,
        response: {
          ...state.response,
          unassignedDutyResponsibilities: [],
        },
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorOccupationDutyResponsibilities: null,
        },
      }
    case UNASSIGN_OCCUPATION_DUTIES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          unassignedDutyResponsibilities: action.payload,
        },
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: false,
        },
      }
    case UNASSIGN_OCCUPATION_DUTIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOccupationDutyResponsibilities: false,
        },
        error: {
          ...state.error,
          errorOccupationDutyResponsibilities: action.payload,
        },
      }

    case GET_AVAILABLE_DUTIES:
      return {
        ...state,
        response: {
          ...state.response,
          availableDutyResponsibilities: [],
        },
        loading: {
          ...state.loading,
          loadingAvailableDutyResponsibilities: true,
        },
        error: {
          ...state.error,
          errorAvailableDutyResponsibilities: null,
        },
      }
    case GET_AVAILABLE_DUTIES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          availableDutyResponsibilities: action.payload,
        },
        loading: {
          ...state.loading,
          loadingAvailableDutyResponsibilities: false,
        },
      }
    case GET_AVAILABLE_DUTIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAvailableDutyResponsibilities: false,
        },
        error: {
          ...state.error,
          errorAvailableDutyResponsibilities: action.payload,
        },
      }

    case RESET_DUTIES_RESPONSES:
      return {
        ...state,
        response: {
          ...state.response,
          dutyResponsibility: {
            ...state.response.dutyResponsibility,
            post: {},
            put: {},
            delete: {},
          },
          assignedDutyResponsibilities: [],
          unassignedDutyResponsibilities: [],
        },
      }

    case SELECT_DUTY_ROW:
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      }
    case UNSELECT_DUTY_ROW:
      return {
        ...state,
        selectedRows: [
          ...state.selectedRows.filter(
            filteredId => filteredId !== action.payload
          ),
        ],
      }
    case RESET_SELECTED_DUTY_ROWS:
      return {
        ...state,
        selectedRows: [],
      }

    case GET_POSITION_DUTIES:
      return {
        ...state,
        response: {
          ...state.response,
          positionDutyResponsibilities: {
            ...state.response.positionDutyResponsibilities,
            positionId: "",
            summary: "",
            duties: {
              ...state.response.positionDutyResponsibilities.duties,
              core: [],
              support: [],
            },
          },
        },
        loading: {
          ...state.loading,
          loadingPositionDuties: true,
        },
        error: {
          ...state.error,
          errorPositionDuties: null,
        },
      }
    case GET_POSITION_DUTIES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          positionDutyResponsibilities: {
            ...state.response.positionDutyResponsibilities,
            positionId: action.payload.positionId,
            summary: action.payload.summary,
            duties: {
              ...state.response.positionDutyResponsibilities.duties,
              core: action.payload.duties.core,
              support: action.payload.duties.support,
            },
          },
        },
        loading: {
          ...state.loading,
          loadingPositionDuties: false,
        },
      }
    case GET_POSITION_DUTIES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionDuties: false,
        },
        error: {
          ...state.error,
          errorPositionDuties: action.payload,
        },
      }
    default:
      return state
  }
}

export default dutiesResponsibilities
