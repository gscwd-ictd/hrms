import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

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
    personalInfo,
    permanentAddress,
    residentialAddress,
    governmentIssuedIds,
    spouse,
    parents,
    children,
    elementary,
    secondary,
    vocational,
    college,
    graduate,
    eligibilities,
    workExperience,
    voluntaryWork,
    learningDevelopment,
    skills,
    recognitions,
    organizations,
    officeRelation,
    guiltyCharged,
    convicted,
    separatedService,
    candidateResigned,
    immigrant,
    indigenousPwdSoloParent,
    references,
    governmentIssuedId,
    error,
    isLoading,
  } = useSelector(state => ({
    personalInfo: state.applicants.pds.personalInfo,
    permanentAddress: state.applicants.pds.permanentAddress,
    residentialAddress: state.applicants.pds.residentialAddress,
    governmentIssuedIds: state.applicants.pds.governmentIssuedIds,
    spouse: state.applicants.pds.spouse,
    parents: state.applicants.pds.parents,
    children: state.applicants.pds.children,
    elementary: state.applicants.pds.elementary,
    secondary: state.applicants.pds.secondary,
    vocational: state.applicants.pds.vocational,
    college: state.applicants.pds.college,
    graduate: state.applicants.pds.graduate,
    eligibilities: state.applicants.pds.eligibility,
    workExperience: state.applicants.pds.workExperience,
    voluntaryWork: state.applicants.pds.voluntaryWork,
    learningDevelopment: state.applicants.pds.learningDevelopment,
    skills: state.applicants.pds.skills,
    recognitions: state.applicants.pds.recognitions,
    organizations: state.applicants.pds.organizations,
    officeRelation: state.applicants.pds.officeRelation,
    guiltyCharged: state.applicants.pds.guiltyCharged,
    convicted: state.applicants.pds.convicted,
    separatedService: state.applicants.pds.separatedService,
    candidateResigned: state.applicants.pds.candidateResigned,
    immigrant: state.applicants.pds.immigrant,
    indigenousPwdSoloParent: state.applicants.pds.indigenousPwdSoloParent,
    references: state.applicants.pds.references,
    governmentIssuedId: state.applicants.pds.governmentIssuedId,
    error: state.applicants.errorApplicants,
    isLoading: state.applicants.loadingApplicants,
  }))

  // Date formatter based on PDS document MM/DD/YYYY
  const formatDate = assignedDate => {
    if (!isEmpty(assignedDate)) {
      const date = new Date(assignedDate)
      return dayjs(date.toLocaleDateString()).format("MM/DD/YYYY")
    } else {
      return ""
    }
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
      <Can I="access" this="Personnel_selection">
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
                  personalInfo={personalInfo}
                  permanentAddress={permanentAddress}
                  residentialAddress={residentialAddress}
                  governmentIssuedIds={governmentIssuedIds}
                  spouse={spouse}
                  parents={parents}
                  childrenInfo={children}
                  elementary={elementary}
                  secondary={secondary}
                  vocational={vocational}
                  college={college}
                  graduate={graduate}
                  eligibilities={eligibilities}
                  workExperience={workExperience}
                  voluntaryWork={voluntaryWork}
                  learningDevelopment={learningDevelopment}
                  skills={skills}
                  recognitions={recognitions}
                  organizations={organizations}
                  officeRelation={officeRelation}
                  guiltyCharged={guiltyCharged}
                  convicted={convicted}
                  separatedService={separatedService}
                  candidateResigned={candidateResigned}
                  immigrant={immigrant}
                  indigenousPwdSoloParent={indigenousPwdSoloParent}
                  references={references}
                  governmentIssuedId={governmentIssuedId}
                />
              </PDFViewer>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

ApplicantPersonalDataSheetPdf.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
}

export default ApplicantPersonalDataSheetPdf
