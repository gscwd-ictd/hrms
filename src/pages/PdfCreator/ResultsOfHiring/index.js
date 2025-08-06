import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentResultsOfHiring } from 'store/actions'

import { Container } from 'reactstrap'
import { PDFViewer } from '@react-pdf/renderer'
import RoHDocument from './RoHDocument'

// Extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const ResultsOfHiringPdf = () => {
  const dispatch = useDispatch()
  const { appointmentEffectivityDate } = useParams()

  // redux state of results of hiring document
  const { resultsOfHiringDocument, loadingRoHDocument, errorRoHDocument } =
    useSelector(state => ({
      resultsOfHiringDocument: state.applicants.resultsOfHiringDocument,
      loadingRoHDocument: state.applicants.loading.loadingRoHDocument,
      errorRoHDocument: state.applicants.error.errorRoHDocument,
    }))

  const formatDate = assignedDate => dayjs(assignedDate).format('MMMM DD, YYYY')

  useEffect(() => {
    dispatch(fetchDocumentResultsOfHiring(appointmentEffectivityDate))
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Results_of_hiring">
        <div className="page-content">
          <Container fluid={true}>
            {errorRoHDocument ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorRoHDocument}
              />
            ) : null}

            {loadingRoHDocument ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={'100%'} height={700} showToolbar>
                <RoHDocument
                  resultsOfHiringDocument={resultsOfHiringDocument}
                  effectivityDate={formatDate(appointmentEffectivityDate)}
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

export default ResultsOfHiringPdf
