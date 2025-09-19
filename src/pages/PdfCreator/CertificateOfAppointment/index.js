import React, { useEffect } from 'react'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentCertificateOfAppointment } from 'store/actions'

import { Container } from 'reactstrap'
import { PDFViewer } from '@react-pdf/renderer'
import CoADocument from './CoADocument'

// Extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const CertificateOfAppointmentPdf = () => {
  const dispatch = useDispatch()
  const { postingApplicantId } = useParams()

  // redux state for PRF details
  const { certificateOfAppointment, loadingCoADocument, errorCoADocument } =
    useSelector(state => ({
      certificateOfAppointment: state.applicants.certificateOfAppointment,
      loadingCoADocument: state.applicants.loading.loadingCoADocument,
      errorCoADocument: state.applicants.error.errorCoADocument,
    }))

  useEffect(() => {
    dispatch(fetchDocumentCertificateOfAppointment(postingApplicantId)) //  fetch CS Form No. 33-B details
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Results_of_hiring">
        <div className="page-content">
          <Container fluid={true}>
            {errorCoADocument ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorCoADocument}
              />
            ) : null}

            {loadingCoADocument ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={'100%'} height={700} showToolbar>
                <CoADocument
                  certificateOfAppointment={certificateOfAppointment}
                />
              </PDFViewer>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Results_of_hiring">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default CertificateOfAppointmentPdf
