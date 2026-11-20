import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPositionQualificationStandards,
  resetQualificationStandards,
  fetchPlantillaPosition,
  updatePositionQualificationStandards,
} from 'store/actions'

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from 'reactstrap'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const FIELDS = [
  { name: 'eligibility', label: 'Eligibility' },
  { name: 'education', label: 'Education' },
  { name: 'experience', label: 'Experience' },
  { name: 'training', label: 'Training' },
]

const emptyQs = { eligibility: '', education: '', experience: '', training: '' }

/** Qualification standards of a position: view and update in place (Edit switch, like the Job Description page) */
const PositionQualificationStandards = () => {
  const dispatch = useDispatch()
  const { plantillaId } = useParams()

  const [isEditable, setIsEditable] = useState(false)
  const [values, setValues] = useState(emptyQs)
  const [touched, setTouched] = useState(false)
  // the switch is not a controlled input (like the Job Description page): a re-render while the click is being
  // handled made React drop the change, so the switch never turned on
  const switchRef = useRef(null)
  const setSwitch = on => {
    if (switchRef.current) switchRef.current.checked = on
  }

  const {
    positionQualificationStandards,
    responseUpdate,
    loadingPositionQualificationStandards,
    errorPositionQualificationStandards,
  } = useSelector(state => ({
    positionQualificationStandards: state.qualificationStandards.position.get,
    responseUpdate: state.qualificationStandards.position.put,
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

  const loadValues = qs =>
    setValues({
      eligibility: qs?.eligibility || '',
      education: qs?.education || '',
      experience: qs?.experience || '',
      training: qs?.training || '',
    })

  useEffect(() => {
    dispatch(resetQualificationStandards())
    if (plantillaId) {
      dispatch(fetchPositionQualificationStandards(plantillaId))
      dispatch(fetchPlantillaPosition(plantillaId))
    }
  }, [dispatch, plantillaId])

  // form values follow the saved QS
  useEffect(() => {
    loadValues(positionQualificationStandards)
  }, [positionQualificationStandards])

  // saved: reload and leave edit mode
  useEffect(() => {
    if (!isEmpty(responseUpdate)) {
      setIsEditable(false)
      setSwitch(false)
      setTouched(false)
      dispatch(fetchPositionQualificationStandards(plantillaId))
    }
  }, [responseUpdate])

  const handleChange = event => {
    const { name, value } = event.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const isMissing = name => touched && !values[name].trim()

  const handleSubmit = event => {
    event.preventDefault()
    setTouched(true)
    if (FIELDS.some(f => !values[f.name].trim())) return
    dispatch(
      updatePositionQualificationStandards(plantillaId, {
        positionId: plantillaId,
        eligibility: values.eligibility.trim(),
        education: values.education.trim(),
        experience: values.experience.trim(),
        training: values.training.trim(),
      })
    )
  }

  const handleCancel = () => {
    loadValues(positionQualificationStandards)
    setTouched(false)
    setIsEditable(false)
    setSwitch(false)
  }

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {/* Notifications */}
            {errorPositionQualificationStandards ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorPositionQualificationStandards}
              />
            ) : null}

            {pdError ? (
              <ToastrNotification toastType={'error'} notifMessage={pdError} />
            ) : null}

            {!isEmpty(responseUpdate) ? (
              <ToastrNotification
                toastType={'success'}
                notifMessage={'Qualification standards successfully updated'}
              />
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
                          <Row>
                            <Col
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <div className="form-check form-switch form-switch-lg mb-3">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="qsEditSwitch"
                                  ref={switchRef}
                                  defaultChecked={false}
                                  onClick={e =>
                                    e.currentTarget.checked
                                      ? setIsEditable(true)
                                      : handleCancel()
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="qsEditSwitch"
                                >
                                  Edit
                                </label>
                              </div>
                            </Col>
                          </Row>

                          {loadingPositionQualificationStandards ? (
                            <LoadingIndicator />
                          ) : (
                            <Form onSubmit={handleSubmit}>
                              <Row>
                                {FIELDS.map(field => (
                                  <Col sm={6} key={field.name}>
                                    <FormGroup>
                                      <Label for={`qs-${field.name}`}>
                                        {field.label}
                                      </Label>
                                      <Input
                                        type="textarea"
                                        rows="3"
                                        className="form-control"
                                        id={`qs-${field.name}`}
                                        name={field.name}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        readOnly={!isEditable}
                                        invalid={isMissing(field.name)}
                                        placeholder={
                                          isEditable
                                            ? 'Write "None required" if there is none'
                                            : ''
                                        }
                                      />
                                      {isMissing(field.name) ? (
                                        <FormFeedback type="invalid">
                                          Please enter {field.label.toLowerCase()}
                                        </FormFeedback>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                ))}
                              </Row>

                              {isEditable ? (
                                <Row>
                                  <Col
                                    sm={12}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      gap: '0.5rem',
                                    }}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-light w-md"
                                      onClick={handleCancel}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="btn btn-primary w-md"
                                    >
                                      Save
                                    </button>
                                  </Col>
                                </Row>
                              ) : null}
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