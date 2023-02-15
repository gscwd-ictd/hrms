import React, { useEffect } from "react"
import dayjs from "dayjs"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { getSinglePRF, fetchPRFTrail } from "store/actions"

import { Container } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PrfDocument from "./PrfDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionRequestFormPdf = props => {
  const dispatch = useDispatch()

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
    dispatch(getSinglePRF(props.match.params.prfId)) //  fetch PRF details
    dispatch(fetchPRFTrail(props.match.params.prfId)) //  fetch trail of signatories
  }, [dispatch])

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
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

PositionRequestFormPdf.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}
export default PositionRequestFormPdf
