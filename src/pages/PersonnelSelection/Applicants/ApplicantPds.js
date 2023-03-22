import React, { useEffect } from "react"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchApplicantPds } from "store/actions"

import { Card, CardBody, Col, Container, Row } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import PersonalDataSheetView from "components/PersonalDataSheet/Applicant"

const ApplicantPds = () => {
  const dispatch = useDispatch()
  const { applicantId, prfId, publicationId, isInternal } = useParams()

  const { error } = useSelector(state => ({
    error: state.applicants.error.errorApplicant,
  }))

  useEffect(() => {
    dispatch(fetchApplicantPds(applicantId, isInternal))
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Applicants"
              titleUrl={
                "/personnel-selection/publication-positions/" +
                prfId +
                "/publications/" +
                publicationId +
                "/applicants"
              }
              breadcrumbItem="Applicant"
            />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <PersonalDataSheetView />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default ApplicantPds
