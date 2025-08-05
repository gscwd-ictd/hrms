import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateEmployeeForTemporaryAssignment,
  resetEmployeeTemporaryAssignmentResponse,
  fetchEmployeeTemporaryAssignmentList,
} from 'store/actions'
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
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
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { tempAssignmentStatuses } from 'constants/selectInputs'
import dayjs from 'dayjs'
import { DateFormatter } from 'functions/DateFormatter'

const EditEmployeeTempAssignModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const [dateFrom, setDateFrom] = useState(new Date())
  const dispatch = useDispatch()

  // redux state for adding employee for temporary assignment
  const {
    patchEmployeeTemporaryAssignment,
    loadingPatchEmployeeTemporaryAssignment,
    errorPatchEmployeeTemporaryAssignment,
  } = useSelector(state => ({
    patchEmployeeTemporaryAssignment:
      state.temporaryAssignment.response.patchEmployeeTemporaryAssignment,
    loadingPatchEmployeeTemporaryAssignment:
      state.temporaryAssignment.loading.loadingPatchEmployeeTemporaryAssignment,
    errorPatchEmployeeTemporaryAssignment:
      state.temporaryAssignment.error.errorPatchEmployeeTemporaryAssignment,
  }))

  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      status: tempAssignmentStatuses[1].value,
      dateTo: DateFormatter(dayjs(), 'YYYY-MM-DD'),
    },
    validationSchema: Yup.object().shape({
      status: Yup.string().required('Please select a status'),
      dateTo: Yup.date()
        .min(dateFrom, 'Date end cannot be before date start')
        .required('Please select date end'),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(updateEmployeeForTemporaryAssignment(modalData.id, values))
      resetForm()
    },
  })

  // Clear modal data
  useEffect(() => {
    if (!showEdt) {
      formik.resetForm()
      dispatch(resetEmployeeTemporaryAssignmentResponse())
    } else {
      setDateFrom(DateFormatter(modalData.dateFrom, 'YYYY-MM-DD'))
    }
  }, [showEdt])

  useEffect(() => {
    if (!isEmpty(patchEmployeeTemporaryAssignment)) {
      formik.resetForm()
      dispatch(fetchEmployeeTemporaryAssignmentList())
      handleCloseEdt()
    }
  }, [patchEmployeeTemporaryAssignment])

  return (
    <>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="md" centered>
        <ModalHeader toggle={handleCloseEdt}>
          End Employee Temporary Assignment
        </ModalHeader>

        {/* Notifications */}
        {loadingPatchEmployeeTemporaryAssignment ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorPatchEmployeeTemporaryAssignment ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPatchEmployeeTemporaryAssignment}
          />
        ) : null}

        {!isEmpty(patchEmployeeTemporaryAssignment) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Temporary assignment has been updated'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="editEmployeeTemporaryAssignmentForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col md={6}>
                {/* Temporary assignment status select */}
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    name="status"
                    type="text"
                    className="form-control text-capitalize"
                    id="status-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status || ''}
                    disabled
                  />
                  {formik.touched.status && formik.errors.status ? (
                    <FormFeedback type="invalid">
                      {formik.errors.status}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={6}>
                {/* Date end */}
                <FormGroup>
                  <Label for="dateTo">Date End </Label>
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
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="editEmployeeTemporaryAssignmentForm"
            color="info"
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

EditEmployeeTempAssignModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditEmployeeTempAssignModal
