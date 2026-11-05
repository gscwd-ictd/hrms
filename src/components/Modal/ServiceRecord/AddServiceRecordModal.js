import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { noticeTypes } from 'constants/selectInputs'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetServiceRecordErrorLog,
  fetchPlantilla,
  fetchServiceRecords,
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
  Spinner,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import ConfirmationSubmitServiceRecord from 'components/Modal/Confirmation/ConfirmationSubmitServiceRecord'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

const AddServiceRecordModal = props => {
  const { isOpen, toggle } = props
  const { employeeId } = useParams()
  const dispatch = useDispatch()

  const {
    responseSubmitNSR,
    loadingSubmit,
    errorSubmit,
    plantilla,
    loadingPlantilla,
  } = useSelector(state => ({
    responseSubmitNSR: state.serviceRecord.response.submitNewServiceRecord,
    loadingSubmit: state.serviceRecord.response.isLoading,
    errorSubmit: state.serviceRecord.response.error,

    plantilla: state.plantilla.list,
    loadingPlantilla: state.plantilla.isLoading,
  }))

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      effectivityDate: '',
      status: '',
      employeeId: employeeId || '',
      positionId: '',
      actualSalaryGrade: 1,
      actualStepIncrement: 1,
      actualSgYear: '',
      adjustedSalaryGrade: 1,
      adjustedStepIncrement: 1,
      adjustedSgYear: '',
    },
    validationSchema: Yup.object().shape({
      effectivityDate: Yup.string().required('Select Effectivity Data'),
      status: Yup.string().required('Select Type of Notice'),
      employeeId: Yup.string().required(),
      positionId: Yup.string().required('Select a Position Title'),
      actualSalaryGrade: Yup.number().required('Input Salary Grade'),
      actualStepIncrement: Yup.number().required('Input Step Increment'),
      actualSgYear: Yup.string().required(
        'Input Salary Grade Table Effectivity Year'
      ),
      adjustedSalaryGrade: Yup.number().required('Input Salary Grade'),
      adjustedStepIncrement: Yup.number().required('Input Step Increment'),
      adjustedSgYear: Yup.string().required(
        'Input Salary Grade Table Effectivity Year'
      ),
    }),
    onSubmit: values => {
      toggleConfirmationModal()
    },
  })

  /**
   * Modal
   */
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const toggleConfirmationModal = () =>
    setShowConfirmationModal(!showConfirmationModal)

  // Reset response state upon close of modal
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm()
      dispatch(resetServiceRecordErrorLog())
    } else {
      dispatch(fetchPlantilla())
    }
  }, [isOpen])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseSubmitNSR)) {
      formik.resetForm()

      toggle()

      // fetch new service record list
      dispatch(fetchServiceRecords(employeeId))
    }
  }, [responseSubmitNSR])

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} size="xl" centered>
        <ModalHeader toggle={toggle}>Service Record</ModalHeader>

        {/* Info Alert with Spinner */}
        {loadingSubmit ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loadingSubmit mdi-spin me-2"></i> Sending
            Request
          </Alert>
        ) : null}

        {/* Error Alert */}
        {errorSubmit ? (
          <ToastrNotification
            toastType={'errorSubmit'}
            notifMessage={errorSubmit}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(responseSubmitNSR) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Service Record is now added'}
          />
        ) : null}

        <ConfirmationSubmitServiceRecord
          isOpen={showConfirmationModal}
          toggle={toggleConfirmationModal}
          formData={formik.values}
        />

        <ModalBody>
          {/* <ComingSoon /> */}
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
                {/* last working day date field */}
                <Col sm={3}>
                  <FormGroup>
                    <Label for="effectivityDate">Effectivity Date</Label>
                    <Input
                      name="effectivityDate"
                      type="date"
                      className="form-control"
                      id="effectivityDate-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.effectivityDate || ''}
                      invalid={
                        formik.touched.effectivityDate &&
                        formik.errors.effectivityDate
                          ? true
                          : false
                      }
                    />
                    {formik.touched.effectivityDate &&
                    formik.errors.effectivityDate ? (
                      <FormFeedback type="invalid">
                        {formik.errors.effectivityDate}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                {/* notice type select field */}
                <Col sm={3}>
                  <FormGroup>
                    <Label for="status">Notice Type</Label>
                    <Input
                      name="status"
                      type="select"
                      className="form-control"
                      id="status-select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.status || ''}
                      invalid={
                        formik.touched.status && formik.errors.status
                          ? true
                          : false
                      }
                    >
                      <option value="">Choose...</option>
                      {noticeTypes.map((nt, idx) => (
                        <option key={idx} value={nt.value}>
                          {nt.label}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.status && formik.errors.status ? (
                      <FormFeedback type="invalid">
                        {formik.errors.status}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                {/* plantilla select field */}
                <Col sm={6}>
                  <FormGroup>
                    <Label for="positionId">Item Code | Position Name</Label>
                    <Input
                      name="positionId"
                      type="select"
                      className="form-control"
                      id="positionId-select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.positionId || ''}
                      invalid={
                        formik.touched.positionId && formik.errors.positionId
                          ? true
                          : false
                      }
                      disabled={loadingPlantilla}
                    >
                      <option value="">Choose...</option>
                      {plantilla.map(position => (
                        <option
                          key={position.positionId}
                          value={position.positionId}
                        >
                          {position.itemNumber + ' | ' + position.positionTitle}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.positionId && formik.errors.positionId ? (
                      <FormFeedback type="invalid">
                        {formik.errors.positionId}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                {/* Actual salary grade and increment. Input fields */}
                <Col sm={4}>
                  <FormGroup>
                    <Label for="actualSgYear">Actual Salary Grade Year</Label>
                    <Input
                      name="actualSgYear"
                      type="number"
                      min="1900"
                      max="2099"
                      step="1"
                      placeholder="YYYY"
                      className="form-control"
                      id="actualSgYear-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.actualSgYear || ''}
                      invalid={
                        formik.touched.actualSgYear &&
                        formik.errors.actualSgYear
                          ? true
                          : false
                      }
                    />
                    {formik.touched.actualSgYear &&
                    formik.errors.actualSgYear ? (
                      <FormFeedback type="invalid">
                        {formik.errors.actualSgYear}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={4}>
                  <FormGroup>
                    <Label for="actualSalaryGrade">Actual Salary Grade</Label>
                    <Input
                      name="actualSalaryGrade"
                      type="number"
                      min="1"
                      max="33"
                      step="1"
                      placeholder="XX"
                      className="form-control"
                      id="actualSalaryGrade-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.actualSalaryGrade || ''}
                      invalid={
                        formik.touched.actualSalaryGrade &&
                        formik.errors.actualSalaryGrade
                          ? true
                          : false
                      }
                    />
                    {formik.touched.actualSalaryGrade &&
                    formik.errors.actualSalaryGrade ? (
                      <FormFeedback type="invalid">
                        {formik.errors.actualSalaryGrade}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={4}>
                  <FormGroup>
                    <Label for="actualStepIncrement">
                      Actual Step Increment
                    </Label>
                    <Input
                      name="actualStepIncrement"
                      type="number"
                      min="1"
                      max="8"
                      step="1"
                      placeholder="X"
                      className="form-control"
                      id="actualStepIncrement-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.actualStepIncrement || ''}
                      invalid={
                        formik.touched.actualStepIncrement &&
                        formik.errors.actualStepIncrement
                          ? true
                          : false
                      }
                    />
                    {formik.touched.actualStepIncrement &&
                    formik.errors.actualStepIncrement ? (
                      <FormFeedback type="invalid">
                        {formik.errors.actualStepIncrement}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                {/* Adjusted salary grade and increment. Input fields */}
                <Col sm={4}>
                  <FormGroup>
                    <Label for="adjustedSgYear">
                      Adjusted Salary Grade Year
                    </Label>
                    <Input
                      name="adjustedSgYear"
                      type="number"
                      min="1900"
                      max="2099"
                      step="1"
                      placeholder="YYYY"
                      className="form-control"
                      id="adjustedSgYear-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.adjustedSgYear || ''}
                      invalid={
                        formik.touched.adjustedSgYear &&
                        formik.errors.adjustedSgYear
                          ? true
                          : false
                      }
                    />
                    {formik.touched.adjustedSgYear &&
                    formik.errors.adjustedSgYear ? (
                      <FormFeedback type="invalid">
                        {formik.errors.adjustedSgYear}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={4}>
                  <FormGroup>
                    <Label for="adjustedSalaryGrade">
                      Adjusted Salary Grade
                    </Label>
                    <Input
                      name="adjustedSalaryGrade"
                      type="number"
                      min="1"
                      max="33"
                      step="1"
                      placeholder="XX"
                      className="form-control"
                      id="adjustedSalaryGrade-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.adjustedSalaryGrade || ''}
                      invalid={
                        formik.touched.adjustedSalaryGrade &&
                        formik.errors.adjustedSalaryGrade
                          ? true
                          : false
                      }
                    />
                    {formik.touched.adjustedSalaryGrade &&
                    formik.errors.adjustedSalaryGrade ? (
                      <FormFeedback type="invalid">
                        {formik.errors.adjustedSalaryGrade}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={4}>
                  <FormGroup>
                    <Label for="adjustedStepIncrement">
                      Adjusted Step Increment
                    </Label>
                    <Input
                      name="adjustedStepIncrement"
                      type="number"
                      min="1"
                      max="8"
                      step="1"
                      placeholder="X"
                      className="form-control"
                      id="adjustedStepIncrement-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.adjustedStepIncrement || ''}
                      invalid={
                        formik.touched.adjustedStepIncrement &&
                        formik.errors.adjustedStepIncrement
                          ? true
                          : false
                      }
                    />
                    {formik.touched.adjustedStepIncrement &&
                    formik.errors.adjustedStepIncrement ? (
                      <FormFeedback type="invalid">
                        {formik.errors.adjustedStepIncrement}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="empInfoForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

AddServiceRecordModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
}

export default AddServiceRecordModal
