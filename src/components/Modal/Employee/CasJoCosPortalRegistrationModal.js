import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { sexes, civilStatuses } from 'constants/selectInputs'
import { natureOfAppointments } from 'constants/natureOfAppointments'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeeList,
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
    },
    validationSchema: Yup.object().shape({
      natureOfAppointment: Yup.string().required(),
      firstName: Yup.string().required('First name is a required field'),
      lastName: Yup.string().required('Last name is a required field'),
      birthday: Yup.string().required('Birthday is a required field'),
      sex: Yup.string().required('Select a sex'),
      civilStatus: Yup.string().when('natureOfAppointment', {
        is: val => (val === 'casual' ? true : false),
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
        .required('Use an active email'),
      dailyRate: Yup.number().when('natureOfAppointment', {
        is: val =>
          val === 'job order' || val === 'contract of service' ? true : false,
        then: Yup.number().required('Daily rate is required'),
      }),
    }),
    onSubmit: values => {
      dispatch(addCasJoCosEmployee(values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAddCasJoCos) {
      dispatch(resetEmpResponseAndError())
      formik.resetForm()
    }
  }, [showAddCasJoCos])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseRegisterCasJoCosEmployee)) {
      formik.resetForm()

      handleCloseAddCasJoCos()
      dispatch(resetEmpResponseAndError())
      dispatch(fetchEmployeeList())
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

CasJoCosPortalRegistrationModal.propTypes = {
  showAddCasJoCos: PropTypes.bool,
  modalNatureOfAppointment: PropTypes.string,
  handleCloseAddCasJoCos: PropTypes.func,
}

export default CasJoCosPortalRegistrationModal
