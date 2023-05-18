import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { updateDivision, getDivisions, resetDivision } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// Formik validation
import * as Yup from 'yup'
import { useFormik } from 'formik'

const EditDivisionModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const { putDivisionRes, isLoading, error } = useSelector(state => ({
    putDivisionRes: state.divisionList.putDivisionRes,
    isLoading: state.divisionList.isLoading,
    error: state.divisionList.error,
  }))

  const { departments } = useSelector(state => ({
    departments: state.departmentList.departments,
  }))

  const defValDepartment = defaultVal => {
    var filteredDeptId

    departments.some(department => {
      if (department.code === defaultVal) {
        filteredDeptId = department._id
        return true
      }
    })
    return filteredDeptId
  }

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: modalData.name || '',
      code: modalData.code || '',
      description: modalData.description || '',
      departmentId: defValDepartment(modalData.departmentCode) || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter a division name'),
      code: Yup.string().required('Please enter a division code'),
      description: Yup.string().required('Please enter a division description'),
      departmentId: Yup.string().required('Please delect a parent department'),
    }),
    onSubmit: values => {
      dispatch(updateDivision(modalData._id, values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetDivision())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(putDivisionRes)) {
      dispatch(getDivisions())
      dispatch(resetDivision())
      handleCloseEdt()
      validation.resetForm()
    }
  }, [putDivisionRes])

  return (
    <>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="lg" centered>
        <ModalHeader toggle={handleCloseEdt}>Edit</ModalHeader>

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

        {!isEmpty(putDivisionRes) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Update Successful'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="editDivisionForm"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="desc-Input">Description</Label>
                  <Input
                    name="description"
                    type="textarea"
                    className="form-control"
                    id="desc-Input"
                    rows="5"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ''}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="department-select">Assigned Department</Label>
                  <Input
                    name="departmentId"
                    type="select"
                    className="form-control"
                    id="department-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.departmentId || ''}
                    invalid={
                      validation.touched.departmentId &&
                      validation.errors.departmentId
                        ? true
                        : false
                    }
                  >
                    <option value="">Choose...</option>
                    {departments.map(department => (
                      <option key={department._id} value={department._id}>
                        {department.code}
                        {' - '}
                        {department.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.departmentId &&
                  validation.errors.departmentId ? (
                    <FormFeedback type="invalid">
                      {validation.errors.departmentId}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="editDivisionForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

EditDivisionModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditDivisionModal
