import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchDocumentResultsOfHiring } from "store/actions"
import dayjs from "dayjs"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import RoHDocument from "./RoHDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const ResultsOfHiringPdf = props => {
  const dispatch = useDispatch()

  const { resultsOfHiringDocument, loadingRoHDocument, errorRoHDocument } =
    useSelector(state => ({
      resultsOfHiringDocument: state.applicants.resultsOfHiringDocument,
      loadingRoHDocument: state.applicants.loading.loadingRoHDocument,
      errorRoHDocument: state.applicants.error.errorRoHDocument,
    }))

  const formatDate = assignedDate => dayjs(assignedDate).format("MMMM DD, YYYY")

  useEffect(() => {
    dispatch(
      fetchDocumentResultsOfHiring(
        props.match.params.appointmentEffectivityDate
      )
    )
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {errorRoHDocument ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorRoHDocument}
            />
          ) : null}

          {loadingRoHDocument ? (
            <LoadingIndicator />
          ) : (
            <PDFViewer width={"100%"} height={700} showToolbar>
              <RoHDocument
                resultsOfHiringDocument={resultsOfHiringDocument}
                effectivityDate={formatDate(
                  props.match.params.appointmentEffectivityDate
                )}
              />
            </PDFViewer>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

ResultsOfHiringPdf.propTypes = {
  match: PropTypes.object,
}
export default ResultsOfHiringPdf
