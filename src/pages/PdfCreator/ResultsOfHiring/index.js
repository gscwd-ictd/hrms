import React, { useEffect } from "react"
import dayjs from "dayjs"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchDocumentResultsOfHiring } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import RoHDocument from "./RoHDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const ResultsOfHiringPdf = props => {
  const dispatch = useDispatch()

  // redux state of results of hiring document
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
      <Can I="access" this="Results_of_hiring">
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
      </Can>

      <Can not I="access" this="Results_of_hiring">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

ResultsOfHiringPdf.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}
export default ResultsOfHiringPdf
