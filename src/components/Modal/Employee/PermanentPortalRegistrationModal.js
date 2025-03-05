import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { listOfRestDays } from 'constants/selectInputs'

import { useDispatch, useSelector } from 'react-redux'
import {
  addPermanentEmployee,
  fetchSchedules,
  resetEmpResponseAndError,
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

const PermanentPortalRegistrationModal = props => {
  const { showAddPerm, handleCloseAddPerm } = props
  const dispatch = useDispatch()
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [selectedRestDays, setSelectedRestDays] = useState([])

  const {
    responseRegisterPermanentEmployee,
    loadingRegisterPermanentEmployee,
    errorRegisterPermanentEmployee,

    hiredExternalConfirmedApplicants,
    loadinghiredExternalConfirmedApplicants,
    errorhiredExternalConfirmedApplicants,

    schedules,
    loadingSchedules,
    errorSchedules,
  } = useSelector(state => ({
    // redux state for employee assignment
    responseRegisterPermanentEmployee: state.employee.response.addPermEmployee,
    loadingRegisterPermanentEmployee: state.employee.response.isLoading,
    errorRegisterPermanentEmployee: state.employee.response.error,

    // redux state for list of external, hired, and confirmed applicants
    hiredExternalConfirmedApplicants:
      state.applicants.hiredExternalConfirmedApplicants,
    loadinghiredExternalConfirmedApplicants:
      state.applicants.loading.loadingHiredExternalConfirmedApplicants,
    errorhiredExternalConfirmedApplicants:
      state.applicants.error.errorHiredExternalConfirmedApplicants,

    // redux state for list schedules
    schedules: state.schedules.schedules,
    loadingSchedules: state.schedules.isLoading,
    errorSchedules: state.schedules.error,
  }))

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      applicantId: '',
      positionId: '',
      email: '',
      scheduleId: '',
      restDays: [],
      firstName: '',
      lastName: '',
      middleName: '',
      nameExtension: '',
    },
    validationSchema: Yup.object().shape({
      applicantId: Yup.string().required('Please select an applicant'),
      scheduleId: Yup.string().required('Please select a schedule'),
      restDays: Yup.array().min(2, 'Select atleast 2 rest days'),
      email: Yup.string().required('Please use the official GSCWD email'),
    }),
    onSubmit: values => {
      dispatch(addPermanentEmployee(values))
    },
  })

  // on change of input field for selecting applicant
  const handleSelectedApplicant = selectedOption => {
    setSelectedApplicant(selectedOption)

    formik.setFieldValue('firstName', selectedOption.value.applicantFirstName)
    formik.setFieldValue('lastName', selectedOption.value.applicantLastName)
    formik.setFieldValue('middleName', selectedOption.value.applicantMiddleName)
    formik.setFieldValue(
      'nameExtension',
      selectedOption.value.applicantNameExtension
    )

    formik.setFieldValue('positionId', selectedOption.value.positionId)
  }

  // on change of input field for selecting rest days
  const handleSelectedRestDays = selectedOptions => {
    setSelectedRestDays(selectedOptions)

    let restDays = []
    selectedOptions.map(option => {
      const restDay = option.value
      restDays.push(restDay)
    })

    formik.setFieldValue('restDays', restDays)
  }

  // Reset response state upon close of modal
  useEffect(() => {
    if (showAddPerm) {
      dispatch(fetchHiredExternalConfirmedApplicants())
      dispatch(fetchSchedules())
    } else {
      dispatch(resetEmpResponseAndError())
    }
  }, [showAddPerm])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseRegisterPermanentEmployee)) {
      dispatch(fetchEmployeeList())
      formik.resetForm()

      dispatch(resetEmpResponseAndError())
      setSelectedApplicant(null)
      setSelectedSchedule(null)
      setSelectedRestDays([])

      handleCloseAddPerm()
    }
  }, [responseRegisterPermanentEmployee])

  return (
    <>
      <Modal
        isOpen={showAddPerm}
        toggle={handleCloseAddPerm}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseAddPerm}>
          Portal Registration
        </ModalHeader>

        {/* Info Alert with Spinner */}
        {loadingRegisterPermanentEmployee ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}

        {/* Error Alert */}
        {errorRegisterPermanentEmployee ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorRegisterPermanentEmployee}
          />
        ) : null}
        {errorhiredExternalConfirmedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={'Error: Failed to retrieve applicants'}
          />
        ) : null}
        {errorSchedules ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={'Error: Failed to retrieve schedules'}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(responseRegisterPermanentEmployee) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee successfully registered'}
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
                  <Col sm={12}>
                    <FormGroup>
                      <Label for="applicantId">Applicants</Label>

                      <Select
                        name="applicantId"
                        id="applicantId"
                        onChange={selectedOption => {
                          formik.handleChange('applicantId')(
                            selectedOption.value.applicantId
                          )
                          handleSelectedApplicant(selectedOption)
                        }}
                        onBlur={formik.handleBlur}
                        value={selectedApplicant || ''}
                        getOptionLabel={option =>
                          `${option.label}  |  ${option.value.itemNumber}  |  ${option.value.positionTitle} `
                        }
                        options={hiredExternalConfirmedApplicants}
                        styles={{
                          control: styles => ({
                            ...styles,
                            borderColor:
                              formik.errors.applicantId &&
                              formik.touched.applicantId
                                ? 'red'
                                : styles.borderColor,
                            '&:hover': {
                              borderColor:
                                formik.errors.applicantId &&
                                formik.touched.applicantId
                                  ? 'red'
                                  : styles['&:hover'].borderColor,
                            },
                          }),
                        }}
                        isDisabled={
                          loadinghiredExternalConfirmedApplicants ? true : false
                        }
                        isLoading={
                          loadinghiredExternalConfirmedApplicants ? true : false
                        }
                      />

                      <FormFeedback
                        style={{
                          display:
                            formik.errors.applicantId &&
                            formik.touched.applicantId
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.applicantId}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={7}>
                    <FormGroup>
                      <Label for="scheduleId">Schedules</Label>
                      <Select
                        name="scheduleId"
                        id="scheduleId"
                        onChange={selectedOption => {
                          formik.handleChange('scheduleId')(
                            selectedOption.value.id
                          )
                          setSelectedSchedule(selectedOption)
                        }}
                        onBlur={formik.handleBlur}
                        value={selectedSchedule || ''}
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
                        isDisabled={loadingSchedules ? true : false}
                        isLoading={loadingSchedules ? true : false}
                      />
                      <FormFeedback
                        style={{
                          display: !isEmpty(selectedSchedule)
                            ? 'block'
                            : 'none',
                          color: 'gray',
                        }}
                      >
                        {!isEmpty(selectedSchedule) ? (
                          <>
                            <span className="fw-medium"> Time In:</span>{' '}
                            {selectedSchedule.value.timeIn}
                            &nbsp;<span className="fw-bold">|</span>&nbsp;
                            <span className="fw-medium">Time Out:</span>{' '}
                            {selectedSchedule.value.timeOut}
                            &nbsp;<span className="fw-bold">|</span>&nbsp;
                            <span className="fw-medium">Lunch In:</span>{' '}
                            {selectedSchedule.value.lunchIn
                              ? selectedSchedule.value.lunchIn
                              : '--'}
                            &nbsp;<span className="fw-bold">|</span>&nbsp;
                            <span className="fw-medium">Lunch Out:</span>{' '}
                            {selectedSchedule.value.lunchOut
                              ? selectedSchedule.value.lunchOut
                              : '--'}
                            &nbsp;<span className="fw-bold">|</span>&nbsp;
                            <span className="fw-medium">Shift:</span>{' '}
                            {selectedSchedule.value.shift || ''}
                          </>
                        ) : null}
                      </FormFeedback>

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

                  <Col sm={5}>
                    <FormGroup>
                      <Label for="restDays">Rest Days</Label>
                      <Select
                        name="restDays"
                        id="restDays"
                        isMulti={true}
                        options={listOfRestDays}
                        value={selectedRestDays}
                        onBlur={formik.handleBlur}
                        onChange={selectedOptions => {
                          handleSelectedRestDays(selectedOptions)
                        }}
                        styles={{
                          control: styles => ({
                            ...styles,
                            borderColor:
                              formik.errors.restDays && formik.touched.restDays
                                ? 'red'
                                : styles.borderColor,
                            '&:hover': {
                              borderColor:
                                formik.errors.restDays &&
                                formik.touched.restDays
                                  ? 'red'
                                  : styles['&:hover'].borderColor,
                            },
                          }),
                        }}
                      />

                      <FormFeedback
                        style={{
                          display:
                            formik.errors.restDays && formik.touched.restDays
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.restDays}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col sm={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email-Input"
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

PermanentPortalRegistrationModal.propTypes = {
  showAddPerm: PropTypes.bool,
  handleCloseAddPerm: PropTypes.func,
}

export default PermanentPortalRegistrationModal
