import React, { useEffect, useState } from 'react'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentReportOnAppointmentsIssued } from 'store/actions'
import { Container, Form, Button } from 'reactstrap'
import { PDFViewer } from '@react-pdf/renderer'
import RAIDocument from './RAIDocument'
import { createExcelDocument } from './ExcelDocument'
import { Capitalize } from 'functions/Capitalize'

// Extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import { isEmpty } from 'lodash'

const ReportOnAppointmentsIssuedPdf = () => {
  const dispatch = useDispatch()
  const { yearMonth } = useParams()

  const [mutatedListOfAppointees, setMutatedListOfAppointees] = useState([])
  const [excelDataLoading, setExcelDataLoading] = useState(true)

  // Redux state for RAI document
  const { reportOnAppointmentsIssued, loadingRAIDocument, errorRAIDocument } =
    useSelector(state => ({
      reportOnAppointmentsIssued: state.applicants.reportOnAppointmentsIssued,
      loadingRAIDocument: state.applicants.loading.loadingRAIDocument,
      errorRAIDocument: state.applicants.error.errorRAIDocument,
    }))

  const mergePeriodOfEmployment = (employmentFrom, employmentTo) => {
    if (!isEmpty(employmentFrom) && !isEmpty(employmentTo)) {
      return `${employmentFrom} to ${employmentTo}`
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (!isEmpty(reportOnAppointmentsIssued)) {
      const newArr = []

      reportOnAppointmentsIssued.data.map((appointee, index) => {
        const object = {
          index: index + 1,
          effectivityDate: appointee.effectivityDate || '',
          lastName: appointee.lastName || '',
          firstName: appointee.firstName || '',
          nameExtension: appointee.nameExtension || '',
          middleName: appointee.middleName || '',
          positionTitle: appointee.positionTitle || '',
          itemNumber: appointee.itemNumber || '',
          salaryGrade: appointee.salaryGrade || '',
          monthlySalary: appointee.monthlySalary || '',
          employmentStatus: Capitalize(appointee.employmentStatus) || '',
          periodOfEmployment: mergePeriodOfEmployment(
            appointee.employmentFrom,
            appointee.employmentTo
          ),
          natureOfAppointment: appointee.natureOfAppointment || '',
          publicationPeriod: appointee.publicationPeriod || '',
          publicationMode: appointee.publicationMode || '',
          appIdentificationNo: '',
          isValidated: '',
          dateOfAction: '',
          dateOfRelease: '',
        }

        return newArr.push(object)
      })
      setExcelDataLoading(false)
      setMutatedListOfAppointees(newArr)
    }
  }, [reportOnAppointmentsIssued])

  useEffect(() => {
    setExcelDataLoading(true)
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
                <Form
                  onSubmit={e =>
                    createExcelDocument(e, mutatedListOfAppointees, yearMonth)
                  }
                  className="mb-2"
                >
                  <Button
                    type="submit"
                    color="info"
                    disabled={excelDataLoading}
                  >
                    XLSX Document
                  </Button>
                </Form>

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
