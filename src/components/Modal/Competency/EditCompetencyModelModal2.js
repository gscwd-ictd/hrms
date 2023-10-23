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
  fetchProficiencyKeyActions,
  updateKeyActionDetails,
  resetCompetencyResponse,
} from 'store/actions'
import PropTypes, { string } from 'prop-types'

// extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'

// TODO
import { isEmpty } from 'lodash'

// TODO
// Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const EditCompetencyModelModal2 = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [definition, setDefinition] = useState('')

  const dispatch = useDispatch()
  const { proficiencyKeyActions, isLoading, error } = useSelector(state => ({
    proficiencyKeyActions: state.competencyModel.proficiencyKeyActions,
    isLoading: state.competencyModel.loading.loadingProficiencyKeyActions,
    error: state.competencyModel.error.errorProficiencyKeyActions,
  }))

  // Update redux state value for specific proficiency level
  const updateValue = (e, index) => {
    dispatch(updateKeyActionDetails(index, e.target.value))
  }

  // TO-DO
  // Update competency model details

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      competencyId: modalData.competencyId || '',
      code: modalData.code || '',
      name: modalData.name || '',
      desc: modalData.desc || '',
      proficiencyKeyActions: proficiencyKeyActions,
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Please enter a code name'),
      name: Yup.string().required('Please enter a name'),
      desc: Yup.string().required('Please enter a competency description'),
      proficiencyKeyActions: Yup.array().of(
        Yup.object().shape({
          keyActions: Yup.string().required('Key action should not be empty'),
        })
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      //   dispatch(updateCommittee(modalData._id, values))
      //   resetForm()
    },
  })

  // Initial dispatch request upon opening of modal
  useEffect(() => {
    if (showEdt) {
      dispatch(fetchProficiencyKeyActions(modalData.competencyId))
    } else {
      dispatch(resetCompetencyResponse())
    }
  }, [showEdt])

  return (
    <React.Fragment>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="lg" centered>
        <ModalHeader toggle={handleCloseEdt}>Edit</ModalHeader>

        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
        ) : null}

        <ModalBody>
          <Form
            id="editCompetencyForm"
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
                {isLoading ? (
                  <LoadingIndicator />
                ) : proficiencyKeyActions ? (
                  <div className="table-responsive">
                    <Table className="table mb-0 tbl-key-actions">
                      <thead className="thead-light">
                        <tr>
                          <th className="thead-pl">Proficiency Level</th>
                          <th className="thead-ka">Key Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proficiencyKeyActions &&
                        proficiencyKeyActions.length > 0 ? (
                          proficiencyKeyActions.map((proficiency, index) => {
                            return (
                              <tr key={proficiency._id}>
                                <td>{proficiency.level}</td>
                                <td className="textarea-container">
                                  <TextareaAutosize
                                    id={index}
                                    minRows={3}
                                    name={`proficiencyKeyActions[${index}].keyActions`}
                                    defaultValue={
                                      validation.values.proficiencyKeyActions
                                        .keyActions || proficiency.keyActions
                                    }
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    style={{
                                      border:
                                        validation.errors
                                          .proficiencyKeyActions &&
                                        validation.errors.proficiencyKeyActions[
                                          index
                                        ] &&
                                        validation.errors.proficiencyKeyActions[
                                          index
                                        ].keyActions
                                          ? '1px solid red'
                                          : '',
                                      padding: '8px',
                                    }}
                                  />
                                  {validation.errors.proficiencyKeyActions &&
                                    validation.errors.proficiencyKeyActions[
                                      index
                                    ] &&
                                    validation.errors.proficiencyKeyActions[
                                      index
                                    ].street && (
                                      <p style={{ color: 'red' }}>
                                        {
                                          validation.errors
                                            .proficiencyKeyActions[index]
                                            .keyActions
                                        }
                                      </p>
                                    )}
                                </td>
                              </tr>
                            )
                          })
                        ) : (
                          <tr>
                            <td colSpan="2" className="ta-center">
                              No Records Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="editCompetencyForm"
            color="info"
            // onClick={handleUpdateModel}
          >
            Update
          </Button>
          <Button color="danger" onClick={handleCloseEdt}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

EditCompetencyModelModal2.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditCompetencyModelModal2
