import React, { useEffect } from "react"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchHiredApplicantDbmCscForm } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PdDbmCscDocument from "./PdDbmCscDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionDescriptionDbmCscPdf = () => {
  const dispatch = useDispatch()
  const { postingApplicantId } = useParams()

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
    if (postingApplicantId) {
      dispatch(fetchHiredApplicantDbmCscForm(postingApplicantId))
    }
  }, [])

  return (
    <React.Fragment>
      <Can I="access" this="Results_of_hiring">
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
      </Can>

      <Can not I="access" this="Results_of_hiring">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionDescriptionDbmCscPdf
