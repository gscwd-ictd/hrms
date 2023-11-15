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
  fetchCoreCompetencies,
  fetchFunctionalCompetencies,
  fetchManagerialCompetencies,
  fetchCrossCuttingCompetencies,
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

import { isEmpty } from 'lodash'

// Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddCompetencyModelModal = props => {
  const { showAdd, handleCloseAdd, modalData, _id } = props

  const dispatch = useDispatch()

  const { competencyDomains, isLoading, error, postCompetencyDetails } =
    useSelector(state => ({
      competencyDomains: state.competencyModel.competencyDomains,
      isLoading: state.competencyModel.loading.loadingCompetencyDomains,
      error: state.competencyModel.error.errorCompetencyDomains,
      postCompetencyDetails:
        state.competencyModel.response.postCompetencyDetails,
    }))

  useEffect(() => {
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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      domainId: '',
      code: '',
      name: '',
      definition: '',
      proficiencyKeyActions: staticProficiencyKeyActions || [],
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Please enter a code name'),
      name: Yup.string().required('Please enter a name'),
      definition: Yup.string().required('Please enter a competency definition'),
      proficiencyKeyActions: Yup.array().of(
        Yup.object().shape({
          keyAction: Yup.string().required(
            'Proficiency key action is required'
          ),
        })
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      const domainId = _id
      const competencyModelDataSubmit = { ...values, domainId }
      dispatch(addCompetencyDetails(competencyModelDataSubmit))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetCompetencyResponse())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postCompetencyDetails)) {
      dispatch(fetchCoreCompetencies())
      dispatch(fetchFunctionalCompetencies())
      dispatch(fetchManagerialCompetencies())
      dispatch(fetchCrossCuttingCompetencies())
      dispatch(resetCompetencyResponse())
      handleCloseAdd()
      validation.resetForm()
    }
  }, [postCompetencyDetails])

  return (
    <React.Fragment>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="lg" centered>
        <ModalHeader toggle={handleCloseAdd}>Add Competency</ModalHeader>

        {isLoading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
        ) : null}

        {!isEmpty(postCompetencyDetails) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Add Successful'}
          />
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
                  <Label for="definition-Input">Definition</Label>
                  <Input
                    name="definition"
                    type="text"
                    className="form-control"
                    id="definition-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.definition || ''}
                    invalid={
                      validation.touched.definition &&
                      validation.errors.definition
                        ? true
                        : false
                    }
                  />
                  {validation.touched.definition &&
                  validation.errors.definition ? (
                    <FormFeedback type="invalid">
                      {validation.errors.definition}
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
  modalData: PropTypes.object,
  handleCloseAdd: PropTypes.func,
  _id: PropTypes.string,
}

export default AddCompetencyModelModal
