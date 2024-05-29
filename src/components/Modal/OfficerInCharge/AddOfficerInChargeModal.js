import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSG20UpEmployees,
  fetchVacantManagerialPositions,
  fetchOICList,
  addAssignOIC,
  resetOICResponse,
} from 'store/actions'

import {
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import Select from 'react-select'

// Formik formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddOfficerInChargeModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState(null)

  // Redux state for SG 20 up employees
  const { sg20UpEmployees, loadingSg20UpEmployees, errorSg20UpEmployees } =
    useSelector(state => ({
      sg20UpEmployees: state.officerInCharge.sg20UpEmployees,
      loadingSg20UpEmployees:
        state.officerInCharge.loading.loadingSg20UpEmployees,
      errorSg20UpEmployees: state.officerInCharge.error.errorSg20UpEmployees,
    }))

  // Redux state for vacant managerial positions
  const {
    sg24UpVacantPositions,
    loadingSg24UpVacantPositions,
    errorSg24UpVacantPositions,
  } = useSelector(state => ({
    sg24UpVacantPositions: state.officerInCharge.sg24UpVacantPositions,
    loadingSg24UpVacantPositions:
      state.officerInCharge.loading.loadingSg24UpVacantPositions,
    errorSg24UpVacantPositions:
      state.officerInCharge.error.errorSg24UpVacantPositions,
  }))

  // Redux state for response on assigning OIC
  const { postAssignOIC, loadingPostAssignOIC, errorPostAssignOIC } =
    useSelector(state => ({
      postAssignOIC: state.officerInCharge.response.postAssignOIC,
      loadingPostAssignOIC: state.officerInCharge.loading.loadingPostAssignOIC,
      errorPostAssignOIC: state.officerInCharge.error.errorPostAssignOIC,
    }))

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      employeeId: '',
      orgPositionId: '',
      orgType: '',
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required('Please select an employee'),
      orgPositionId: Yup.string().required('Please select a position'),
      orgType: Yup.string().required('Please select a position'),
    }),
    onSubmit: values => {
      dispatch(addAssignOIC(values))
    },
  })

  const handleSelectEmployee = selectedOption => {
    setSelectedEmployee(selectedOption)
  }

  const handleSelectPosition = selectedOption => {
    setSelectedPosition(selectedOption)
    formik.values.orgType = selectedOption.value.orgType
  }

  // Initial fetch of data for select fields on employees(SG20 up) and vacant positions(SG24)
  useEffect(() => {
    if (showAdd) {
      dispatch(fetchSG20UpEmployees())
      dispatch(fetchVacantManagerialPositions())
    } else {
      dispatch(resetOICResponse())
    }
  }, [showAdd])

  // Reload background table and close modal
  useEffect(() => {
    if (!isEmpty(postAssignOIC)) {
      formik.resetForm()
      setSelectedEmployee(null)
      setSelectedPosition(null)
      dispatch(fetchOICList())
      dispatch(resetOICResponse())
      handleCloseAdd()
    }
  }, [postAssignOIC])

  return (
    <>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="lg" centered>
        <ModalHeader toggle={handleCloseAdd}>
          Assign Officer-In-Charge
        </ModalHeader>

        {/* Notifications */}
        {loadingPostAssignOIC ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorSg20UpEmployees ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSg20UpEmployees}
          />
        ) : null}
        {errorSg24UpVacantPositions ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSg24UpVacantPositions}
          />
        ) : null}
        {errorPostAssignOIC ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPostAssignOIC}
          />
        ) : null}

        {!isEmpty(postAssignOIC) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Officer-In-Charge successfully assigned'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="addOfficerInChargeForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="employee-selection">Employee</Label>
                  {loadingPostAssignOIC ? (
                    <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                  ) : null}

                  <Select
                    name="employeeId"
                    id="employee-selection"
                    onChange={selectedOption => {
                      formik.handleChange('employeeId')(
                        selectedOption.value.employeeId
                      )
                      handleSelectEmployee(selectedOption)
                    }}
                    onBlur={formik.handleBlur}
                    value={selectedEmployee || ''}
                    options={sg20UpEmployees}
                    getOptionLabel={option =>
                      `${option.label} | ${option.value.positionTitle}`
                    }
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
                    isDisabled={loadingSg20UpEmployees ? true : false}
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

                <FormGroup>
                  <Label for="position-selection">Managerial Position</Label>
                  {loadingSg24UpVacantPositions ? (
                    <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                  ) : null}

                  <Select
                    name="orgPositionId"
                    id="position-selection"
                    onChange={selectedOption => {
                      formik.handleChange('orgPositionId')(
                        selectedOption.value.orgPositionId
                      )
                      handleSelectPosition(selectedOption)
                    }}
                    onBlur={formik.handleBlur}
                    value={selectedPosition || ''}
                    options={sg24UpVacantPositions}
                    getOptionLabel={option =>
                      `${option.label} | ${option.value.assignedTo}`
                    }
                    styles={{
                      control: styles => ({
                        ...styles,
                        borderColor:
                          formik.errors.orgPositionId &&
                          formik.touched.orgPositionId
                            ? 'red'
                            : styles.borderColor,
                        '&:hover': {
                          borderColor:
                            formik.errors.orgPositionId &&
                            formik.touched.orgPositionId
                              ? 'red'
                              : styles['&:hover'].borderColor,
                        },
                      }),
                    }}
                    isDisabled={loadingSg24UpVacantPositions ? true : false}
                  />

                  <FormFeedback
                    style={{
                      display:
                        formik.errors.orgPositionId &&
                        formik.touched.orgPositionId
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {formik.errors.orgPositionId}
                  </FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="addOfficerInChargeForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

AddOfficerInChargeModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddOfficerInChargeModal
