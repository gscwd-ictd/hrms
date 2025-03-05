import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { sexes, civilStatuses } from 'constants/selectInputs'
import { natureOfAppointments } from 'constants/natureOfAppointments'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeeList,
  fetchEmpBasicInfo,
  updateEmpBasicInfo,
  resetEmployeeErrorLog,
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

const EditEmployeeInformationModal = props => {
  const { showEdt, modalData, handleCloseEdt } = props
  const dispatch = useDispatch()

  const {} = useSelector(state => ({}))

  const {
    employeeBasicInformation,
    loadingEmpBasicInfo,
    errorEmpBasicInfo,

    responseUpdateEmpBasicInformation,
    loadingResponseUpdateEmpBasicInfo,
    errorResponseUpdateEmpBasicInfo,
  } = useSelector(state => ({
    employeeBasicInformation: state.employee.employeeBasicInformation,
    loadingEmpBasicInfo: state.employee.isLoading,
    errorEmpBasicInfo: state.employee.error,

    responseUpdateEmpBasicInformation:
      state.employee.response.updateEmpBasicInfo,
    loadingResponseUpdateEmpBasicInfo: state.employee.response.isLoading,
    errorResponseUpdateEmpBasicInfo: state.employee.response.error,
  }))

  const phoneRegExp =
    /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      employeeId: modalData.employmentDetails?.employeeId || '',
      natureOfAppointment:
        modalData.employmentDetails?.natureOfAppointment || '',
      firstName: employeeBasicInformation.firstName || '',
      middleName: employeeBasicInformation.middleName || '',
      lastName: employeeBasicInformation.lastName || '',
      nameExtension: employeeBasicInformation.nameExtension || '',
      titlePrefix: employeeBasicInformation.titlePrefix || '',
      titleSuffix: employeeBasicInformation.titleSuffix || '',
      birthday: employeeBasicInformation.birthday || '',
      sex: employeeBasicInformation.sex || '',
      civilStatus: employeeBasicInformation.civilStatus || '',
      phoneNumber: employeeBasicInformation.phoneNumber || '',
      email: employeeBasicInformation.email || '',
      dailyRate: parseFloat(employeeBasicInformation.dailyRate) || '',
      isPerPieceRate: employeeBasicInformation.isPerPieceRate ? true : false,
    },
    validationSchema: Yup.object().shape({
      employeeId: Yup.string().required(),
      natureOfAppointment: Yup.string().required(),
      firstName: Yup.string().required('First name is a required field'),
      lastName: Yup.string().required('Last name is a required field'),
      birthday: Yup.string().required('Birthday is a required field'),
      sex: Yup.string().required('Select a sex'),
      civilStatus: Yup.string().when('natureOfAppointment', {
        is: val => (val === 'permanent' || val === 'casual' ? true : false),
        then: Yup.string().required('Select a civil status'),
      }),
      phoneNumber: Yup.string()
        .required('Phone number is a required field')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(11, 'Too short')
        .max(11, 'Too long'),
      email: Yup.string()
        .email('Must be a valid Email')
        .matches(/@[^.]*\./)
        .required('Please use the official GSCWD email'),
      dailyRate: Yup.number().when('natureOfAppointment', {
        is: val =>
          val === 'job order' || val === 'contract of service' ? true : false,
        then: Yup.number().required(
          'Daily rate is required for Job Order/Contract of Service employees'
        ),
      }),
    }),
    onSubmit: values => {
      dispatch(updateEmpBasicInfo(values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (showEdt) {
      dispatch(fetchEmpBasicInfo(modalData.employmentDetails?.employeeId))
    } else {
      dispatch(resetEmpResponseAndError())
      dispatch(resetEmployeeErrorLog())
      formik.resetForm()
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseUpdateEmpBasicInformation)) {
      formik.resetForm()

      dispatch(resetEmpResponseAndError())
      handleCloseEdt()
      dispatch(fetchEmployeeList())
    }
  }, [responseUpdateEmpBasicInformation])

  return (
    <>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="lg" centered>
        <ModalHeader toggle={handleCloseEdt}>
          Update Employee Information
        </ModalHeader>

        {/* Info Alert with Spinner */}
        {loadingResponseUpdateEmpBasicInfo ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}
        {loadingEmpBasicInfo ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Pulling Employee
            Basic Information
          </Alert>
        ) : null}

        {/* Error Alert */}
        {errorEmpBasicInfo ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorEmpBasicInfo}
          />
        ) : null}
        {errorResponseUpdateEmpBasicInfo ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorResponseUpdateEmpBasicInfo}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(responseUpdateEmpBasicInformation) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee details succesfully updated'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="empInfoForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <div className="outer">
              <Row>
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
                {modalData.employmentDetails?.natureOfAppointment ===
                  natureOfAppointments.PERMANENT ||
                modalData.employmentDetails?.natureOfAppointment ===
                  natureOfAppointments.CASUAL ? (
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

                {/* daily rate input field & checkbox for per piece */}
                {modalData.employmentDetails?.natureOfAppointment ===
                  natureOfAppointments.JOB_ORDER ||
                modalData.employmentDetails?.natureOfAppointment ===
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

                      {modalData.employmentDetails?.natureOfAppointment ===
                      natureOfAppointments.CONTRACT_OF_SERVICE ? (
                        <div className="form-check pt-1">
                          <Input
                            name="isPerPieceRate"
                            type="checkbox"
                            className="form-check-input"
                            id="isPerPieceRate-Input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={
                              formik.values.isPerPieceRate ? true : false
                            }
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
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="empInfoForm" color="info">
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

EditEmployeeInformationModal.propTypes = {
  showEdt: PropTypes.bool,
  modalData: PropTypes.object,
  handleCloseEdt: PropTypes.func,
}

export default EditEmployeeInformationModal
