import React, { useEffect } from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchApplicantPds } from "store/actions"
import PropTypes from "prop-types"

// extra components
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"

// view pds
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
    </React.Fragment>
  )
}

ApplicantPds.propTypes = {
  match: PropTypes.object,
}

export default ApplicantPds
