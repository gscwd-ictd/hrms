import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeeTemporaryAssignmentList,
  fetchAssignableEmployeeList,
  fetchAllOrganizations,
  addEmployeeForTemporaryAssignment,
  resetEmployeeTemporaryAssignmentResponse,
} from 'store/actions'
import {
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import Select from 'react-select'

import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddEmployeeTempAssignModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const [sortedOrganizationList, setSortedOrganizationList] = useState([])

  // Redux state for assignable employees
  const {
    assignableEmployeeList,
    loadingAssignableEmployeeList,
    errorAssignableEmployeeList,
  } = useSelector(state => ({
    assignableEmployeeList: state.temporaryAssignment.assignableEmployeeList,
    loadingAssignableEmployeeList:
      state.temporaryAssignment.loading.loadingAssignableEmployeeList,
    errorAssignableEmployeeList:
      state.temporaryAssignment.error.errorAssignableEmployeeList,
  }))

  // redux state for all organizations
  const { allOrganizations, loadingAllOrganizations, errorAllOrganizations } =
    useSelector(state => ({
      allOrganizations: state.temporaryAssignment.allOrganizations,
      loadingAllOrganizations:
        state.temporaryAssignment.loading.loadingAllOrganizations,
      errorAllOrganizations:
        state.temporaryAssignment.error.errorAllOrganizations,
    }))

  // redux state for adding employee for temporary assignment
  const {
    postEmployeeTemporaryAssignment,
    loadingPostEmployeeTemporaryAssignment,
    errorPostEmployeeTemporaryAssignment,
  } = useSelector(state => ({
    postEmployeeTemporaryAssignment:
      state.temporaryAssignment.response.postEmployeeTemporaryAssignment,
    loadingPostEmployeeTemporaryAssignment:
      state.temporaryAssignment.loading.loadingPostEmployeeTemporaryAssignment,
    errorPostEmployeeTemporaryAssignment:
      state.temporaryAssignment.error.errorPostEmployeeTemporaryAssignment,
  }))

  // set currentDate when selecting dateFrom
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      employeeId: '',
      organizationId: '',
      dateFrom: '',
    },
    validationSchema: Yup.object().shape({
      employeeId: Yup.string().required('Please select an employee'),
      organizationId: Yup.string().required('Please select organization'),
      dateFrom: Yup.date()
        // .min(currentDate, 'Date start cannot be earlier than the current date')
        // .max(Yup.ref('dateTo'), 'Date from cannot be after date to')
        .required('Please select date start'),
      // .test(
      //   'checkDateFrom',
      //   'Selected date collides with existing employee temporary assignment',
      //   function (value) {
      //     const { employeeId } = this.parent
      //     return !employeeTemporaryAssignmentList.some(
      //       assignment =>
      //         assignment.employeeId === employeeId &&
      //         new Date(assignment.dateFrom) <= new Date(value) &&
      //         new Date(assignment.dateTo) >= new Date(value)
      //     )
      //   }
      // ),
      // dateTo: Yup.date()
      //   .min(Yup.ref('dateFrom'), 'Date to cannot be before date from')
      //   .required('Please select date to')
      //   .test(
      //     'checkDateTo',
      //     'Selected date collides with existing employee temporary assignment',
      //     function (value) {
      //       const { employeeId, dateFrom } = this.parent
      //       return !employeeTemporaryAssignmentList.some(
      //         assignment =>
      //           assignment.employeeId === employeeId &&
      //           new Date(assignment.dateFrom) <= new Date(dateFrom) &&
      //           new Date(assignment.dateTo) >= new Date(value)
      //       )
      //     }
      //   ),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(addEmployeeForTemporaryAssignment(values))
      resetForm()
    },
  })

  // filter organization list where the original employee org cannot be selected
  useEffect(() => {
    if (!isEmpty(selectedEmployee)) {
      const newOrgList = allOrganizations.filter(
        org => org._id !== selectedEmployee.value.organizationId
      )
      setSortedOrganizationList(newOrgList)
    }
  }, [selectedEmployee, allOrganizations])

  // Initial fetch of data for select fields on assignable employees and organizations
  useEffect(() => {
    if (showAdd) {
      dispatch(fetchAssignableEmployeeList())
      dispatch(fetchAllOrganizations())
    } else {
      formik.resetForm()
      setSelectedEmployee(null)
      setSelectedOrganization(null)
      setSortedOrganizationList([])
      dispatch(resetEmployeeTemporaryAssignmentResponse())
    }
  }, [showAdd])

  useEffect(() => {
    if (!isEmpty(postEmployeeTemporaryAssignment)) {
      formik.resetForm()
      setSelectedEmployee(null)
      setSelectedOrganization(null)
      setSortedOrganizationList([])
      dispatch(fetchEmployeeTemporaryAssignmentList())
      dispatch(resetEmployeeTemporaryAssignmentResponse())
      handleCloseAdd()
    }
  }, [postEmployeeTemporaryAssignment])

  return (
    <>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="md" centered>
        <ModalHeader toggle={handleCloseAdd}>
          Assign Employee for Temporary Assignment
        </ModalHeader>

        {/* Notifications */}
        {loadingPostEmployeeTemporaryAssignment ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorPostEmployeeTemporaryAssignment ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPostEmployeeTemporaryAssignment}
          />
        ) : null}

        {errorAssignableEmployeeList ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorAssignableEmployeeList}
          />
        ) : null}

        {errorAllOrganizations ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorAllOrganizations}
          />
        ) : null}

        {!isEmpty(postEmployeeTemporaryAssignment) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee assigned for temporary assignment'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="addEmployeeTemporaryAssignmentForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col md={12}>
                {/* Assignable employee select */}
                <FormGroup>
                  <Label for="employee-selection">Employee</Label>
                  {loadingAssignableEmployeeList ? (
                    <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                  ) : null}

                  <Select
                    name="employeeId"
                    id="employee-selection"
                    onChange={selectedEmployeeOption => {
                      formik.setFieldValue(
                        'employeeId',
                        selectedEmployeeOption
                          ? selectedEmployeeOption.value.employeeId
                          : ''
                      )
                      setSelectedEmployee(selectedEmployeeOption)
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      // Object.keys(selectedEmployee).length > 0
                      //   ? selectedEmployee
                      //   : null
                      selectedEmployee || ''
                    }
                    options={assignableEmployeeList}
                    getOptionLabel={option => `${option.label}`}
                    getOptionValue={option => `${option.value}`}
                    styles={{
                      control: styles => ({
                        ...styles,
                        borderColor:
                          formik.errors.employeeId && formik.touched.employeeId
                            ? 'red'
                            : styles.borderColor,
                        '&:hover': {
                          borderColor:
                            formik.errors.employeeId &&
                            formik.touched.employeeId
                              ? 'red'
                              : styles['&:hover'].borderColor,
                        },
                      }),
                    }}
                    isDisabled={loadingAssignableEmployeeList}
                    isClearable={true}
                  />

                  <FormFeedback
                    style={{
                      display:
                        formik.errors.employeeId && formik.touched.employeeId
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {formik.errors.employeeId}
                  </FormFeedback>
                </FormGroup>

                {/* Organization select */}
                <FormGroup>
                  <Label for="organization-selection">Organization</Label>
                  {loadingAllOrganizations ? (
                    <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                  ) : null}

                  <Select
                    name="organizationId"
                    id="organization-selection"
                    onChange={selectedOrganizationOption => {
                      formik.setFieldValue(
                        'organizationId',
                        selectedOrganizationOption
                          ? selectedOrganizationOption._id
                          : ''
                      )
                      setSelectedOrganization(selectedOrganizationOption)
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      // Object.keys(selectedOrganization).length > 0
                      //   ? selectedOrganization
                      //   : null
                      selectedOrganization || ''
                    }
                    options={sortedOrganizationList}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option._id}`}
                    styles={{
                      control: styles => ({
                        ...styles,
                        borderColor:
                          formik.errors.organizationId &&
                          formik.touched.organizationId
                            ? 'red'
                            : styles.borderColor,
                        '&:hover': {
                          borderColor:
                            formik.errors.organizationId &&
                            formik.touched.organizationId
                              ? 'red'
                              : styles['&:hover'].borderColor,
                        },
                      }),
                    }}
                    isDisabled={loadingAllOrganizations}
                    isClearable={true}
                  />

                  <FormFeedback
                    style={{
                      display:
                        formik.errors.organizationId &&
                        formik.touched.organizationId
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {formik.errors.organizationId}
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="dateFrom">Date Start</Label>
                  <Input
                    name="dateFrom"
                    type="date"
                    className="form-control"
                    id="dateFrom"
                    required
                    value={formik.values.dateFrom || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.dateFrom && formik.errors.dateFrom
                        ? true
                        : false
                    }
                  />
                  {formik.touched.dateFrom && formik.errors.dateFrom ? (
                    <FormFeedback type="invalid">
                      {formik.errors.dateFrom}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                {/* <FormGroup>
                  <Label for="dateTo">Date To</Label>
                  <Input
                    name="dateTo"
                    type="date"
                    className="form-control"
                    id="dateTo"
                    required
                    value={formik.values.dateTo || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.dateTo && formik.errors.dateTo
                        ? true
                        : false
                    }
                  />
                  {formik.touched.dateTo && formik.errors.dateTo ? (
                    <FormFeedback type="invalid">
                      {formik.errors.dateTo}
                    </FormFeedback>
                  ) : null}
                </FormGroup> */}
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="addEmployeeTemporaryAssignmentForm"
            color="info"
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

AddEmployeeTempAssignModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default AddEmployeeTempAssignModal
