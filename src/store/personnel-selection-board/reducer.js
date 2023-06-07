import {
  GET_ASSIGNED_PSB_MEMBERS,
  GET_ASSIGNED_PSB_MEMBERS_SUCCESS,
  GET_ASSIGNED_PSB_MEMBERS_FAIL,
  GET_UNASSIGNED_PSB_MEMBERS,
  GET_UNASSIGNED_PSB_MEMBERS_SUCCESS,
  GET_UNASSIGNED_PSB_MEMBERS_FAIL,
  GET_PSB_DETAILS,
  GET_PSB_DETAILS_SUCCESS,
  GET_PSB_DETAILS_FAIL,
  GET_PSB_SUMMARY,
  GET_PSB_SUMMARY_SUCCESS,
  GET_PSB_SUMMARY_FAIL,
  GET_SELECTED_BY_APPOINTING_AUTHORITY,
  GET_SELECTED_BY_APPOINTING_AUTHORITY_SUCCESS,
  GET_SELECTED_BY_APPOINTING_AUTHORITY_FAIL,
  GET_PSB_CBI_REPORTS_HEADER,
  GET_PSB_CBI_REPORTS_HEADER_SUCCESS,
  GET_PSB_CBI_REPORTS_HEADER_FAIL,
  GET_PSB_CBI_REPORTS,
  GET_PSB_CBI_REPORTS_SUCCESS,
  GET_PSB_CBI_REPORTS_FAIL,
  ADD_PSB_MEMBER_TO_TABLE,
  REMOVE_PSB_MEMBER_FROM_TABLE,
  RESET_PSB_MEMBERS_TABLE,
  ADD_PSB_MEMBER_TO_OPTIONS,
  REMOVE_PSB_MEMBER_FROM_OPTIONS,
  SET_PSB_ROLES,
  ADD_PSB_ROLE_TO_OPTIONS,
  REMOVE_PSB_ROLE_FROM_OPTIONS,
} from './actionTypes'

const INIT_STATE = {
  response: {
    get: {
      assignedPSBMembers: [],
      unassignedPSBMembers: [],
    },
    psbDetails: {
      id: '',
      noOfApplicants: '',
      psbMembers: [],
      schedule: {},
    },
    psbSummary: {
      positionDetails: {},
      ranking: [],
      postingDate: '',
      numberOfApplicants: '',
      dateOfPanelInterview: '',
      numberOfQualifiedApplicants: '',
      numberOfInterviewedApplicants: '',
      interviewDone: '',
      allPsbSubmitted: '',
      salaryGrade: '',
      signatories: [],
    },
    selectedByAppointingAuth: [],
    competencyBasedInterviewReportsHeader: {},
    competencyBasedInterviewReports: [],
  },
  tableData: [],
  psbRoles: [],
  loading: {
    loadingGetAssignedPSBMember: false,
    loadingGetUnassignedPSBMember: false,
    loadingPostAssignedPSBMembers: false,
    loadingPsbDetails: false,
    loadingPsbSummary: false,
    loadingSelectedByAppointingAuth: false,
    loadingCompetencyBasedInterviewReports: false,
    loadingCompetencyBasedInterviewReportsHeader: false,
  },
  error: {
    errorGetAssignedPSBMember: null,
    errorGetUnassignedPSBMember: null,
    errorPostAssignedPSBMembers: null,
    errorPsbDetails: null,
    errorPsbSummary: null,
    errorSelectedByAppointingAuth: null,
    errorCompetencyBasedInterviewReports: null,
    errorCompetencyBasedInterviewReportsHeader: null,
  },
}

