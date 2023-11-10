import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Row,
  Table,
  Input,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import TextareaAutosize from 'react-textarea-autosize'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCompetencyDetails,
  resetCompetencyResponse,
  fetchCompetencyDomains,
} from 'store/actions'
import PropTypes, { string } from 'prop-types'

// extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'

// Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddCompetencyModelModal = props => {
  const { showAdd, handleCloseAdd, modalData } = props

  const dispatch = useDispatch()

  const { competencyDomains, isLoading, errorDomains, errorKeyActions } =
    useSelector(state => ({
      competencyDomains: state.competencyModel.competencyDomains,
      isLoading: state.competencyModel.loading.loadingCompetencyDomains,
      errorDomains: state.competencyModel.error.errorCompetencyDomains,
      errorKeyActions: state.competencyModel.error.errorProficiencyKeyActions,
    }))

  useEffect(() => {
    // dispatch(resetSalaryGradeResponses())
    dispatch(fetchCompetencyDomains())
  }, [dispatch])

  const staticProficiencyKeyActions = [
    {
      level: 'BASIC',
      keyAction: '',
    },
    {
      level: 'INTERMEDIATE',
      keyAction: '',
    },
    {
      level: 'ADVANCED',
      keyAction: '',
    },
    {
      level: 'SUPERIOR',
      keyAction: '',
    },
  ]

  const staticOccupationCode = [
    'ACB',
    'BFM',
    'CPI',
    'CRE',
    'CSG',
    'DIG',
    'DRW',
    'ENG',
    'ESG',
    'GIS',
    'HRD',
    'ISD',
    'LIA',
    'LTA',
    'MSQ',
    'PIR',
    'PPD',
    'TMO',
    'WMG',
    'WMW',
    'WSM',
    'WUD',
  ]

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: '',
      occupationCode: '',
      name: '',
      desc: '',
      proficiencyKeyActions: staticProficiencyKeyActions || [],
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Please enter a code name'),
      occupationCode: Yup.string().required('Please select an occupation code'),
      name: Yup.string().required('Please enter a name'),
      desc: Yup.string().required('Please enter a competency description'),
      proficiencyKeyActions: Yup.array().of(
        Yup.object().shape({
          // level: Yup.string().required('Proficiency level is required'),
          keyAction: Yup.string().required(
            'Proficiency key action is required'
          ),
        })
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      //   dispatch(addCompetencyDetails(values))
      //   resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetCompetencyResponse())
    }
  }, [showAdd])

  return (
    <React.Fragment>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="lg" centered>
        <ModalHeader toggle={handleCloseAdd}>Add Competency</ModalHeader>

        {errorKeyActions ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorKeyActions}
          />
        ) : null}

        {errorDomains ? (
          <ToastrNotification toastType={'error'} notifMessage={errorDomains} />
        ) : null}

        <ModalBody>
          <Form
            id="addCompetencyForm"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col>
                <FormGroup>
                  {isLoading ? (
                    <LoadingIndicator />
                  ) : (
                    <div>
                      {competencyDomains.map(competencyDomain => (
                        <p
                          key={competencyDomain._id}
                          value={competencyDomain._id}
                        >
                          {competencyDomain.type}
                          {' - '}
                          {/* {competencyDomain.description} */}
                        </p>
                      ))}
                    </div>
                  )}
                  <Label for="code-Input">Code</Label>
                  <Input
                    name="code"
                    type="text"
                    className="form-control"
                    id="code-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.code || ''}
                    invalid={
                      validation.touched.code && validation.errors.code
                        ? true
                        : false
                    }
                  />
                  {validation.touched.code && validation.errors.code ? (
                    <FormFeedback type="invalid">
                      {validation.errors.code}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label for="name-Input">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ''}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label for="desc-Input">Description</Label>
                  <Input
                    name="desc"
                    type="text"
                    className="form-control"
                    id="desc-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.desc || ''}
                    invalid={
                      validation.touched.desc && validation.errors.desc
                        ? true
                        : false
                    }
                  />
                  {validation.touched.desc && validation.errors.desc ? (
                    <FormFeedback type="invalid">
                      {validation.errors.desc}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="table-responsive">
                  <Table className="table mb-0 tbl-key-actions">
                    <thead className="thead-light">
                      <tr>
                        <th className="thead-pl">Proficiency Level</th>
                        <th className="thead-ka">Key Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validation.values.proficiencyKeyActions.map(
                        (proficiency, index) => (
                          <tr key={index}>
                            <td>{proficiency.level}</td>
                            <td className="textarea-container">
                              <TextareaAutosize
                                id={index}
                                minRows={3}
                                name={`proficiencyKeyActions[${index}].keyAction`}
                                defaultValue={
                                  validation.values.proficiencyKeyActions
                                    .keyAction || ''
                                }
                                onChange={event => {
                                  validation.handleChange(event)
                                  validation.setFieldTouched(
                                    `proficiencyKeyActions[${index}].keyAction`,
                                    true
                                  )
                                }}
                                onBlur={validation.handleBlur}
                                style={{
                                  border:
                                    validation.touched.proficiencyKeyActions &&
                                    validation.touched.proficiencyKeyActions[
                                      index
                                    ]?.keyAction &&
                                    validation.errors.proficiencyKeyActions &&
                                    validation.errors.proficiencyKeyActions[
                                      index
                                    ]?.keyAction
                                      ? '1px solid red'
                                      : '',
                                  padding: '8px',
                                }}
                              />
                              {validation.touched.proficiencyKeyActions &&
                                validation.touched.proficiencyKeyActions[index]
                                  ?.keyAction &&
                                validation.errors.proficiencyKeyActions &&
                                validation.errors.proficiencyKeyActions[index]
                                  ?.keyAction && (
                                  <p
                                    style={{
                                      color: '#f46a6a',
                                      fontSize: `80%`,
                                    }}
                                  >
                                    {
                                      validation.errors.proficiencyKeyActions[
                                        index
                                      ].keyAction
                                    }
                                  </p>
                                )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="addCompetencyForm" color="info">
            Add
          </Button>
          <Button color="danger" onClick={handleCloseAdd}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

AddCompetencyModelModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  modalData: PropTypes.object,
}

export default AddCompetencyModelModal
