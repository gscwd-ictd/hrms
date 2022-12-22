import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchApplicantPds } from "store/actions"
import { Container } from "reactstrap"
import dayjs from "dayjs"
import { PDFViewer } from "@react-pdf/renderer"
import PdsDocument from "./PdsDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const ApplicantPersonalDataSheetPdf = props => {
  const dispatch = useDispatch()

  const {
    basicInfo,
    familyInfo,
    educationInfo,
    eligibilityInfo,
    workExperienceInfo,
    voluntaryWorkInfo,
    learningDevelopmentInfo,
    otherInfo,
    isLoading,
    error,
  } = useSelector(state => ({
    basicInfo: state.applicants.applicant.basicInfo,
    familyInfo: state.applicants.applicant.family,
    educationInfo: state.applicants.applicant.education,
    eligibilityInfo: state.applicants.applicant.eligibility,
    workExperienceInfo: state.applicants.applicant.workExperience,
    voluntaryWorkInfo: state.applicants.applicant.voluntaryWork,
    learningDevelopmentInfo: state.applicants.applicant.learningDevelopment,
    otherInfo: state.applicants.applicant.otherInfo,
    isLoading: state.applicants.loading.loadingApplicant,
    error: state.applicants.error.errorApplicant,
  }))

  const formatDate = assignedDate => {
    const date = new Date(assignedDate)
    return dayjs(date.toLocaleDateString()).format("MM/DD/YYYY")
  }

  useEffect(() => {
    dispatch(
      fetchApplicantPds(
        props.match.params.applicantId,
        props.match.params.isInternal
      )
    )
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {error ? (
            <ToastrNotification toastType={"error"} notifMessage={error} />
          ) : null}

          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <PDFViewer width={"100%"} height={700} showToolbar>
              <PdsDocument
                formatDate={formatDate}
                basicInfo={basicInfo}
                familyInfo={familyInfo}
                educationInfo={educationInfo}
                eligibilityInfo={eligibilityInfo}
                workExperienceInfo={workExperienceInfo}
                voluntaryWorkInfo={voluntaryWorkInfo}
                learningDevelopmentInfo={learningDevelopmentInfo}
                otherInfo={otherInfo}
              />
            </PDFViewer>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

ApplicantPersonalDataSheetPdf.propTypes = {
  match: PropTypes.object,
}

export default ApplicantPersonalDataSheetPdf