const personnelSelectionBoard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSIGNED_PSB_MEMBERS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            assignedPSBMembers: [],
          },
        },
        loading: {
          ...state.loading,
          loadingGetAssignedPSBMember: true,
        },
        error: {
          ...state.error,
          errorGetAssignedPSBMember: null,
        },
      }
    case GET_ASSIGNED_PSB_MEMBERS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            assignedPSBMembers: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingGetAssignedPSBMember: false,
        },
      }
    case GET_ASSIGNED_PSB_MEMBERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingGetAssignedPSBMember: false,
        },
        error: {
          ...state.error,
          errorGetAssignedPSBMember: action.payload,
        },
      }

    case GET_UNASSIGNED_PSB_MEMBERS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            unassignedPSBMembers: [],
          },
        },
        loading: {
          ...state.loading,
          loadingGetUnassignedPSBMember: true,
        },
        error: {
          ...state.error,
          errorGetUnassignedPSBMember: null,
        },
      }
    case GET_UNASSIGNED_PSB_MEMBERS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            unassignedPSBMembers: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingGetUnassignedPSBMember: false,
        },
      }
    case GET_UNASSIGNED_PSB_MEMBERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingGetUnassignedPSBMember: false,
        },
        error: {
          ...state.error,
          errorGetUnassignedPSBMember: action.payload,
        },
      }

    case GET_PSB_DETAILS:
      return {
        ...state,
        response: {
          ...state.response,
          psbDetails: {
            ...state.response.psbDetails,
            id: '',
            noOfApplicants: '',
            psbMembers: [],
            schedule: {},
          },
        },
        loading: {
          ...state.loading,
          loadingPsbDetails: true,
        },
        error: {
          ...state.error,
          errorPsbDetails: null,
        },
      }
    case GET_PSB_DETAILS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          psbDetails: {
            ...state.response.psbDetails,
            id: action.payload.id,
            noOfApplicants: action.payload.noOfApplicants,
            psbMembers: action.payload.psbMembers,
            schedule: action.payload.schedule,
          },
        },
        loading: {
          ...state.loading,
          loadingPsbDetails: false,
        },
      }

    case GET_PSB_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPsbDetails: false,
        },
        error: {
          ...state.error,
          errorPsbDetails: action.payload,
        },
      }

    case GET_PSB_SUMMARY:
      return {
        ...state,
        response: {
          ...state.response,
          psbSummary: {
            ...state.response.psbSummary,
            positionDetails: {},
            ranking: [],
            postingDate: '',
            numberOfApplicants: '',
            dateOfPanelInterview: '',
            numberOfQualifiedApplicants: '',
            numberOfInterviewedApplicants: '',
            interviewDone: '',
            allPsbSubmitted: '',
            salaryGrade: '',
            signatories: [],
          },
        },
        loading: {
          ...state.loading,
          loadingPsbSummary: true,
        },
        error: {
          ...state.error,
          errorPsbSummary: null,
        },
      }
    case GET_PSB_SUMMARY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          psbSummary: {
            ...state.response.psbSummary,
            positionDetails: action.payload.positionDetails,
            ranking: action.payload.ranking,
            postingDate: action.payload.postingDate,
            numberOfApplicants: action.payload.numberOfApplicants,
            dateOfPanelInterview: action.payload.dateOfPanelInterview,
            numberOfQualifiedApplicants:
              action.payload.numberOfQualifiedApplicants,
            numberOfInterviewedApplicants:
              action.payload.numberOfInterviewedApplicants,
            interviewDone: action.payload.interviewDone,
            allPsbSubmitted: action.payload.allPsbSubmitted,
            salaryGrade: action.payload.salaryGrade,
            signatories: action.payload.signatories,
          },
        },
        loading: {
          ...state.loading,
          loadingPsbSummary: false,
        },
      }
    case GET_PSB_SUMMARY_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPsbSummary: false,
        },
        error: {
          ...state.error,
          errorPsbSummary: action.payload,
        },
      }

    case GET_SELECTED_BY_APPOINTING_AUTHORITY:
      return {
        ...state,
        response: {
          ...state.response,
          selectedByAppointingAuth: [],
        },
        loading: {
          ...state.loading,
          loadingSelectedByAppointingAuth: true,
        },
        error: {
          ...state.error,
          errorSelectedByAppointingAuth: null,
        },
      }
    case GET_SELECTED_BY_APPOINTING_AUTHORITY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          selectedByAppointingAuth: action.payload,
        },
        loading: {
          ...state.loading,
          loadingSelectedByAppointingAuth: false,
        },
      }
    case GET_SELECTED_BY_APPOINTING_AUTHORITY_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingSelectedByAppointingAuth: false,
        },
        error: {
          ...state.error,
          errorSelectedByAppointingAuth: action.payload,
        },
      }

    case GET_PSB_CBI_REPORTS_HEADER:
      return {
        ...state,
        response: {
          ...state.response,
          competencyBasedInterviewReportsHeader: {},
        },
        loading: {
          ...state.loading,
          loadingCompetencyBasedInterviewReportsHeader: true,
        },
        error: {
          ...state.error,
          errorCompetencyBasedInterviewReportsHeader: null,
        },
      }
    case GET_PSB_CBI_REPORTS_HEADER_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          competencyBasedInterviewReportsHeader: action.payload,
        },
        loading: {
          ...state.loading,
          loadingCompetencyBasedInterviewReportsHeader: false,
        },
      }
    case GET_PSB_CBI_REPORTS_HEADER_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCompetencyBasedInterviewReportsHeader: false,
        },
        error: {
          ...state.error,
          errorCompetencyBasedInterviewReportsHeader: action.payload,
        },
      }

    case GET_PSB_CBI_REPORTS:
      return {
        ...state,
        response: {
          ...state.response,
          competencyBasedInterviewReports: [],
        },
        loading: {
          ...state.loading,
          loadingCompetencyBasedInterviewReports: true,
        },
        error: {
          ...state.error,
          errorCompetencyBasedInterviewReports: null,
        },
      }
    case GET_PSB_CBI_REPORTS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          competencyBasedInterviewReports: action.payload,
        },
        loading: {
          ...state.loading,
          loadingCompetencyBasedInterviewReports: false,
        },
      }
    case GET_PSB_CBI_REPORTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCompetencyBasedInterviewReports: false,
        },
        error: {
          ...state.error,
          errorCompetencyBasedInterviewReports: action.payload,
        },
      }

    case ADD_PSB_MEMBER_TO_TABLE:
      return {
        ...state,
        tableData: [...state.tableData, action.payload],
      }
    case REMOVE_PSB_MEMBER_FROM_TABLE:
      return {
        ...state,
        tableData: [
          ...state.tableData.filter(rowData => rowData !== action.payload),
        ],
      }
    case RESET_PSB_MEMBERS_TABLE:
      return {
        ...state,
        tableData: [],
      }

    case ADD_PSB_MEMBER_TO_OPTIONS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            unassignedPSBMembers: [
              ...state.response.get.unassignedPSBMembers,
              action.payload,
            ],
          },
        },
      }
    case REMOVE_PSB_MEMBER_FROM_OPTIONS:
      return {
        ...state,
        response: {
          ...state.response,
          get: {
            ...state.response.get,
            unassignedPSBMembers: [
              ...state.response.get.unassignedPSBMembers.filter(
                rowData => rowData !== action.payload
              ),
            ],
          },
        },
      }

    case SET_PSB_ROLES:
      return {
        ...state,
        psbRoles: action.payload,
      }
    case ADD_PSB_ROLE_TO_OPTIONS:
      return {
        ...state,
        psbRoles: [...state.psbRoles, action.payload],
      }
    case REMOVE_PSB_ROLE_FROM_OPTIONS:
      return {
        ...state,
        psbRoles: [
          ...state.psbRoles.filter(
            psbRole => psbRole !== parseInt(action.payload)
          ),
        ],
      }
    default:
      return state
  }
}

export default personnelSelectionBoard
