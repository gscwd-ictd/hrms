import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchSelectedByAppointingAuth, fetchPsbSummary } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import SRoADocument from "./SRoADocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const SummaryRankingOfApplicantsPdf = props => {
  const dispatch = useDispatch()

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
    dispatch(fetchPsbSummary(props.match.params.vppId)) //  fetch interview rating
    dispatch(fetchSelectedByAppointingAuth(props.match.params.vppId)) //  fetch selected by appointing auth
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
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

SummaryRankingOfApplicantsPdf.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      vppId: PropTypes.string.isRequired,
    }),
  }),
}
export default SummaryRankingOfApplicantsPdf
