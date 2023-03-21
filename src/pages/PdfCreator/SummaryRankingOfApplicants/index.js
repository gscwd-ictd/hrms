import React, { useEffect } from "react"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchSelectedByAppointingAuth, fetchPsbSummary } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import SRoADocument from "./SRoADocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const SummaryRankingOfApplicantsPdf = () => {
  const dispatch = useDispatch()
  const { vppId } = useParams()

  // redux state for HRMPSB Summary
  const { psbSummary, loadingPsbSummary, errorPsbSummary } = useSelector(
    state => ({
      psbSummary: state.personnelSelectionBoard.response.psbSummary,
      loadingPsbSummary:
        state.personnelSelectionBoard.loading.loadingPsbSummary,
      errorPsbSummary: state.personnelSelectionBoard.error.errorPsbSummary,
    })
  )

  // redux state for to be selected applicants by appointing authority
  const {
    selectedApplicantsByAppAuth,
    loadingSelectedByAppointingAuth,
    errorSelectedByAppointingAuth,
  } = useSelector(state => ({
    selectedApplicantsByAppAuth:
      state.personnelSelectionBoard.response.selectedByAppointingAuth,
    loadingSelectedByAppointingAuth:
      state.personnelSelectionBoard.loading.loadingSelectedByAppointingAuth,
    errorSelectedByAppointingAuth:
      state.personnelSelectionBoard.error.errorSelectedByAppointingAuth,
  }))

  useEffect(() => {
    dispatch(fetchPsbSummary(vppId)) //  fetch interview rating
    dispatch(fetchSelectedByAppointingAuth(vppId)) //  fetch selected by appointing auth
  }, [])

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            {errorSelectedByAppointingAuth ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorSelectedByAppointingAuth}
              />
            ) : null}

            {errorPsbSummary ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPsbSummary}
              />
            ) : null}

            {loadingSelectedByAppointingAuth || loadingPsbSummary ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={"100%"} height={700} showToolbar>
                <SRoADocument
                  psbSummary={psbSummary}
                  selectedApplicantsByAppAuth={selectedApplicantsByAppAuth}
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

export default SummaryRankingOfApplicantsPdf
