import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchHiredApplicantDbmCscForm } from "store/actions"
import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PdDbmCscDocument from "./PdDbmCscDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionDescriptionDbmCscPdf = props => {
  const dispatch = useDispatch()

  // redux state for applicants position description dbm-csc data
  const {
    applicantDbmCsc,
    loadingDbmCscPositionDescriptionForm,
    errorDbmCscPositionDescriptionForm,
  } = useSelector(state => ({
    applicantDbmCsc: state.applicants.dbmCscPositionDescriptionForm,
    loadingDbmCscPositionDescriptionForm:
      state.applicants.loading.loadingDbmCscPositionDescriptionForm,
    errorDbmCscPositionDescriptionForm:
      state.applicants.error.errorDbmCscPositionDescriptionForm,
  }))

  useEffect(() => {
    dispatch(
      fetchHiredApplicantDbmCscForm(props.match.params.postingApplicantId)
    )
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* Notifications */}
          {errorDbmCscPositionDescriptionForm ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorDbmCscPositionDescriptionForm}
            />
          ) : null}

          {loadingDbmCscPositionDescriptionForm ? (
            <LoadingIndicator />
          ) : (
            <PDFViewer width={"100%"} height={700} showToolbar>
              <PdDbmCscDocument applicantDbmCsc={applicantDbmCsc} />
            </PDFViewer>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

PositionDescriptionDbmCscPdf.propTypes = {
  match: PropTypes.object,
}
export default PositionDescriptionDbmCscPdf
