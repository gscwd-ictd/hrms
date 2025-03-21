import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { separationTypes } from 'constants/selectInputs'
import { useDispatch, useSelector } from 'react-redux'
import { resetServiceRecordErrorLog } from 'store/actions'
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
import ToastrNotification from 'components/Notifications/ToastrNotification'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import ConfirmationNosiIssuance from 'components/Modal/Confirmation/ConfirmationNosiIssuance'
import ComingSoon from 'components/Utility/ComingSoon'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

const NosiIssuanceModal = props => {
  const { isOpen, toggle } = props
  const { employeeId } = useParams()
  const dispatch = useDispatch()

  const {
    responseSubmitEmpSeparation,
    loadingResponseSubmitEmpSeparation,
    errorResponseSubmitEmpSeparation,
  } = useSelector(state => ({
    responseSubmitEmpSeparation:
      state.serviceRecord.response.submitEmployeeSeparation,
    loadingResponseSubmitEmpSeparation: state.serviceRecord.response.isLoading,
    errorResponseSubmitEmpSeparation: state.serviceRecord.response.error,
  }))

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      employeeId: employeeId || '',
      separationType: '',
      lastWorkingDay: '',
      terminationEffectivity: '',
      remarks: '',
    },
    validationSchema: Yup.object().shape({
      employeeId: Yup.string().required(),
      separationType: Yup.string().required('Select a separation type'),
      lastWorkingDay: Yup.string().required(
        'Last working day is required field'
      ),
      terminationEffectivity: Yup.string().required(
        'Termination effectivity is required field'
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
    }
  }, [isOpen])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseSubmitEmpSeparation)) {
      formik.resetForm()

      // dispatch(resetEmpResponseAndError())
      toggle()

      // fetch new service record list
      dispatch(fetchServiceRecords(employeeId))
    }
  }, [responseSubmitEmpSeparation])

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Employee Separation</ModalHeader>

        {/* Info Alert with Spinner */}
        {loadingResponseSubmitEmpSeparation ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}

        {/* Error Alert */}
        {errorResponseSubmitEmpSeparation ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorResponseSubmitEmpSeparation}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(responseSubmitEmpSeparation) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Employee is now terminated'}
          />
        ) : null}

        <ConfirmationNosiIssuance
          isOpen={showConfirmationModal}
          toggle={toggleConfirmationModal}
          formData={formik.values}
        />

        <ModalBody>
          <ComingSoon />

          {/* COMMENT OUT UNTIL ROUTE IS AVAILABLE */}
          {/* <Form
            id="empInfoForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <div className="outer">
              <Row>
                separation type select field
                <Col sm={4}>
                  <FormGroup>
                    <Label for="separationType">Separation Type</Label>
                    <Input
                      name="separationType"
                      type="select"
                      className="form-control"
                      id="separationType-select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.separationType || ''}
                      invalid={
                        formik.touched.separationType &&
                        formik.errors.separationType
                          ? true
                          : false
                      }
                    >
                      <option value="">Choose...</option>
                      {separationTypes.map((st, idx) => (
                        <option key={idx} value={st}>
                          {st}
                        </option>
                      ))}
                    </Input>
                    {formik.touched.separationType &&
                    formik.errors.separationType ? (
                      <FormFeedback type="invalid">
                        {formik.errors.separationType}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                last working day date field
                <Col sm={4}>
                  <FormGroup>
                    <Label for="lastWorkingDay">Last Working Day</Label>
                    <Input
                      name="lastWorkingDay"
                      type="date"
                      className="form-control"
                      id="lastWorkingDay-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastWorkingDay || ''}
                      invalid={
                        formik.touched.lastWorkingDay &&
                        formik.errors.lastWorkingDay
                          ? true
                          : false
                      }
                    />
                    {formik.touched.lastWorkingDay &&
                    formik.errors.lastWorkingDay ? (
                      <FormFeedback type="invalid">
                        {formik.errors.lastWorkingDay}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                termination effectivity date field
                <Col sm={4}>
                  <FormGroup>
                    <Label for="terminationEffectivity">
                      Termination Effectivity
                    </Label>
                    <Input
                      name="terminationEffectivity"
                      type="date"
                      className="form-control"
                      id="terminationEffectivity-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.terminationEffectivity || ''}
                      invalid={
                        formik.touched.terminationEffectivity &&
                        formik.errors.terminationEffectivity
                          ? true
                          : false
                      }
                    />
                    {formik.touched.terminationEffectivity &&
                    formik.errors.terminationEffectivity ? (
                      <FormFeedback type="invalid">
                        {formik.errors.terminationEffectivity}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                remarks input field
                <Col sm={12}>
                  <FormGroup>
                    <Label for="remarks">Remarks</Label>
                    <Input
                      name="remarks"
                      type="text"
                      className="form-control"
                      id="remarks-Input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.remarks || ''}
                      invalid={
                        formik.touched.remarks && formik.errors.remarks
                          ? true
                          : false
                      }
                    />
                    {formik.touched.remarks && formik.errors.remarks ? (
                      <FormFeedback type="invalid">
                        {formik.errors.remarks}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form> */}
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

NosiIssuanceModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
}

export default NosiIssuanceModal
