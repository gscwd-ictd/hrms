import React, { useEffect } from "react"
import dayjs from "dayjs"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { getSinglePRF, fetchPRFTrail } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PrfDocument from "./PrfDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionRequestFormPdf = () => {
  const dispatch = useDispatch()
  const { prfId } = useParams()

  // redux state for PRF details
  const { prfDetails, loadingPrf, errorPrf } = useSelector(state => ({
    prfDetails: state.positionRequest.prfDetails,
    loadingPrf: state.positionRequest.loading.loadingPrf,
    errorPrf: state.positionRequest.error.errorPrf,
  }))

  // redux state for PRF trail
  const { prfTrail, loadingPrfTrail, errorPrfTrail } = useSelector(state => ({
    prfTrail: state.positionRequest.prfTrail,
    loadingPrfTrail: state.positionRequest.loading.loadingPrfTrail,
    errorPrfTrail: state.positionRequest.error.errorPrfTrail,
  }))

  const formatDate = assignedDate => dayjs(assignedDate).format("MMMM DD, YYYY")

  useEffect(() => {
    dispatch(getSinglePRF(prfId)) //  fetch PRF details
    dispatch(fetchPRFTrail(prfId)) //  fetch trail of signatories
  }, [])

  return (
    <React.Fragment>
      <Can I="access" this="Prf_list">
        <div className="page-content">
          <Container fluid={true}>
            {errorPrf ? (
              <ToastrNotification toastType={"error"} notifMessage={errorPrf} />
            ) : null}

            {errorPrfTrail ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPrfTrail}
              />
            ) : null}

            {loadingPrf || loadingPrfTrail ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={"100%"} height={700} showToolbar>
                <PrfDocument
                  prfDetails={prfDetails}
                  prfTrail={prfTrail}
                  formatDate={formatDate}
                />
              </PDFViewer>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Prf_list">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionRequestFormPdf
