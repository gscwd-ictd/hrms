import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchDocumentReportOnAppointmentsIssued } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import RAIDocument from "./RAIDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const ReportOnAppointmentsIssuedPdf = props => {
  const dispatch = useDispatch()

  // Redux state for RAI document
  const { reportOnAppointmentsIssued, loadingRAIDocument, errorRAIDocument } =
    useSelector(state => ({
      reportOnAppointmentsIssued: state.applicants.reportOnAppointmentsIssued,
      loadingRAIDocument: state.applicants.loading.loadingRAIDocument,
      errorRAIDocument: state.applicants.error.errorRAIDocument,
    }))

  useEffect(() => {
    dispatch(
      fetchDocumentReportOnAppointmentsIssued(props.match.params.yearMonth) //  fetch RAI document
    )
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Results_of_hiring">
        <div className="page-content">
          <Container fluid={true}>
            {/* Notifications */}
            {errorRAIDocument ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorRAIDocument}
              />
            ) : null}

            {loadingRAIDocument ? (
              <LoadingIndicator />
            ) : (
              <>
                <PDFViewer width={"100%"} height={700} showToolbar>
                  <RAIDocument
                    reportOnAppointmentsIssued={reportOnAppointmentsIssued}
                    yearMonth={props.match.params.yearMonth}
                  />
                </PDFViewer>
              </>
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

ReportOnAppointmentsIssuedPdf.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}
export default ReportOnAppointmentsIssuedPdf
