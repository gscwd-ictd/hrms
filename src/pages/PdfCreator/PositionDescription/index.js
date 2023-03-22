import React, { useEffect } from "react"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import {
  fetchJobDescription,
  fetchPositionDuties,
  fetchPositionQualificationStandards,
  fetchCompetencyProficiencyLevels,
  fetchPRFTrail,
  getSinglePRF,
} from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PdDocument from "./PdDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionDescriptionPdf = () => {
  const dispatch = useDispatch()
  const { prfId, positionId } = useParams()

  // Redux state for job description
  const { jobDescription, loadingJobDescription, errorJobDescription } =
    useSelector(state => ({
      jobDescription: state.jobDescription.response.get,
      loadingJobDescription: state.jobDescription.loading.loadingJobDescription,
      errorJobDescription: state.jobDescription.error.errorJobDescription,
    }))

  // Redux state for duties and responsibilities
  const {
    positionDutyResponsibilities,
    loadingPositionDuties,
    errorPositionDuties,
  } = useSelector(state => ({
    positionDutyResponsibilities:
      state.dutiesResponsibilities.response.positionDutyResponsibilities,
    loadingPositionDuties:
      state.dutiesResponsibilities.loading.loadingPositionDuties,
    errorPositionDuties: state.dutiesResponsibilities.error.errorPositionDuties,
  }))

  // Redux state for qualification standards
  const {
    positionQualificationStandards,
    loadingPositionQualificationStandards,
    errorPositionQualificationStandards,
  } = useSelector(state => ({
    positionQualificationStandards: state.qualificationStandards.position.get,
    loadingPositionQualificationStandards:
      state.qualificationStandards.loading
        .loadingPositionQualificationStandards,
    errorPositionQualificationStandards:
      state.qualificationStandards.error.errorPositionQualificationStandards,
  }))

  // Redux state for competency standards
  const { proficiencyLevel, loadingProficiencyLevel, errorProficiencyLevel } =
    useSelector(state => ({
      proficiencyLevel: state.positionCompetencySet.response.proficiencyLevel,
      loadingProficiencyLevel:
        state.positionCompetencySet.loading.loadingProficiencyLevel,
      errorProficiencyLevel:
        state.positionCompetencySet.error.errorProficiencyLevel,
    }))

  // redux state for PRF trail of signatories
  const { prfTrail, loadingPrfTrail, errorPrfTrail } = useSelector(state => ({
    prfTrail: state.positionRequest.prfTrail,
    loadingPrfTrail: state.positionRequest.loading.loadingPrfTrail,
    errorPrfTrail: state.positionRequest.error.errorPrfTrail,
  }))

  // redux state for PRF details
  const { prfDetails, loadingPrf, errorPrf } = useSelector(state => ({
    prfDetails: state.positionRequest.prfDetails,
    loadingPrf: state.positionRequest.loading.loadingPrf,
    errorPrf: state.positionRequest.error.errorPrf,
  }))

  useEffect(() => {
    dispatch(fetchJobDescription(positionId)) // fetch job description of plantilla position
    dispatch(fetchPositionDuties(positionId)) // fetch position duties of plantilla position
    dispatch(fetchPositionQualificationStandards(positionId)) // fetch qualification standards of plantilla position
    dispatch(fetchCompetencyProficiencyLevels(positionId)) // fetch competencies of plantilla position4
    dispatch(fetchPRFTrail(prfId)) //  fetch trail of signatories
    dispatch(getSinglePRF(prfId)) //  fetch PRF details
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Prf_list">
        <div className="page-content">
          <Container fluid={true}>
            {/* Notifications */}
            {errorJobDescription ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorJobDescription}
              />
            ) : null}

            {errorPositionDuties ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPositionDuties}
              />
            ) : null}

            {errorPositionQualificationStandards ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPositionQualificationStandards}
              />
            ) : null}

            {errorProficiencyLevel ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorProficiencyLevel}
              />
            ) : null}

            {errorPrfTrail ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPrfTrail}
              />
            ) : null}

            {errorPrf ? (
              <ToastrNotification toastType={"error"} notifMessage={errorPrf} />
            ) : null}

            {loadingJobDescription ||
            loadingPositionDuties ||
            loadingPositionQualificationStandards ||
            loadingProficiencyLevel ||
            loadingPrfTrail ||
            loadingPrf ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={"100%"} height={700} showToolbar>
                <PdDocument
                  jobDescription={jobDescription}
                  positionDutyResponsibilities={positionDutyResponsibilities}
                  positionQualificationStandards={
                    positionQualificationStandards
                  }
                  proficiencyLevel={proficiencyLevel}
                  prfTrail={prfTrail}
                  prfDetails={prfDetails}
                />
              </PDFViewer>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Prf_list">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionDescriptionPdf
