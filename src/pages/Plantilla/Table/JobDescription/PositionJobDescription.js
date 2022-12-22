import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchJobDescription, fetchPlantillaPosition } from "store/actions"
import PropTypes from "prop-types"

// extra components
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionJobDescription = props => {
  const dispatch = useDispatch()

  const { jobDescription, assignedTo, isLoading, error } = useSelector(
    state => ({
      jobDescription: state.jobDesc.jobDescription,
      assignedTo: state.jobDesc.jobDescription.assignedTo,
      isLoading: state.jobDesc.isLoading,
      error: state.jobDesc.error,
    })
  )

  const { positionDetails, pdIsLoading, pdError } = useSelector(state => ({
    positionDetails: state.plantillaPosition.plantillaPosition,
    pdIsLoading: state.plantillaPosition.isLoading,
    pdError: state.plantillaPosition.error,
  }))

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(fetchJobDescription(props.match.params.id))
      dispatch(fetchPlantillaPosition(props.match.params.id))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {error ? (
            <ToastrNotification toastType={"error"} notifMessage={error} />
          ) : null}

          {pdError ? (
            <ToastrNotification toastType={"error"} notifMessage={pdError} />
          ) : null}

          {isLoading && pdIsLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Breadcrumbs
                title={positionDetails.itemNumber}
                titleUrl={`/plantilla/${props.match.params.id}`}
                breadcrumbItem="Job Description"
                positionTitle={positionDetails.positionTitle}
              />
              <Container fluid={true}>
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        {isLoading ? (
                          <LoadingIndicator />
                        ) : (
                          <Form>
                            <FormGroup>
                              <Label for="formrow-jobtitle-Input">
                                Job Title
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="formrow-jobtitle-Input"
                                defaultValue={jobDescription.positionTitle}
                                readOnly
                              />
                            </FormGroup>

                            <Row>
                              <Col sm={4}>
                                <FormGroup>
                                  <Label for="formrow-office-Input">
                                    Office
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-office-Input"
                                    defaultValue={assignedTo.office}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>

                              <Col sm={4}>
                                <FormGroup>
                                  <Label for="formrow-dept-Input">
                                    Department
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-dept-Input"
                                    defaultValue={assignedTo.department}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>

                              <Col sm={4}>
                                <FormGroup>
                                  <Label for="formrow-div-Input">
                                    Division
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-div-Input"
                                    defaultValue={assignedTo.division}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={4}>
                                <FormGroup>
                                  <Label for="formrow-reportsto-Input">
                                    Reports To
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-reportsto-Input"
                                    defaultValue={jobDescription.reportsTo}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>

                              <Col sm={4}>
                                <FormGroup>
                                  <Label for="formrow-sg-Input">
                                    Salary Grade
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-sg-Input"
                                    defaultValue={jobDescription.salaryGrade}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>

                              <Col sm={4}>
                                <FormGroup>
                                  <Label for="formrow-natureOfAppointment-Input">
                                    Nature of Appointment
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-natureOfAppointment-Input"
                                    defaultValue={
                                      jobDescription.natureOfAppointment
                                    }
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <FormGroup>
                              <Label for="formrow-desc-Input">
                                Brief decription of general function of
                                Office/Department/Division
                              </Label>
                              <Input
                                type="textarea"
                                className="form-control"
                                id="formrow-desc-Input"
                                defaultValue={jobDescription.description}
                                readOnly
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label for="formrow-desc-Input">
                                Brief decription of general function of the
                                position
                              </Label>
                              <Input
                                type="textarea"
                                className="form-control"
                                id="formrow-desc-Input"
                                defaultValue={jobDescription.summary}
                                readOnly
                              />
                            </FormGroup>

                            {/* <div>
                          <button type="submit" className="btn btn-primary w-md">
                            Submit
                          </button>
                        </div> */}
                          </Form>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

PositionJobDescription.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}

export default PositionJobDescription
