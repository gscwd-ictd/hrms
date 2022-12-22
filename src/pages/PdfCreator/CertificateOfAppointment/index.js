import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchDocumentCertificateOfAppointment } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import CoADocument from "./CoADocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const CertificateOfAppointmentPdf = props => {
  const dispatch = useDispatch()

  // redux state for PRF details
  const { certificateOfAppointment, loadingCoADocument, errorCoADocument } =
    useSelector(state => ({
      certificateOfAppointment: state.applicants.certificateOfAppointment,
      loadingCoADocument: state.applicants.loading.loadingCoADocument,
      errorCoADocument: state.applicants.error.errorCoADocument,
    }))

  useEffect(() => {
    dispatch(
      fetchDocumentCertificateOfAppointment(
        props.match.params.postingApplicantId
      )
    ) //  fetch CS Form No. 33-B details
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {errorCoADocument ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorCoADocument}
            />
          ) : null}

          {loadingCoADocument ? (
            <LoadingIndicator />
          ) : (
            <PDFViewer width={"100%"} height={700} showToolbar>
              <CoADocument
                certificateOfAppointment={certificateOfAppointment}
              />
            </PDFViewer>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

CertificateOfAppointmentPdf.propTypes = {
  match: PropTypes.object,
}
export default CertificateOfAppointmentPdf
