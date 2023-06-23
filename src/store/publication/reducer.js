import {
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_SUCCESS,
  GET_PUBLICATIONS_FAIL,
  RESET_PUBLICATIONS,
  GET_CALENDAR_INTERVIEW_SCHEDULES,
  GET_CALENDAR_INTERVIEW_SCHEDULES_SUCCESS,
  GET_CALENDAR_INTERVIEW_SCHEDULES_FAIL,
  GET_PUBLICATION_DOCUMENT_DETAILS,
  GET_PUBLICATION_DOCUMENT_DETAILS_SUCCESS,
  GET_PUBLICATION_DOCUMENT_DETAILS_FAIL,
  PUT_PUBLICATION_STATUS,
  PUT_PUBLICATION_STATUS_SUCCESS,
  PUT_PUBLICATION_STATUS_FAIL,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_SUCCESS,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_FAIL,
  GET_PUBLICATION_SCHEDULES,
  GET_PUBLICATION_SCHEDULES_SUCCESS,
  GET_PUBLICATION_SCHEDULES_FAIL,
  POST_SCHEDULE_EXAM_INTERVIEW,
  POST_SCHEDULE_EXAM_INTERVIEW_SUCCESS,
  POST_SCHEDULE_EXAM_INTERVIEW_FAIL,
  PATCH_SCHEDULE_EXAM_INTERVIEW,
  PATCH_SCHEDULE_EXAM_INTERVIEW_SUCCESS,
  PATCH_SCHEDULE_EXAM_INTERVIEW_FAIL,
  PATCH_SET_APPOINTMENT_EFFECTIVITY,
  PATCH_SET_APPOINTMENT_EFFECTIVITY_SUCCESS,
  PATCH_SET_APPOINTMENT_EFFECTIVITY_FAIL,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_SUCCESS,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_FAIL,
  GET_AVAILABLE_ITEM_NUMBERS,
  GET_AVAILABLE_ITEM_NUMBERS_SUCCESS,
  GET_AVAILABLE_ITEM_NUMBERS_FAIL,
  RESET_PUBLICATION_RESPONSES,
} from "./actionTypes"

const INIT_STATE = {
  publications: [],
  interviewSchedules: [],
  publicationDocumentDetails: [],
  response: {
    publicationStatus: {},
    endorsementToRequestingEntity: [],
    publicationExamInterviewSchedule: {
      get: {},
      post: {},
      patch: {},
    },
    appointmentEffectivity: {},
  },
  publicationsWithHiredApplicants: [],
  availableItemNumbers: [],
  loading: {
    publicationsLoading: false,
    interviewSchedulesLoading: false,
    loadingPublicationDocumentDetails: false,
    loadingPublicationStatus: false,
    loadingEndorsementToRequestingEntity: false,
    loadingPublicationExamInterviewSchedule: false,
    loadingAppointmentEffectivity: false,
    loadingPublicationsWithHiredApplicants: false,
  },
  error: {
    publicationsError: null,
    interviewSchedulesError: null,
    errorPublicationDocumentDetails: null,
    errorPublicationStatus: null,
    errorEndorsementToRequestingEntity: null,
    errorPublicationExamInterviewSchedule: null,
    errorAppointmentEffectivity: null,
    errorPublicationsWithHiredApplicants: null,
  },
}

