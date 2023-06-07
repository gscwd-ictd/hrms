import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { listOfRestDays } from 'constants/selectInputs'

import { useDispatch, useSelector } from 'react-redux'
import {
  submitEmpAssgn,
  fetchPlantillaPositionsSelect,
  fetchSchedules,
  resetEmpAssgnResponse,
  resetPlantillaPositions,
  fetchEmployeeList,
  fetchHiredExternalConfirmedApplicants,
} from 'store/actions'

import {
  Button,
  Col,
  FormGroup,
  Row,
  Alert,
  Form,
  Label,
  Input,
  FormText,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import Select from 'react-select'
import ToastrNotification from 'components/Notifications/ToastrNotification'

import * as Yup from 'yup'
import { useFormik } from 'formik'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

const PortalRegistrationModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [selectedRestDays, setSelectedRestDays] = useState([])

  // redux state for employee assignment
  const { empAssignmentRes, isLoading, error } = useSelector(state => ({
    empAssignmentRes: state.employee.empAssignmentRes,
    isLoading: state.employee.isLoading,
    error: state.employee.error,
  }))

  // redux state for list of plantilla positions
  const { positionsOptions, positionsLoading, positionsError } = useSelector(
    state => ({
      positionsOptions: state.plantilla.plantillaPositions,
      positionsLoading: state.plantilla.isLoading,
      positionsError: state.plantilla.error,
    })
  )

  const {
    hiredExternalConfirmedApplicants,
    loadinghiredExternalConfirmedApplicants,
    errorhiredExternalConfirmedApplicants,

    schedules,
    schedulesLoading,
    schedulesError,
  } = useSelector(state => ({
    // redux state for list of external, hired, and confirmed applicants
    hiredExternalConfirmedApplicants:
      state.applicants.hiredExternalConfirmedApplicants,
    loadinghiredExternalConfirmedApplicants:
      state.applicants.loading.loadinghiredExternalConfirmedApplicants,
    errorhiredExternalConfirmedApplicants:
      state.applicants.error.errorhiredExternalConfirmedApplicants,

    // redux state for list schedules
    schedules: state.schedules.schedules,
    schedulesLoading: state.schedules.isLoading,
    schedulesError: state.schedules.error,
  }))

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      applicantId: '',
      firstName: '',
      lastName: '',
      middleName: '',
      nameExtension: '',
      email: '',
      salaryGrade: 0,
      scheduleId: '',
      restDays: [],
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Please enter a first name'),
      lastName: Yup.string().required('Please enter a last name'),
      email: Yup.string().required('Please enter an email address'),

      scheduleId: Yup.string().required('Please select a schedule.'),
    }),
    onSubmit: values => {
      dispatch(submitEmpAssgn(values))
    },
  })

  const handleChangeSelect = selectedOption => {
    setSelectedPosition(selectedOption)
    formik.values.salaryGrade = selectedOption.value.salaryGrade
  }

  // Reset response state upon close of modal
  useEffect(() => {
    if (showAdd) {
      dispatch(fetchPlantillaPositionsSelect())
      dispatch(fetchSchedules())
      dispatch(fetchHiredExternalConfirmedApplicants())
    } else {
      dispatch(resetEmpAssgnResponse())
      dispatch(resetPlantillaPositions())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(empAssignmentRes)) {
      dispatch(resetPlantillaPositions())
      dispatch(resetEmpAssgnResponse())
      dispatch(fetchEmployeeList())

      formik.resetForm()
      setSelectedPosition(null)
    }
  }, [empAssignmentRes])

  return (
    <>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="xl" centered>
        <ModalHeader toggle={handleCloseAdd}>Portal Registration</ModalHeader>

        {/* Info Alert with Spinner */}
        {isLoading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}

        {/* Error Alert */}
        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
        ) : null}
        {positionsError ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={'Error: Failed to retrieve plantilla positions'}
          />
        ) : null}
        {errorhiredExternalConfirmedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={'Error: Failed to retrieve applicants'}
          />
        ) : null}
        {schedulesError ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={'Error: Failed to retrieve schedules'}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(empAssignmentRes) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee Successfully Assigned'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="portalRegistrationForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <div className="outer">
              <div className="outer">
                <Row>
                  <Col sm={4}>
                    <FormGroup>
                      <Label for="formrow-fName-Input">First Name</Label>
                      <Input
                        name="firstName"
                        type="text"
                        id="formrow-fName-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName || ''}
                        invalid={
                          formik.touched.firstName && formik.errors.firstName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.firstName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={4}>
                    <FormGroup>
                      <Label for="formrow-lName-Input">Last Name</Label>
                      <Input
                        name="lastName"
                        type="text"
                        id="formrow-lName-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName || ''}
                        invalid={
                          formik.touched.lastName && formik.errors.lastName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.lastName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={4}>
                    <FormGroup>
                      <Label for="formrow-mName-Input">Middle Name</Label>
                      <Input
                        name="middleName"
                        type="text"
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
                      <Label for="position-selection">Position Title</Label>
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

                  <Input
                    name="salaryGrade"
                    type="hidden"
                    id="formrow-salaryGrade-Input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.salaryGrade || ''}
                  />
                </Row>

                <Row>
                  <Col sm={8}>
                    <FormGroup>
                      <Label for="position-selection">Schedules</Label>
                      {schedulesLoading ? (
                        <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                      ) : null}

                      <Select
                        name="scheduleId"
                        id="scheduleId"
                        onChange={selectedOption => {
                          formik.handleChange('scheduleId')(
                            selectedOption.value.id
                          )
                          // handleChangeSelect(selectedOption)
                        }}
                        onBlur={formik.handleBlur}
                        // value={selectedPosition || ''}
                        getOptionLabel={option => `${option.name}`}
                        options={schedules}
                        styles={{
                          control: styles => ({
                            ...styles,
                            borderColor:
                              formik.errors.scheduleId &&
                              formik.touched.scheduleId
                                ? 'red'
                                : styles.borderColor,
                            '&:hover': {
                              borderColor:
                                formik.errors.scheduleId &&
                                formik.touched.scheduleId
                                  ? 'red'
                                  : styles['&:hover'].borderColor,
                            },
                          }),
                        }}
                        isDisabled={schedulesLoading ? true : false}
                      />

                      <FormFeedback
                        style={{
                          display:
                            formik.errors.scheduleId &&
                            formik.touched.scheduleId
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.scheduleId}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col sm={4}>
                    <FormGroup>
                      <Label>Rest Days</Label>

                      <Select
                        name="scheduleRestDays"
                        id="scheduleRestDays"
                        isMulti={true}
                        options={listOfRestDays}
                        value={selectedRestDays}
                        onBlur={formik.handleBlur}
                        onChange={o => setSelectedRestDays(o)}
                        styles={{
                          control: styles => ({
                            ...styles,
                            borderColor:
                              formik.errors.scheduleId &&
                              formik.touched.scheduleId
                                ? 'red'
                                : styles.borderColor,
                            '&:hover': {
                              borderColor:
                                formik.errors.scheduleId &&
                                formik.touched.scheduleId
                                  ? 'red'
                                  : styles['&:hover'].borderColor,
                            },
                          }),
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="portalRegistrationForm" color="info">
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

PortalRegistrationModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default PortalRegistrationModal
