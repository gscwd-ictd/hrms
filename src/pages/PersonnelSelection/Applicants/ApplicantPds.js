import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchApplicantPds } from "store/actions"

import { Card, CardBody, Col, Container, Row } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import PersonalDataSheetView from "components/PersonalDataSheet/Applicant"

const ApplicantPds = props => {
  const dispatch = useDispatch()

  const { error } = useSelector(state => ({
    error: state.applicants.error.errorApplicant,
  }))

  useEffect(() => {
    dispatch(
      fetchApplicantPds(
        props.match.params.applicantId,
        props.match.params.isInternal
      )
    )
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
                props.match.params.prfId +
                "/publications/" +
                props.match.params.publicationId +
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
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

ApplicantPds.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}

export default ApplicantPds
