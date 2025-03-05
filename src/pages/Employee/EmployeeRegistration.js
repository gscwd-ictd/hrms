import 'flatpickr/dist/themes/material_blue.css'
import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import {
  addPermanentEmployee,
  fetchPlantillaPositionsSelect,
  resetEmpResponseAndError,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Row,
  Alert,
  Form,
  Label,
  Input,
  FormText,
  FormFeedback,
} from 'reactstrap'
import Select from 'react-select'

// Extra components
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

// Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const EmployeeRegistration = () => {
  const dispatch = useDispatch()
  const [selectedPosition, setSelectedPosition] = useState(null)

  // form subimission to addPermanentEmployee()
  const {
    responseRegisterPermanentEmployee,
    loadingRegisterPermanentEmployee,
    errorRegisterPermanentEmployee,

    positionsOptions,
    positionsLoading,
    positionsError,
  } = useSelector(state => ({
    // redux state for employee assignment
    responseRegisterPermanentEmployee: state.employee.response.addPermEmployee,
    loadingRegisterPermanentEmployee:
      state.employee.response.loadingRegisterPermanentEmployee,
    errorRegisterPermanentEmployee:
      state.employee.response.errorRegisterPermanentEmployee,

    // redux state for plantilla positions
    positionsOptions: state.plantilla.plantillaPositions,
    positionsLoading: state.plantilla.loadingRegisterPermanentEmployee,
    positionsError: state.plantilla.errorRegisterPermanentEmployee,
  }))

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      nameExtension: '',
      positionId: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Please Enter First Name'),
      lastName: Yup.string().required('Please Enter Last Name'),
      positionId: Yup.string().required('Please Select A Position'),
      email: Yup.string().required('Please Enter An Email'),
    }),
    onSubmit: values => {
      dispatch(addPermanentEmployee(values))
    },
  })

  const handleChangeSelect = selectedOption => {
    setSelectedPosition(selectedOption)
  }

  useEffect(() => {
    if (!isEmpty(responseRegisterPermanentEmployee)) {
      dispatch(fetchPlantillaPositionsSelect())
      dispatch(resetEmpResponseAndError())

      formik.resetForm()
      setSelectedPosition(null)
    }
  }, [responseRegisterPermanentEmployee])

  useEffect(() => {
    dispatch(fetchPlantillaPositionsSelect())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Employee_registration">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Employee Registration"
            />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4"></CardTitle>

                    {/* Info Alert with Spinner */}
                    {loadingRegisterPermanentEmployee ? (
                      <Alert
                        color="info"
                        className="alert-dismissible fade show"
                        role="alert"
                      >
                        <i className="mdi mdi-loading mdi-spin me-2"></i>{' '}
                        Sending Request
                      </Alert>
                    ) : null}

                    {/* errorRegisterPermanentEmployee Alert */}
                    {errorRegisterPermanentEmployee ? (
                      <ToastrNotification
                        toastType={'errorRegisterPermanentEmployee'}
                        notifMessage={errorRegisterPermanentEmployee}
                      />
                    ) : null}
                    {positionsError ? (
                      <ToastrNotification
                        toastType={'errorRegisterPermanentEmployee'}
                        notifMessage={
                          'errorRegisterPermanentEmployee: Failed to retrieve plantilla positions'
                        }
                      />
                    ) : null}

                    {/* Success Alert */}
                    {!isEmpty(responseRegisterPermanentEmployee) ? (
                      <ToastrNotification
                        toastType={'success'}
                        notifMessage={'Employee Successfully Assigned'}
                      />
                    ) : null}

                    <Form
                      onSubmit={e => {
                        e.preventDefault()
                        formik.handleSubmit()
                        return false
                      }}
                    >
                      <div className="outer">
                        <div data-repeater-item className="outer">
                          <Row>
                            <Col sm={4}>
                              <FormGroup>
                                <Label for="formrow-fName-Input">
                                  First Name
                                </Label>
                                <Input
                                  name="firstName"
                                  type="text"
                                  className="form-control"
                                  id="formrow-fName-Input"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.firstName || ''}
                                  invalid={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                      ? true
                                      : false
                                  }
                                />
                                {formik.touched.firstName &&
                                formik.errors.firstName ? (
                                  <FormFeedback type="invalid">
                                    {formik.errors.firstName}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>

                            <Col sm={4}>
                              <FormGroup>
                                <Label for="formrow-lName-Input">
                                  Last Name
                                </Label>
                                <Input
                                  name="lastName"
                                  type="text"
                                  className="form-control"
                                  id="formrow-lName-Input"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.lastName || ''}
                                  invalid={
                                    formik.touched.lastName &&
                                    formik.errors.lastName
                                      ? true
                                      : false
                                  }
                                />
                                {formik.touched.lastName &&
                                formik.errors.lastName ? (
                                  <FormFeedback type="invalid">
                                    {formik.errors.lastName}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>

                            <Col sm={4}>
                              <FormGroup>
                                <Label for="formrow-mName-Input">
                                  Middle Name
                                </Label>
                                <Input
                                  name="middleName"
                                  type="text"
                                  className="form-control"
                                  id="formrow-mName-Input"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.middleName || ''}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col sm={2}>
                              <FormGroup>
                                <Label for="formrow-nameExtension-Input">
                                  Name Extension
                                </Label>
                                <Input
                                  name="nameExtension"
                                  type="text"
                                  className="form-control"
                                  id="formrow-nameExtension-Input"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nameExtension || ''}
                                />
                                <FormText color="muted">(Jr, Sr, II)</FormText>
                              </FormGroup>
                            </Col>

                            <Col sm={5}>
                              <FormGroup>
                                <Label for="position-selection">
                                  Position Title
                                </Label>
                                {positionsLoading ? (
                                  <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                                ) : null}

                                <Select
                                  name="positionId"
                                  id="position-selection"
                                  onChange={selectedOption => {
                                    formik.handleChange('positionId')(
                                      selectedOption.value.positionId
                                    )
                                    handleChangeSelect(selectedOption)
                                  }}
                                  onBlur={formik.handleBlur}
                                  // defaultValue={selectedPosition}
                                  value={selectedPosition || ''}
                                  options={positionsOptions}
                                  styles={{
                                    control: styles => ({
                                      ...styles,
                                      borderColor:
                                        formik.errors.positionId &&
                                        formik.touched.positionId
                                          ? 'red'
                                          : styles.borderColor,
                                      '&:hover': {
                                        borderColor:
                                          formik.errors.positionId &&
                                          formik.touched.positionId
                                            ? 'red'
                                            : styles['&:hover'].borderColor,
                                      },
                                    }),
                                  }}
                                  isDisabled={positionsLoading ? true : false}
                                />

                                <FormFeedback
                                  style={{
                                    display:
                                      formik.errors.positionId &&
                                      formik.touched.positionId
                                        ? 'block'
                                        : 'none',
                                  }}
                                >
                                  {formik.errors.positionId}
                                </FormFeedback>
                              </FormGroup>
                            </Col>

                            <Col sm={5}>
                              <FormGroup>
                                <Label for="formrow-email-Input">Email</Label>
                                <Input
                                  name="email"
                                  type="email"
                                  className="form-control"
                                  id="formrow-email-Input"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.email || ''}
                                  invalid={
                                    formik.touched.email && formik.errors.email
                                      ? true
                                      : false
                                  }
                                />
                                {formik.touched.email && formik.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {formik.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </Row>

                          <FormGroup>
                            <Button type="submit" color="info">
                              Register
                            </Button>
                          </FormGroup>
                        </div>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Employee_registration">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default EmployeeRegistration
