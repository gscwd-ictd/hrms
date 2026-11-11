import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import dayjs from 'dayjs'
import {
  getOrganizationDropdown,
  getJobOrderEmployeesForCasual,
} from 'helpers/backend_helper'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { sexes, civilStatuses, listOfRestDays } from 'constants/selectInputs'
import { natureOfAppointments } from 'constants/natureOfAppointments'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeeList,
  fetchSchedules,
  addCasJoCosEmployee,
  resetEmpResponseAndError,
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
  FormText,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

import * as Yup from 'yup'
import { useFormik } from 'formik'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

const CasJoCosPortalRegistrationModal = props => {
  const { showAddCasJoCos, modalNatureOfAppointment, handleCloseAddCasJoCos } =
    props
  const dispatch = useDispatch()

  const {
    responseRegisterCasJoCosEmployee,
    loadingRegisterCasJoCosEmployee,
    errorRegisterCasJoCosEmployee,
  } = useSelector(state => ({
    responseRegisterCasJoCosEmployee:
      state.employee.response.addCasJoCosEmployee,
    loadingRegisterCasJoCosEmployee: state.employee.response.isLoading,
    errorRegisterCasJoCosEmployee: state.employee.response.error,
  }))

  // employee schedules (same list as the Permanent registration)
  const { schedules, loadingSchedules } = useSelector(state => ({
    schedules: state.schedules.schedules,
    loadingSchedules: state.schedules.isLoading,
  }))

  const isCasual = modalNatureOfAppointment === natureOfAppointments.CASUAL
  const isNewRecordFlow =
    modalNatureOfAppointment === natureOfAppointments.CASUAL ||
    modalNatureOfAppointment === natureOfAppointments.JOB_ORDER

  // Casual: new record, or an existing Job Order employee
  const [casualSource, setCasualSource] = useState('new')
  const fromJobOrder = isCasual && casualSource === 'existing'

  // dropdowns
  const [orgOptions, setOrgOptions] = useState([])
  const [jobOrderOptions, setJobOrderOptions] = useState([])
  // result of a successful registration (Employee No. and default portal password)
  const [registered, setRegistered] = useState(null)

  useEffect(() => {
    if (!showAddCasJoCos || !isNewRecordFlow) return
    dispatch(fetchSchedules())
    getOrganizationDropdown()
      .then(options => setOrgOptions(Array.isArray(options) ? options : []))
      .catch(() => setOrgOptions([]))
    if (isCasual) {
      getJobOrderEmployeesForCasual()
        .then(options =>
          setJobOrderOptions(Array.isArray(options) ? options : [])
        )
        .catch(() => setJobOrderOptions([]))
    }
  }, [showAddCasJoCos, modalNatureOfAppointment])

  // personal details are required only for a new record
  const requiredForNew = (schema, message) =>
    schema.when('existingEmployeeId', {
      is: value => !value,
      then: schema.required(message),
    })

  const phoneRegExp =
    /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      natureOfAppointment: modalNatureOfAppointment || '',
      firstName: '',
      middleName: '',
      lastName: '',
      nameExtension: '',
      titlePrefix: '',
      titleSuffix: '',
      birthday: '',
      sex: '',
      civilStatus: '',
      phoneNumber: '',
      email: '',
      dailyRate: '',
      isPerPieceRate: false,
      existingEmployeeId: '',
      positionTitle: '',
      orgId: '',
      salaryGrade: '',
      stepIncrement: '',
      scheduleId: '',
      scheduleDateFrom: dayjs().format('YYYY-MM-DD'),
      scheduleDateTo: dayjs().endOf('year').format('YYYY-MM-DD'),
      restDays: [],
      effectivityDate: dayjs().format('YYYY-MM-DD'),
    },
    validationSchema: Yup.object().shape({
      natureOfAppointment: Yup.string().required(),
      existingEmployeeId: Yup.string(),
      firstName: requiredForNew(Yup.string(), 'First name is a required field'),
      lastName: requiredForNew(Yup.string(), 'Last name is a required field'),
      birthday: requiredForNew(Yup.string(), 'Birthday is a required field'),
      sex: requiredForNew(Yup.string(), 'Select a sex'),
      civilStatus: Yup.string().when(['natureOfAppointment', 'existingEmployeeId'], {
        is: (nature, existing) => nature === 'casual' && !existing,
        then: Yup.string().required('Select a civil status'),
      }),
      phoneNumber: Yup.string().when('existingEmployeeId', {
        is: value => !value,
        then: Yup.string()
          .required('Phone number is a required field')
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(11, 'Too short')
          .max(11, 'Too long'),
      }),
      email: Yup.string().when('existingEmployeeId', {
        is: value => !value,
        then: Yup.string()
          .email('Must be a valid Email')
          .matches(/@[^.]*\./)
          .required('Use an active email'),
      }),
      positionTitle: Yup.string().when('natureOfAppointment', {
        is: val => val === 'casual' || val === 'job order',
        then: Yup.string().required('Position title is required'),
      }),
      salaryGrade: Yup.number().when('natureOfAppointment', {
        is: val => val === 'casual',
        then: Yup.number()
          .typeError('Salary grade is required')
          .integer()
          .min(1, 'Salary grade is 1 to 33')
          .max(33, 'Salary grade is 1 to 33')
          .required('Salary grade is required'),
      }),
      stepIncrement: Yup.number().when('natureOfAppointment', {
        is: val => val === 'casual',
        then: Yup.number()
          .typeError('Step is required')
          .integer()
          .min(1, 'Step is 1 to 8')
          .max(8, 'Step is 1 to 8')
          .required('Step is required'),
      }),
      scheduleId: Yup.string().when('natureOfAppointment', {
        is: val => val === 'casual' || val === 'job order',
        then: Yup.string().required('Please select a schedule'),
      }),
      scheduleDateFrom: Yup.string().when('natureOfAppointment', {
        is: val => val === 'casual' || val === 'job order',
        then: Yup.string().required('Date from is required'),
      }),
      scheduleDateTo: Yup.string().when('natureOfAppointment', {
        is: val => val === 'casual' || val === 'job order',
        then: Yup.string()
          .required('Date to is required')
          .test(
            'after-from',
            'Date to must be on or after date from',
            function (value) {
              return !value || !this.parent.scheduleDateFrom || value >= this.parent.scheduleDateFrom
            }
          ),
      }),
      restDays: Yup.array().when('natureOfAppointment', {
        is: val => val === 'casual' || val === 'job order',
        then: Yup.array().min(1, 'Select the rest days'),
      }),
      orgId: Yup.string().when('natureOfAppointment', {
        is: val => val === 'casual' || val === 'job order',
        then: Yup.string().required('Select the office, department or division'),
      }),
      dailyRate: Yup.number().when('natureOfAppointment', {
        is: val =>
          val === 'job order' || val === 'contract of service' ? true : false,
        then: Yup.number().required('Daily rate is required'),
      }),
    }),
    onSubmit: values => {
      const payload = fromJobOrder
        ? {
          natureOfAppointment: values.natureOfAppointment,
          existingEmployeeId: values.existingEmployeeId,
          positionTitle: values.positionTitle,
          orgId: values.orgId,
          effectivityDate: values.effectivityDate,
          salaryGrade: values.salaryGrade,
          stepIncrement: values.stepIncrement,
          scheduleId: values.scheduleId,
          scheduleDateFrom: values.scheduleDateFrom,
          scheduleDateTo: values.scheduleDateTo,
          restDays: values.restDays,
        }
        : { ...values, existingEmployeeId: undefined }
      if (fromJobOrder && !values.existingEmployeeId) return
      dispatch(addCasJoCosEmployee(payload))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAddCasJoCos) {
      dispatch(resetEmpResponseAndError())
      formik.resetForm()
      setRegistered(null)
      setCasualSource('new')
    }
  }, [showAddCasJoCos])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseRegisterCasJoCosEmployee)) {
      formik.resetForm()
      dispatch(fetchEmployeeList())
      if (isNewRecordFlow) {
        // keep the modal open to show the Employee No. and the default portal password
        setRegistered(responseRegisterCasJoCosEmployee)
      } else {
        handleCloseAddCasJoCos()
        dispatch(resetEmpResponseAndError())
      }
    }
  }, [responseRegisterCasJoCosEmployee])

  return (
    <>
      <Modal
        isOpen={showAddCasJoCos}
        toggle={handleCloseAddCasJoCos}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={handleCloseAddCasJoCos}
          className="text-capitalize"
        >
          Register {modalNatureOfAppointment} Employee
        </ModalHeader>

        {/* Info Alert with Spinner */}
        {loadingRegisterCasJoCosEmployee ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}

        {/* Error Alert */}
        {errorRegisterCasJoCosEmployee ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorRegisterCasJoCosEmployee}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(responseRegisterCasJoCosEmployee) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee succesfully added'}
          />
        ) : null}

        <ModalBody>
          {registered ? (
            <Alert color="success" className="mb-0">
              <h5 className="alert-heading">Registered</h5>
              <p className="mb-1">
                Employee No.: <strong>{registered.companyId}</strong>
              </p>
              {registered.employeeSchedule ? (
                <p className="mb-1">
                  Schedule: <strong>{registered.employeeSchedule.schedule}</strong>{' '}
                  ({registered.employeeSchedule.dateFrom} to{' '}
                  {registered.employeeSchedule.dateTo})
                </p>
              ) : null}
              {registered.defaultPassword ? (
                <>
                  <p className="mb-1">
                    Employee Portal login: <strong>{registered.email}</strong>
                  </p>
                  <p className="mb-1">
                    Default password:{' '}
                    <strong style={{ userSelect: 'all' }}>
                      {registered.defaultPassword}
                    </strong>
                  </p>
                  <small>
                    Give these to the employee and ask them to change the
                    password after the first login.
                  </small>
                </>
              ) : (
                <p className="mb-0">
                  Appointed as Casual. The Employee No. and Employee Portal
                  login stay the same.
                </p>
              )}
            </Alert>
          ) : (
            <Form
              id="empInfoForm"
              onSubmit={e => {
                e.preventDefault()
                formik.handleSubmit()
                return false
              }}
            >
              <div className="outer">
                {/* Casual: new record or an existing Job Order employee */}
                {isCasual ? (
                  <Row className="mb-2">
                    <Col sm={12}>
                      <FormGroup tag="fieldset" className="d-flex gap-4">
                        <div className="form-check">
                          <Input
                            type="radio"
                            id="casualSource-new"
                            className="form-check-input"
                            checked={casualSource === 'new'}
                            onChange={() => {
                              setCasualSource('new')
                              formik.setFieldValue('existingEmployeeId', '')
                            }}
                          />
                          <Label className="form-check-label" for="casualSource-new">
                            New employee
                          </Label>
                        </div>
                        <div className="form-check">
                          <Input
                            type="radio"
                            id="casualSource-existing"
                            className="form-check-input"
                            checked={casualSource === 'existing'}
                            onChange={() => setCasualSource('existing')}
                          />
                          <Label
                            className="form-check-label"
                            for="casualSource-existing"
                          >
                            Existing Job Order employee
                          </Label>
                        </div>
                      </FormGroup>
                    </Col>
                    {fromJobOrder ? (
                      <Col sm={12}>
                        <FormGroup>
                          <Label for="existingEmployeeId">
                            Job Order Employee
                          </Label>
                          <Select
                            inputId="existingEmployeeId"
                            options={jobOrderOptions}
                            value={
                              jobOrderOptions.find(
                                o => o.value === formik.values.existingEmployeeId
                              ) || null
                            }
                            onChange={option =>
                              formik.setFieldValue(
                                'existingEmployeeId',
                                option ? option.value : ''
                              )
                            }
                            placeholder="Select a Job Order employee"
                          />
                          {fromJobOrder &&
                            formik.submitCount > 0 &&
                            !formik.values.existingEmployeeId ? (
                            <div className="text-danger small mt-1">
                              Select a Job Order employee
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    ) : null}
                  </Row>
                ) : null}

                {/* position and designation */}
                {isNewRecordFlow ? (
                  <Row>
                    <Col sm={5}>
                      <FormGroup>
                        <Label for="positionTitle">Position Title</Label>
                        <Input
                          name="positionTitle"
                          id="positionTitle-Input"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.positionTitle}
                          invalid={
                            formik.touched.positionTitle &&
                              formik.errors.positionTitle
                              ? true
                              : false
                          }
                        />
                        <FormFeedback type="invalid">
                          {formik.errors.positionTitle}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="orgId">Office / Department / Division</Label>
                        <Select
                          inputId="orgId"
                          options={orgOptions}
                          value={
                            orgOptions.find(o => o.value === formik.values.orgId) ||
                            null
                          }
                          onChange={option =>
                            formik.setFieldValue('orgId', option ? option.value : '')
                          }
                          onBlur={() => formik.setFieldTouched('orgId', true)}
                          placeholder="Select..."
                        />
                        {formik.touched.orgId && formik.errors.orgId ? (
                          <div className="text-danger small mt-1">
                            {formik.errors.orgId}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label for="effectivityDate">Effectivity Date</Label>
                        <Input
                          name="effectivityDate"
                          id="effectivityDate-Input"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.effectivityDate}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                ) : null}

                {/* Casual: salary grade and step (for the NOSA) */}
                {isCasual ? (
                  <Row>
                    {[
                      ['salaryGrade', 'Salary Grade', 1, 33],
                      ['stepIncrement', 'Step', 1, 8],
                    ].map(([field, label, min, max]) => (
                      <Col sm={3} key={field}>
                        <FormGroup>
                          <Label for={field}>{label}</Label>
                          <Input
                            name={field}
                            id={`${field}-Input`}
                            type="number"
                            min={min}
                            max={max}
                            step={1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[field]}
                            invalid={
                              formik.touched[field] && formik.errors[field]
                                ? true
                                : false
                            }
                          />
                          <FormFeedback type="invalid">
                            {formik.errors[field]}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    ))}
                  </Row>
                ) : null}

                {/* employee schedule (EMS) */}
                {isNewRecordFlow ? (
                  <Row>
                    <Col sm={12}>
                      <h6 className="mt-1 mb-2">Employee Schedule</h6>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        <Label>Schedule Range</Label>
                        <div className="d-flex align-items-center gap-2">
                          <Input
                            name="scheduleDateFrom"
                            type="date"
                            value={formik.values.scheduleDateFrom}
                            max={formik.values.scheduleDateTo || undefined}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.scheduleDateFrom &&
                                formik.errors.scheduleDateFrom
                                ? true
                                : false
                            }
                          />
                          <span>to</span>
                          <Input
                            name="scheduleDateTo"
                            type="date"
                            value={formik.values.scheduleDateTo}
                            min={formik.values.scheduleDateFrom || undefined}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.scheduleDateTo &&
                                formik.errors.scheduleDateTo
                                ? true
                                : false
                            }
                          />
                        </div>
                        {formik.errors.scheduleDateFrom ||
                          formik.errors.scheduleDateTo ? (
                          <div className="text-danger small mt-1">
                            {formik.errors.scheduleDateFrom ||
                              formik.errors.scheduleDateTo}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="scheduleId">Schedule</Label>
                        <Select
                          inputId="scheduleId"
                          options={schedules}
                          value={
                            (schedules || []).find(
                              o => o.value && o.value.id === formik.values.scheduleId
                            ) || null
                          }
                          onChange={option =>
                            formik.setFieldValue(
                              'scheduleId',
                              option ? option.value.id : ''
                            )
                          }
                          onBlur={() => formik.setFieldTouched('scheduleId', true)}
                          isDisabled={loadingSchedules ? true : false}
                          isLoading={loadingSchedules ? true : false}
                          placeholder="Select a schedule"
                        />
                        {formik.touched.scheduleId && formik.errors.scheduleId ? (
                          <div className="text-danger small mt-1">
                            {formik.errors.scheduleId}
                          </div>
                        ) : null}
                        {(() => {
                          const selected = (schedules || []).find(
                            o => o.value && o.value.id === formik.values.scheduleId
                          )
                          return selected ? (
                            <div className="text-muted small mt-1">
                              Time In: {selected.value.timeIn} | Time Out:{' '}
                              {selected.value.timeOut} | Shift:{' '}
                              {selected.value.shift || ''}
                            </div>
                          ) : null
                        })()}
                      </FormGroup>
                    </Col>
                    <Col sm={12}>
                      <FormGroup>
                        <Label for="restDays">Rest Days</Label>
                        <Select
                          inputId="restDays"
                          isMulti={true}
                          options={listOfRestDays}
                          value={listOfRestDays.filter(o =>
                            formik.values.restDays.includes(o.value)
                          )}
                          onChange={options =>
                            formik.setFieldValue(
                              'restDays',
                              (options || []).map(o => o.value)
                            )
                          }
                          onBlur={() => formik.setFieldTouched('restDays', true)}
                          placeholder="Select rest days"
                        />
                        {formik.touched.restDays && formik.errors.restDays ? (
                          <div className="text-danger small mt-1">
                            {formik.errors.restDays}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                ) : null}

                <Row>
                  {!fromJobOrder ? (
                    <>
                      {/* first name input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="firstName">First Name</Label>
                          <Input
                            name="firstName"
                            type="text"
                            className="form-control"
                            id="firstName-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName || ''}
                            invalid={
                              formik.touched.firstName && formik.errors.firstName
                                ? true
                                : false
                            }
                          />
                          {formik.touched.firstname && formik.errors.firstName ? (
                            <FormFeedback type="invalid">
                              {formik.errors.firstName}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>

                      {/* middle name input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="middleName">Middle Name</Label>
                          <Input
                            name="middleName"
                            type="text"
                            className="form-control"
                            id="middleName-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.middleName || ''}
                          />
                        </FormGroup>
                      </Col>

                      {/* last name input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="firstName">Last Name</Label>
                          <Input
                            name="lastName"
                            type="text"
                            className="form-control"
                            id="lastName-Input"
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

                      {/* name extension input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="nameExtension">Name Extension</Label>
                          <Input
                            name="nameExtension"
                            type="text"
                            className="form-control"
                            id="nameExtension-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nameExtension || ''}
                          />
                          <FormText color="muted">(Jr, Sr, II)</FormText>
                        </FormGroup>
                      </Col>

                      {/* title prefix input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="titlePrefix">Title Prefix</Label>
                          <Input
                            name="titlePrefix"
                            type="text"
                            className="form-control"
                            id="titlePrefix-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.titlePrefix || ''}
                          />
                          <FormText color="muted">(Atty, Engr, Dr)</FormText>
                        </FormGroup>
                      </Col>

                      {/* title suffix input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="titleSuffix">Title Suffix</Label>
                          <Input
                            name="titleSuffix"
                            type="text"
                            className="form-control"
                            id="titleSuffix-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.titleSuffix || ''}
                          />
                          <FormText color="muted">(MPA, CPA, PhD)</FormText>
                        </FormGroup>
                      </Col>

                      {/* birthday date field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="birthday">Birthday</Label>
                          <Input
                            name="birthday"
                            type="date"
                            className="form-control"
                            id="birthday-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.birthday || ''}
                            invalid={
                              formik.touched.birthday && formik.errors.birthday
                                ? true
                                : false
                            }
                          />
                          {formik.touched.birthday && formik.errors.birthday ? (
                            <FormFeedback type="invalid">
                              {formik.errors.birthday}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>

                      {/* sex select field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="sex">Sex</Label>
                          <Input
                            name="sex"
                            type="select"
                            className="form-control"
                            id="sex-select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sex || ''}
                            invalid={
                              formik.touched.sex && formik.errors.sex ? true : false
                            }
                          >
                            <option value="">Choose...</option>
                            {sexes.map((sex, idx) => (
                              <option key={idx} value={sex}>
                                {sex}
                              </option>
                            ))}
                          </Input>
                          {formik.touched.sex && formik.errors.sex ? (
                            <FormFeedback type="invalid">
                              {formik.errors.sex}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>

                      {/* civil status select field */}
                      {modalNatureOfAppointment === natureOfAppointments.CASUAL ? (
                        <Col sm={4}>
                          <FormGroup>
                            <Label for="civilStatus">Civil Status</Label>
                            <Input
                              name="civilStatus"
                              type="select"
                              className="form-control"
                              id="civilStatus-select"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.civilStatus || ''}
                              invalid={
                                formik.touched.civilStatus &&
                                  formik.errors.civilStatus
                                  ? true
                                  : false
                              }
                            >
                              <option value="">Choose...</option>
                              {civilStatuses.map((civilStatus, idx) => (
                                <option key={idx} value={civilStatus}>
                                  {civilStatus}
                                </option>
                              ))}
                            </Input>
                            {formik.touched.civilStatus &&
                              formik.errors.civilStatus ? (
                              <FormFeedback type="invalid">
                                {formik.errors.sex}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      ) : null}

                      {/* phone number input field */}
                      <Col sm={4}>
                        <FormGroup>
                          <Label for="phoneNumber">Phone No.</Label>
                          <Input
                            name="phoneNumber"
                            type="tel"
                            className="form-control"
                            id="phoneNumber-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber || ''}
                            invalid={
                              formik.touched.phoneNumber && formik.errors.phoneNumber
                                ? true
                                : false
                            }
                          />
                          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <FormFeedback type="invalid">
                              {formik.errors.phoneNumber}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>

                      {/* email input field */}
                      <Col sm={4}>
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

                    </>
                  ) : null}

                  {/* daily rate input field & checkbox for per piece */}
                  {modalNatureOfAppointment === natureOfAppointments.JOB_ORDER ||
                    modalNatureOfAppointment ===
                    natureOfAppointments.CONTRACT_OF_SERVICE ? (
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="dailyRate">Daily Rate</Label>
                        <Input
                          name="dailyRate"
                          type="number"
                          min={1}
                          step={0.01}
                          className="form-control"
                          id="dailyRate-Input"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dailyRate || ''}
                          invalid={
                            formik.touched.dailyRate && formik.errors.dailyRate
                              ? true
                              : false
                          }
                        />
                        {formik.touched.dailyRate && formik.errors.dailyRate ? (
                          <FormFeedback type="invalid">
                            {formik.errors.dailyRate}
                          </FormFeedback>
                        ) : null}

                        {modalNatureOfAppointment ===
                          natureOfAppointments.CONTRACT_OF_SERVICE ? (
                          <div className="form-check pt-1">
                            <Input
                              name="isPerPieceRate"
                              type="checkbox"
                              className="form-check-input"
                              id="isPerPieceRate-Input"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Label
                              className="form-check-label"
                              for="isPerPieceRate"
                            >
                              Per piece rate
                            </Label>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                  ) : null}
                </Row>
              </div>
            </Form>
          )}
        </ModalBody>

        <ModalFooter>
          {registered ? (
            <Button color="secondary" onClick={handleCloseAddCasJoCos}>
              Close
            </Button>
          ) : (
            <Button type="submit" form="empInfoForm" color="info">
              Register
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  )
}

CasJoCosPortalRegistrationModal.propTypes = {
  showAddCasJoCos: PropTypes.bool,
  modalNatureOfAppointment: PropTypes.string,
  handleCloseAddCasJoCos: PropTypes.func,
}

export default CasJoCosPortalRegistrationModal