import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchPsbCBIReports, fetchPsbCBIReportsHeader } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import CBIRDocument from "./CBIRDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const CompetencyBasedInterviewReportPdf = props => {
  const dispatch = useDispatch()

  // redux state for Competency Based-Interview Reports. All PSB members results
  const {
    competencyBasedInterviewReportsHeader,
    loadingCompetencyBasedInterviewReportsHeader,
    errorCompetencyBasedInterviewReportsHeader,
  } = useSelector(state => ({
    competencyBasedInterviewReportsHeader:
      state.personnelSelectionBoard.response
        .competencyBasedInterviewReportsHeader,
    loadingCompetencyBasedInterviewReportsHeader:
      state.personnelSelectionBoard.loading
        .loadingCompetencyBasedInterviewReportsHeader,
    errorCompetencyBasedInterviewReportsHeader:
      state.personnelSelectionBoard.error
        .errorCompetencyBasedInterviewReportsHeader,
  }))

  // redux state for Competency Based-Interview Reports. All PSB members results
  const {
    competencyBasedInterviewReports,
    loadingCompetencyBasedInterviewReports,
    errorCompetencyBasedInterviewReports,
  } = useSelector(state => ({
    competencyBasedInterviewReports:
      state.personnelSelectionBoard.response.competencyBasedInterviewReports,
    loadingCompetencyBasedInterviewReports:
      state.personnelSelectionBoard.loading
        .loadingCompetencyBasedInterviewReports,
    errorCompetencyBasedInterviewReports:
      state.personnelSelectionBoard.error.errorCompetencyBasedInterviewReports,
  }))

  useEffect(() => {
    dispatch(fetchPsbCBIReportsHeader(props.match.params.vppId)) // fetch competency based-interview reports header
    dispatch(fetchPsbCBIReports(props.match.params.vppId)) //  fetch competency based-interview reports
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {errorCompetencyBasedInterviewReportsHeader ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorCompetencyBasedInterviewReportsHeader}
            />
          ) : null}

          {errorCompetencyBasedInterviewReports ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorCompetencyBasedInterviewReports}
            />
          ) : null}

          {loadingCompetencyBasedInterviewReports &&
          loadingCompetencyBasedInterviewReportsHeader ? (
            <LoadingIndicator />
          ) : (
            <PDFViewer width={"100%"} height={700} showToolbar>
              <CBIRDocument
                competencyBasedInterviewReportsHeader={
                  competencyBasedInterviewReportsHeader
                }
                competencyBasedInterviewReports={
                  competencyBasedInterviewReports
                }
              />
            </PDFViewer>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

CompetencyBasedInterviewReportPdf.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      vppId: PropTypes.string.isRequired,
    }),
  }),
}
export default CompetencyBasedInterviewReportPdf
