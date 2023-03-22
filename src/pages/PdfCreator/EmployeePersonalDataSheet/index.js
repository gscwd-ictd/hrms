import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployeePds, resetEmployeeErrorLog } from "store/actions"
import dayjs from "dayjs"
import { isEmpty } from "lodash"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PdsDocument from "./PdsDocument"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const EmployeePersonalDataSheetPdf = () => {
  const dispatch = useDispatch()
  const { employeeId } = useParams()

  // Redux state for employee PDS
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
    personalInfo: state.employee.pds.personalInfo,
    permanentAddress: state.employee.pds.permanentAddress,
    residentialAddress: state.employee.pds.residentialAddress,
    governmentIssuedIds: state.employee.pds.governmentIssuedIds,
    spouse: state.employee.pds.spouse,
    parents: state.employee.pds.parents,
    children: state.employee.pds.children,
    elementary: state.employee.pds.elementary,
    secondary: state.employee.pds.secondary,
    vocational: state.employee.pds.vocational,
    college: state.employee.pds.college,
    graduate: state.employee.pds.graduate,
    eligibilities: state.employee.pds.eligibility,
    workExperience: state.employee.pds.workExperience,
    voluntaryWork: state.employee.pds.voluntaryWork,
    learningDevelopment: state.employee.pds.learningDevelopment,
    skills: state.employee.pds.skills,
    recognitions: state.employee.pds.recognitions,
    organizations: state.employee.pds.organizations,
    officeRelation: state.employee.pds.officeRelation,
    guiltyCharged: state.employee.pds.guiltyCharged,
    convicted: state.employee.pds.convicted,
    separatedService: state.employee.pds.separatedService,
    candidateResigned: state.employee.pds.candidateResigned,
    immigrant: state.employee.pds.immigrant,
    indigenousPwdSoloParent: state.employee.pds.indigenousPwdSoloParent,
    references: state.employee.pds.references,
    governmentIssuedId: state.employee.pds.governmentIssuedId,
    error: state.employee.error,
    isLoading: state.employee.isLoading,
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
    dispatch(fetchEmployeePds(employeeId))
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(error)) {
      dispatch(resetEmployeeErrorLog())
    }
  }, [error])

  return (
    <React.Fragment>
      <Can I="access" this="Employees">
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

      <Can not I="access" this="Employees">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default EmployeePersonalDataSheetPdf
