import React from 'react'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import dayjs from 'dayjs'
import { PDFViewer } from '@react-pdf/renderer'
import PdsDocument from './PdsDocument'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import { isEmpty } from 'lodash'

const ApplicantPersonalDataSheetPdf = () => {
  // Redux state for applicant PDS
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
    eligibility,
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
    eligibility: state.applicants.pds.eligibility,
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
    isLoading: state.applicants.loading.loadingApplicant,
  }))

  // Date formatter based on PDS document MM/DD/YYYY
  const formatDate = assignedDate => {
    if (!isEmpty(assignedDate)) {
      const date = new Date(assignedDate)
      return dayjs(date.toLocaleDateString()).format('MM/DD/YYYY')
    } else {
      return ''
    }
  }

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content pt-3">
          <Container fluid={true}>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={'100%'} height={800} showToolbar>
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
                  eligibilities={eligibility}
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
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default ApplicantPersonalDataSheetPdf