const publications = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PUBLICATIONS:
      return {
        ...state,
        publications: [],
        loading: {
          ...state.loading,
          publicationsLoading: true,
        },
        error: {
          ...state.error,
          publicationsError: null,
        },
      }
    case GET_PUBLICATIONS_SUCCESS:
      return {
        ...state,
        publications: action.payload,
        loading: {
          ...state.loading,
          publicationsLoading: false,
        },
      }
    case GET_PUBLICATIONS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          publicationsLoading: false,
        },
        error: {
          ...state.error,
          publicationsError: action.payload,
        },
      }

    case RESET_PUBLICATIONS:
      return {
        ...state,
        publications: [],
      }

    case GET_CALENDAR_INTERVIEW_SCHEDULES:
      return {
        ...state,
        interviewSchedules: [],
        loading: {
          ...state.loading,
          interviewSchedulesLoading: true,
        },
        error: {
          ...state.error,
          interviewSchedulesError: null,
        },
      }
    case GET_CALENDAR_INTERVIEW_SCHEDULES_SUCCESS:
      return {
        ...state,
        interviewSchedules: action.payload,
        loading: {
          ...state.loading,
          interviewSchedulesLoading: false,
        },
      }
    case GET_CALENDAR_INTERVIEW_SCHEDULES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          interviewSchedulesLoading: false,
        },
        error: {
          ...state.error,
          interviewSchedulesError: action.payload,
        },
      }

    case GET_PUBLICATION_DOCUMENT_DETAILS:
      return {
        ...state,
        publicationDocumentDetails: [],
        loading: {
          ...state.loading,
          loadingPublicationDocumentDetails: true,
        },
        error: {
          ...state.error,
          errorPublicationDocumentDetails: null,
        },
      }
    case GET_PUBLICATION_DOCUMENT_DETAILS_SUCCESS:
      return {
        ...state,
        publicationDocumentDetails: action.payload,
        loading: {
          ...state.loading,
          loadingPublicationDocumentDetails: false,
        },
      }
    case GET_PUBLICATION_DOCUMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPublicationDocumentDetails: false,
        },
        error: {
          ...state.error,
          errorPublicationDocumentDetails: action.payload,
        },
      }

    case PUT_PUBLICATION_STATUS:
      return {
        ...state,
        response: {
          ...state.response,
          publicationStatus: {},
        },
        loading: {
          ...state.loading,
          loadingPublciationDeadline: true,
        },
        error: {
          ...state.error,
          errorPublciationDeadline: null,
        },
      }
    case PUT_PUBLICATION_STATUS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          publicationStatus: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPublciationDeadline: false,
        },
      }
    case PUT_PUBLICATION_STATUS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPublciationDeadline: false,
        },
        error: {
          ...state.error,
          errorPublciationDeadline: action.payload,
        },
      }

    case POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY:
      return {
        ...state,
        response: {
          ...state.response,
          endorsementToRequestingEntity: [],
        },
        loading: {
          ...state.loading,
          loadingEndorsementToRequestingEntity: true,
        },
        error: {
          ...state.error,
          errorEndorsementToRequestingEntity: null,
        },
      }
    case POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          endorsementToRequestingEntity: action.payload,
        },
        loading: {
          ...state.loading,
          loadingEndorsementToRequestingEntity: false,
        },
      }
    case POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingEndorsementToRequestingEntity: false,
        },
        error: {
          ...state.error,
          errorEndorsementToRequestingEntity: action.payload,
        },
      }

    case GET_PUBLICATION_SCHEDULES:
      return {
        ...state,
        response: {
          ...state.response,
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            get: {},
          },
        },
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: true,
        },
        error: {
          ...state.error,
          errorPublicationExamInterviewSchedule: null,
        },
      }
    case GET_PUBLICATION_SCHEDULES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            get: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: false,
        },
      }
    case GET_PUBLICATION_SCHEDULES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: false,
        },
        error: {
          ...state.error,
          errorPublicationExamInterviewSchedule: action.payload,
        },
      }

    case POST_SCHEDULE_EXAM_INTERVIEW:
      return {
        ...state,
        response: {
          ...state.response,
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            post: {},
          },
        },
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: true,
        },
        error: {
          ...state.error,
          errorPublicationExamInterviewSchedule: null,
        },
      }
    case POST_SCHEDULE_EXAM_INTERVIEW_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            post: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: false,
        },
      }
    case POST_SCHEDULE_EXAM_INTERVIEW_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: false,
        },
        error: {
          ...state.error,
          errorPublicationExamInterviewSchedule: action.payload,
        },
      }

    case PATCH_SCHEDULE_EXAM_INTERVIEW:
      return {
        ...state,
        response: {
          ...state.response,
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            patch: {},
          },
        },
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: true,
        },
        error: {
          ...state.error,
          errorPublicationExamInterviewSchedule: null,
        },
      }
    case PATCH_SCHEDULE_EXAM_INTERVIEW_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            patch: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: false,
        },
      }
    case PATCH_SCHEDULE_EXAM_INTERVIEW_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPublicationExamInterviewSchedule: false,
        },
        error: {
          ...state.error,
          errorPublicationExamInterviewSchedule: action.payload,
        },
      }

    case PATCH_SET_APPOINTMENT_EFFECTIVITY:
      return {
        ...state,
        response: {
          ...state.response,
          appointmentEffectivity: {},
        },
        loading: {
          ...state.loading,
          loadingAppointmentEffectivity: true,
        },
        error: {
          ...state.error,
          errorAppointmentEffectivity: null,
        },
      }

    case PATCH_SET_APPOINTMENT_EFFECTIVITY_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          appointmentEffectivity: action.payload,
        },
        loading: {
          ...state.loading,
          loadingAppointmentEffectivity: false,
        },
      }

    case PATCH_SET_APPOINTMENT_EFFECTIVITY_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingAppointmentEffectivity: false,
        },
        error: {
          ...state.error,
          errorAppointmentEffectivity: action.payload,
        },
      }

    case GET_PUBLICATIONS_WITH_HIRED_APPLICANTS:
      return {
        ...state,
        publicationsWithHiredApplicants: [],
        loading: {
          ...state.loading,
          loadingPublicationsWithHiredApplicants: true,
        },
        error: {
          ...state.error,
          errorPublicationsWithHiredApplicants: null,
        },
      }
    case GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_SUCCESS:
      return {
        ...state,
        publicationsWithHiredApplicants: action.payload,
        loading: {
          ...state.loading,
          loadingPublicationsWithHiredApplicants: false,
        },
      }
    case GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPublicationsWithHiredApplicants: false,
        },
        error: {
          ...state.error,
          errorPublicationsWithHiredApplicants: action.payload,
        },
      }

    case GET_AVAILABLE_ITEM_NUMBERS:
      return {
        ...state,
        availableItemNumbers: [],
        loading: {
          ...state.loading,
          publicationsLoading: true,
        },
        error: {
          ...state.error,
          publicationsError: null,
        },
      }
    case GET_AVAILABLE_ITEM_NUMBERS_SUCCESS:
      return {
        ...state,
        availableItemNumbers: action.payload,
        loading: {
          ...state.loading,
          publicationsLoading: false,
        },
      }
    case GET_AVAILABLE_ITEM_NUMBERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          publicationsLoading: false,
        },
        error: {
          ...state.error,
          publicationsError: action.payload,
        },
      }

    case RESET_PUBLICATION_RESPONSES:
      return {
        ...state,
        response: {
          ...state.response,
          publicationStatus: {},
          endorsementToRequestingEntity: [],
          publicationExamInterviewSchedule: {
            ...state.response.publicationExamInterviewSchedule,
            get: {},
            post: {},
            patch: {},
          },
          appointmentEffectivity: {},
        },
        error: {
          ...state.error,
          publicationsError: null,
          interviewSchedulesError: null,
          errorPublicationDocumentDetails: null,
          errorPublicationStatus: null,
          errorEndorsementToRequestingEntity: null,
          errorPublicationExamInterviewSchedule: null,
        },
      }

    default:
      return state
  }
}

export default publications
