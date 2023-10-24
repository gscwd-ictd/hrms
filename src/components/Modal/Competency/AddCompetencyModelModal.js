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
  // fetchProficiencyKeyActions,
  addCompetencyDetails,
  resetCompetencyResponse,
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
  const { error } = useSelector(state => ({
    // const { proficiencyKeyActions, isLoading, error } = useSelector(state => ({
    // proficiencyKeyActions: state.competencyModel.proficiencyKeyActions,
    // isLoading: state.competencyModel.loading.loadingProficiencyKeyActions,
    error: state.competencyModel.error.errorProficiencyKeyActions,
  }))

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
      code: '',
      name: '',
      desc: '',
      proficiencyKeyActions: staticProficiencyKeyActions || [],
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Please enter a code name'),
      name: Yup.string().required('Please enter a name'),
      desc: Yup.string().required('Please enter a competency description'),
      proficiencyKeyActions: Yup.array().of(
        Yup.object().shape({
          level: Yup.string().required('Proficiency level is required'),
          keyAction: Yup.string().required(
            'Proficiency key action is required'
          ),
        })
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      //   dispatch(updateCommittee(modalData._id, values))
      //   resetForm()
    },
  })

  return (
    <React.Fragment>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="lg" centered>
        <ModalHeader toggle={handleCloseAdd}>Add Competency</ModalHeader>

        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
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
                                  <p style={{ color: 'red' }}>
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
          <Button
            type="submit"
            form="addCompetencyForm"
            color="info"
            // onClick={handleUpdateModel}
          >
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
