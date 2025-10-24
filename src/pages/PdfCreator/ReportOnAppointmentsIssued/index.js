import React, { useEffect } from 'react'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentReportOnAppointmentsIssued } from 'store/actions'

import { Container } from 'reactstrap'
import { PDFViewer } from '@react-pdf/renderer'
import RAIDocument from './RAIDocument'

// Extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const ReportOnAppointmentsIssuedPdf = () => {
  const dispatch = useDispatch()
  const { yearMonth } = useParams()

  // Redux state for RAI document
  const { reportOnAppointmentsIssued, loadingRAIDocument, errorRAIDocument } =
    useSelector(state => ({
      reportOnAppointmentsIssued: state.applicants.reportOnAppointmentsIssued,
      loadingRAIDocument: state.applicants.loading.loadingRAIDocument,
      errorRAIDocument: state.applicants.error.errorRAIDocument,
    }))

  useEffect(() => {
    dispatch(
      fetchDocumentReportOnAppointmentsIssued(yearMonth) //  fetch RAI document
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
                toastType={'error'}
                notifMessage={errorRAIDocument}
              />
            ) : null}

            {loadingRAIDocument ? (
              <LoadingIndicator />
            ) : (
              <>
                <PDFViewer width={'100%'} height={700} showToolbar>
                  <RAIDocument
                    reportOnAppointmentsIssued={reportOnAppointmentsIssued}
                    yearMonth={yearMonth}
                  />
                </PDFViewer>
              </>
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

export default ReportOnAppointmentsIssuedPdf
