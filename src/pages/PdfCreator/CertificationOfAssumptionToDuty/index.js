import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchDocumentCertificationOfAssumptionToDuty } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import CoAtDDocument from "./CoAtDDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const CertificationOfAssumptionToDutyPdf = props => {
  const dispatch = useDispatch()

  // redux state for PRF details
  const {
    certificationOfAssumptionToDuty,
    loadingCoAtDDocument,
    errorCoAtDDocument,
  } = useSelector(state => ({
    certificationOfAssumptionToDuty:
      state.applicants.certificationOfAssumptionToDuty,
    loadingCoAtDDocument: state.applicants.loading.loadingCoAtDDocument,
    errorCoAtDDocument: state.applicants.error.errorCoAtDDocument,
  }))

  useEffect(() => {
    dispatch(
      fetchDocumentCertificationOfAssumptionToDuty(
        props.match.params.postingApplicantId
      )
    ) //  fetch CS Form No. 4 details
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Results_of_hiring">
        <div className="page-content">
          <Container fluid={true}>
            {errorCoAtDDocument ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorCoAtDDocument}
              />
            ) : null}

            {loadingCoAtDDocument ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={"100%"} height={700} showToolbar>
                <CoAtDDocument
                  certificationOfAssumptionToDuty={
                    certificationOfAssumptionToDuty
                  }
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

CertificationOfAssumptionToDutyPdf.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
}
export default CertificationOfAssumptionToDutyPdf
