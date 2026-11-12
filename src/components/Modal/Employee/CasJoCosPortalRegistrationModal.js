import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import Select from 'react-select'
import dayjs from 'dayjs'
import { sexes, civilStatuses, listOfRestDays } from 'constants/selectInputs'
import { natureOfAppointments } from 'constants/natureOfAppointments'
import {
  getOrganizationDropdown,
  getJobOrderEmployeesForCasual,
} from 'helpers/backend_helper'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeeList,
  fetchSchedules,
  addCasJoCosEmployee,
  resetEmpResponseAndError,
} from 'store/actions'

import {
  Button,
  ButtonGroup,
  Col,
  FormGroup,
  Row,
  Alert,
  Form,
  Label,
  Input,
  FormFeedback,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

import * as Yup from 'yup'
import { useFormik } from 'formik'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

/** Section title with a divider line */
const SectionTitle = ({ title }) => (
  <div className="d-flex align-items-center gap-2 mt-2 mb-3">
    <h6 className="mb-0 text-nowrap text-uppercase fw-semibold text-muted">
      {title}
    </h6>
    <hr className="flex-grow-1 my-0" />
  </div>
)
SectionTitle.propTypes = { title: PropTypes.string }

/** Red border on a react-select when invalid */
const selectStyles = invalid => ({
  control: styles => ({
    ...styles,
    borderColor: invalid ? 'red' : styles.borderColor,
  }),
})

const isFlowNature = nature =>
  nature === natureOfAppointments.CASUAL ||
  nature === natureOfAppointments.JOB_ORDER

/**
 * Casual / Job Order registration (hris_prod + Employee Portal account + EMS schedule).
 * Sections: Employee Details, Position Details, Schedule Details.
 * Casual: new employee or an existing Job Order employee; step is always 1 (initial onboarding).
 */
const CasJoCosPortalRegistrationModal = props => {
  const { showAddCasJoCos, modalNatureOfAppointment, handleCloseAddCasJoCos } =
    props
  const dispatch = useDispatch()

  const isCasual = modalNatureOfAppointment === natureOfAppointments.CASUAL
  const isJobOrder = modalNatureOfAppointment === natureOfAppointments.JOB_ORDER

  // Casual: new employee, or an existing Job Order employee
  const [casualSource, setCasualSource] = useState('new')
  const fromJobOrder = isCasual && casualSource === 'existing'

  const [orgOptions, setOrgOptions] = useState([])
  const [jobOrderOptions, setJobOrderOptions] = useState([])
  const [loadingJobOrders, setLoadingJobOrders] = useState(false)
  // result of a successful registration (Employee No., default password, schedule)
  const [registered, setRegistered] = useState(null)

  const {
    responseRegisterCasJoCosEmployee,
    loadingRegisterCasJoCosEmployee,
    errorRegisterCasJoCosEmployee,
    schedules,
    loadingSchedules,
  } = useSelector(state => ({
    responseRegisterCasJoCosEmployee:
      state.employee.response.addCasJoCosEmployee,
    loadingRegisterCasJoCosEmployee: state.employee.response.isLoading,
    errorRegisterCasJoCosEmployee: state.employee.response.error,
    schedules: state.schedules.schedules,
    loadingSchedules: state.schedules.isLoading,
  }))

  // dropdown options
  useEffect(() => {
    if (!showAddCasJoCos || !isFlowNature(modalNatureOfAppointment)) return
    dispatch(fetchSchedules())
    getOrganizationDropdown()
      .then(options => setOrgOptions(Array.isArray(options) ? options : []))
      .catch(() => setOrgOptions([]))
    if (isCasual) {
      setLoadingJobOrders(true)
      getJobOrderEmployeesForCasual()
        .then(options =>
          setJobOrderOptions(Array.isArray(options) ? options : [])
        )
        .catch(() => setJobOrderOptions([]))
        .finally(() => setLoadingJobOrders(false))
    }
  }, [showAddCasJoCos, modalNatureOfAppointment])

  const phoneRegExp =
    /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // personal details are required only for a new employee
  const whenNewEmployee = (schema, required) =>
    schema.when('existingEmployeeId', {
      is: value => !value,
      then: required,
    })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      natureOfAppointment: modalNatureOfAppointment || '',
      existingEmployeeId: '',
      // employee details
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
      // position details
      positionTitle: '',
      orgId: '',
      effectivityDate: dayjs().format('YYYY-MM-DD'),
      salaryGrade: '',
      dailyRate: '',
      // schedule details
      scheduleId: '',
      scheduleDateFrom: dayjs().format('YYYY-MM-DD'),
      scheduleDateTo: dayjs().endOf('year').format('YYYY-MM-DD'),
      restDays: [],
    },
    validationSchema: Yup.object().shape({
      natureOfAppointment: Yup.string().required(),
      existingEmployeeId: Yup.string(),
      firstName: whenNewEmployee(
        Yup.string(),
        Yup.string().required('First name is a required field')
      ),
      lastName: whenNewEmployee(
        Yup.string(),
        Yup.string().required('Last name is a required field')
      ),
      birthday: whenNewEmployee(
        Yup.string(),
        Yup.string().required('Birthday is a required field')
      ),
      sex: whenNewEmployee(Yup.string(), Yup.string().required('Select a sex')),
      civilStatus: Yup.string().when(
        ['natureOfAppointment', 'existingEmployeeId'],
        {
          is: (nature, existing) => nature === 'casual' && !existing,
          then: Yup.string().required('Select a civil status'),
        }
      ),
      phoneNumber: whenNewEmployee(
        Yup.string(),
        Yup.string()
          .required('Phone number is a required field')
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(11, 'Too short')
          .max(11, 'Too long')
      ),
      email: whenNewEmployee(
        Yup.string(),
        Yup.string()
          .email('Must be a valid Email')
          .matches(/@[^.]*\./, 'Must be a valid Email')
          .required('Use an active email')
      ),
      positionTitle: Yup.string().required('Position title is required'),
      orgId: Yup.string().required(
        'Select the office, department or division'
      ),
      effectivityDate: Yup.string().required('Effectivity date is required'),
      salaryGrade: Yup.number().when('natureOfAppointment', {
        is: val => val === 'casual',
        then: Yup.number()
          .typeError('Salary grade is required')
          .integer()
          .min(1, 'Salary grade is 1 to 33')
          .max(33, 'Salary grade is 1 to 33')
          .required('Salary grade is required'),
      }),
      dailyRate: Yup.number().when('natureOfAppointment', {
        is: val => val === 'job order',
        then: Yup.number()
          .typeError('Daily rate is required')
          .moreThan(0, 'Daily rate is required')
          .required('Daily rate is required'),
      }),
      scheduleId: Yup.string().required('Please select a schedule'),
      scheduleDateFrom: Yup.string().required('Date from is required'),
      scheduleDateTo: Yup.string()
        .required('Date to is required')
        .test(
          'after-from',
          'Date to must be on or after date from',
          function (value) {
            return (
              !value ||
              !this.parent.scheduleDateFrom ||
              value >= this.parent.scheduleDateFrom
            )
          }
        ),
      restDays: Yup.array().min(1, 'Select the rest days'),
    }),
    // an existing Job Order employee must be selected
    validate: values =>
      fromJobOrder && !values.existingEmployeeId
        ? { existingEmployeeId: 'Select a Job Order employee' }
        : {},
    onSubmit: values => {
      const position = {
        positionTitle: values.positionTitle,
        orgId: values.orgId,
        effectivityDate: values.effectivityDate,
      }
      const schedule = {
        scheduleId: values.scheduleId,
        scheduleDateFrom: values.scheduleDateFrom,
        scheduleDateTo: values.scheduleDateTo,
        restDays: values.restDays,
      }
      // Casual: step is always 1 (initial onboarding)
      const casualGrade = isCasual
        ? { salaryGrade: values.salaryGrade, stepIncrement: 1 }
        : {}

      const payload = fromJobOrder
        ? {
          natureOfAppointment: values.natureOfAppointment,
          existingEmployeeId: values.existingEmployeeId,
          ...position,
          ...casualGrade,
          ...schedule,
        }
        : {
          natureOfAppointment: values.natureOfAppointment,
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          nameExtension: values.nameExtension,
          titlePrefix: values.titlePrefix,
          titleSuffix: values.titleSuffix,
          birthday: values.birthday,
          sex: values.sex,
          civilStatus: values.civilStatus,
          phoneNumber: values.phoneNumber,
          email: values.email,
          ...position,
          ...casualGrade,
          ...(isJobOrder ? { dailyRate: values.dailyRate } : {}),
          ...schedule,
        }
      dispatch(addCasJoCosEmployee(payload))
    },
  })

  // reset when the modal closes
  useEffect(() => {
    if (!showAddCasJoCos) {
      dispatch(resetEmpResponseAndError())
      formik.resetForm()
      setRegistered(null)
      setCasualSource('new')
    }
  }, [showAddCasJoCos])

  // after a successful registration: keep the modal open with the result
  useEffect(() => {
    if (!isEmpty(responseRegisterCasJoCosEmployee)) {
      formik.resetForm()
      dispatch(fetchEmployeeList())
      setRegistered(responseRegisterCasJoCosEmployee)
    }
  }, [responseRegisterCasJoCosEmployee])

  const fieldError = name =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : null

  /** text / date / number input with label and error */
  const renderInput = (
    name,
    label,
    { type = 'text', sm = 4, help, ...rest } = {}
  ) => (
    <Col sm={sm}>
      <FormGroup>
        <Label for={`${name}-Input`}>{label}</Label>
        <Input
          name={name}
          id={`${name}-Input`}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] ?? ''}
          invalid={!!fieldError(name)}
          {...rest}
        />
        {help ? <FormText>{help}</FormText> : null}
        <FormFeedback type="invalid">{fieldError(name)}</FormFeedback>
      </FormGroup>
    </Col>
  )

  /** select input with label and error */
  const renderSelect = (name, label, options, { sm = 4 } = {}) => (
    <Col sm={sm}>
      <FormGroup>
        <Label for={`${name}-select`}>{label}</Label>
        <Input
          name={name}
          id={`${name}-select`}
          type="select"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ''}
          invalid={!!fieldError(name)}
        >
          <option value="">Choose...</option>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Input>
        <FormFeedback type="invalid">{fieldError(name)}</FormFeedback>
      </FormGroup>
    </Col>
  )

  const selectedSchedule = (schedules || []).find(
    option => option.value && option.value.id === formik.values.scheduleId
  )
  const existingError =
    formik.submitCount > 0 ? formik.errors.existingEmployeeId : null

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

        {loadingRegisterCasJoCosEmployee ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}

        {errorRegisterCasJoCosEmployee ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorRegisterCasJoCosEmployee}
          />
        ) : null}

        {!isEmpty(responseRegisterCasJoCosEmployee) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee succesfully registered'}
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
                  Schedule:{' '}
                  <strong>{registered.employeeSchedule.schedule}</strong> (
                  {registered.employeeSchedule.dateFrom} to{' '}
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
              {/* ============ EMPLOYEE DETAILS ============ */}
              <SectionTitle title="Employee Details" />

              {isCasual ? (
                <Row className="mb-3">
                  <Col sm={12}>
                    <ButtonGroup>
                      <Button
                        type="button"
                        color="info"
                        outline={casualSource !== 'new'}
                        onClick={() => {
                          setCasualSource('new')
                          formik.setFieldValue('existingEmployeeId', '')
                        }}
                      >
                        <i className="fas fa-user-plus me-1"></i> New employee
                      </Button>
                      <Button
                        type="button"
                        color="info"
                        outline={casualSource !== 'existing'}
                        onClick={() => setCasualSource('existing')}
                      >
                        <i className="fas fa-user-check me-1"></i> Existing Job
                        Order employee
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              ) : null}

              {fromJobOrder ? (
                <Row>
                  <Col sm={12}>
                    <FormGroup>
                      <Label for="existingEmployeeId">Job Order Employee</Label>
                      <FormText className="d-block mb-1">
                        The employee&apos;s personal details are already in the
                        system and are not encoded again.
                      </FormText>
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
                        isLoading={loadingJobOrders}
                        isClearable
                        placeholder="Search a Job Order employee"
                        noOptionsMessage={() => 'No active Job Order employees'}
                        styles={selectStyles(!!existingError)}
                      />
                      {existingError ? (
                        <div className="text-danger small mt-1">
                          {existingError}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                <Row>
                  {renderInput('firstName', 'First Name')}
                  {renderInput('middleName', 'Middle Name')}
                  {renderInput('lastName', 'Last Name')}
                  {renderInput('nameExtension', 'Name Extension', {
                    help: '(Jr, Sr, II)',
                  })}
                  {renderInput('titlePrefix', 'Title Prefix', {
                    help: '(Atty, Engr, Dr)',
                  })}
                  {renderInput('titleSuffix', 'Title Suffix', {
                    help: '(MPA, CPA, PhD)',
                  })}
                  {renderInput('birthday', 'Birthday', { type: 'date' })}
                  {renderSelect('sex', 'Sex', sexes)}
                  {isCasual
                    ? renderSelect('civilStatus', 'Civil Status', civilStatuses)
                    : null}
                  {renderInput('phoneNumber', 'Phone No.')}
                  {renderInput('email', 'Email', { type: 'email' })}
                </Row>
              )}

              {/* ============ POSITION DETAILS ============ */}
              <SectionTitle title="Position Details" />
              <Row>
                {renderInput('positionTitle', 'Position Title', { sm: 8 })}
                {renderInput('effectivityDate', 'Effectivity Date', {
                  type: 'date',
                })}
                <Col sm={8}>
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
                      styles={selectStyles(!!fieldError('orgId'))}
                    />
                    {fieldError('orgId') ? (
                      <div className="text-danger small mt-1">
                        {fieldError('orgId')}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
                {isCasual ? (
                  <>
                    {renderInput('salaryGrade', 'Salary Grade', {
                      type: 'number',
                      sm: 2,
                      min: 1,
                      max: 33,
                      step: 1,
                    })}
                    <Col sm={2}>
                      <FormGroup>
                        <Label for="stepIncrement-Input">Step</Label>
                        <Input
                          id="stepIncrement-Input"
                          type="number"
                          value={1}
                          disabled
                        />
                        <FormText>Initial onboarding</FormText>
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
                {isJobOrder
                  ? renderInput('dailyRate', 'Daily Rate', {
                    type: 'number',
                    min: 1,
                    step: 0.01,
                  })
                  : null}
              </Row>

              {/* ============ SCHEDULE DETAILS ============ */}
              <SectionTitle title="Schedule Details" />
              <Row>
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
                        invalid={!!fieldError('scheduleDateFrom')}
                      />
                      <span>to</span>
                      <Input
                        name="scheduleDateTo"
                        type="date"
                        value={formik.values.scheduleDateTo}
                        min={formik.values.scheduleDateFrom || undefined}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={!!fieldError('scheduleDateTo')}
                      />
                    </div>
                    {fieldError('scheduleDateFrom') ||
                      fieldError('scheduleDateTo') ? (
                      <div className="text-danger small mt-1">
                        {fieldError('scheduleDateFrom') ||
                          fieldError('scheduleDateTo')}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Label for="scheduleId">Employee Schedule</Label>
                    <Select
                      inputId="scheduleId"
                      options={schedules}
                      value={selectedSchedule || null}
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
                      styles={selectStyles(!!fieldError('scheduleId'))}
                    />
                    {fieldError('scheduleId') ? (
                      <div className="text-danger small mt-1">
                        {fieldError('scheduleId')}
                      </div>
                    ) : selectedSchedule ? (
                      <div className="text-muted small mt-1">
                        Time In: {selectedSchedule.value.timeIn} | Time Out:{' '}
                        {selectedSchedule.value.timeOut} | Shift:{' '}
                        {selectedSchedule.value.shift || ''}
                      </div>
                    ) : null}
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
                      styles={selectStyles(!!fieldError('restDays'))}
                    />
                    {fieldError('restDays') ? (
                      <div className="text-danger small mt-1">
                        {fieldError('restDays')}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          )}
        </ModalBody>

        <ModalFooter>
          {registered ? (
            <Button color="secondary" onClick={handleCloseAddCasJoCos}>
              Close
            </Button>
          ) : (
            <Button
              type="submit"
              form="empInfoForm"
              color="info"
              disabled={loadingRegisterCasJoCosEmployee}
            >
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