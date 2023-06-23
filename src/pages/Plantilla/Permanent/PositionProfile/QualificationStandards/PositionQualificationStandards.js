import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import {
  fetchPositionQualificationStandards,
  resetQualificationStandards,
  fetchPlantillaPosition,
} from "store/actions"

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
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PositionQualificationStandards = () => {
  const dispatch = useDispatch()
  const { plantillaId } = useParams()

  const {
    positionQualificationStandards,
    loadingPositionQualificationStandards,
    errorPositionQualificationStandards,
  } = useSelector(state => ({
    positionQualificationStandards: state.qualificationStandards.position.get,
    loadingPositionQualificationStandards:
      state.qualificationStandards.loading
        .loadingPositionQualificationStandards,
    errorPositionQualificationStandards:
      state.qualificationStandards.error.errorPositionQualificationStandards,
  }))

  const { positionDetails, pdIsLoading, pdError } = useSelector(state => ({
    positionDetails: state.plantilla.plantillaPosition,
    pdIsLoading: state.plantilla.isLoading,
    pdError: state.plantilla.error,
  }))

  useEffect(() => {
    if (plantillaId) {
      dispatch(fetchPositionQualificationStandards(plantillaId))
      dispatch(fetchPlantillaPosition(plantillaId))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(resetQualificationStandards())
  }, [])

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {/* Notifications */}
            {errorPositionQualificationStandards ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPositionQualificationStandards}
              />
            ) : null}

            {pdError ? (
              <ToastrNotification toastType={"error"} notifMessage={pdError} />
            ) : null}

            {pdIsLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Breadcrumbs
                  title={positionDetails.itemNumber}
                  titleUrl={`/plantilla/permanent/${plantillaId}`}
                  breadcrumbItem="Qualification Standards"
                  positionTitle={positionDetails.positionTitle}
                />

                <Container fluid={true}>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          {loadingPositionQualificationStandards ? (
                            <LoadingIndicator />
                          ) : (
                            <Form>
                              <Row>
                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-eligibility-Input">
                                      Eligibility
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-eligibility-Input"
                                      defaultValue={
                                        positionQualificationStandards.eligibility
                                      }
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>

                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-education-Input">
                                      Education
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-education-Input"
                                      defaultValue={
                                        positionQualificationStandards.education
                                      }
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-experience-Input">
                                      Experience
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-experience-Input"
                                      defaultValue={
                                        positionQualificationStandards.experience
                                      }
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>

                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-training-Input">
                                      Training
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-training-Input"
                                      defaultValue={
                                        positionQualificationStandards.training
                                      }
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

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
      </Can>

      <Can not I="access" this="Plantilla">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

PositionQualificationStandards.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
}

export default PositionQualificationStandards
