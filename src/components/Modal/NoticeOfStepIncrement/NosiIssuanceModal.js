import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeesForNosi } from 'store/actions'
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
import ConfirmationNosiIssuance from 'components/Modal/Confirmation/ConfirmationNosiIssuance'
import { nosiDocumentDetails } from 'constants/nosi'
import { DateFormatter } from 'functions/DateFormatter'
import dayjs from 'dayjs'

// import scss
import 'styles/custom_gscwd/pages/employeeassignment.scss'

const NosiIssuanceModal = props => {
  const { isOpen, toggle, modalData } = props
  const dispatch = useDispatch()

  const {
    responseSubmitNosiForApproval,
    loadingSubmitNosiForApproval,
    errorSubmitNosiForApproval,
  } = useSelector(state => ({
    responseSubmitNosiForApproval:
      state.noticeOfStepIncrement.response.submitNosiForApproval,
    loadingSubmitNosiForApproval:
      state.noticeOfStepIncrement.response.isLoading,
    errorSubmitNosiForApproval: state.noticeOfStepIncrement.response.error,
  }))

  // formik initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      nosiId: modalData._id || '',
      jointCircularNo: nosiDocumentDetails.JOINT_CIRCULAR_NO,
      dbmJcDated: nosiDocumentDetails.DBM_JC_DATED,
    },
    validationSchema: Yup.object().shape({
      nosiId: Yup.string().required(),
      jointCircularNo: Yup.string().required('Required field'),
      dbmJcDated: Yup.string().required('Required field'),
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
    }
  }, [isOpen])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responseSubmitNosiForApproval)) {
      formik.resetForm()
      toggle()
      dispatch(fetchEmployeesForNosi(employeeId))
    }
  }, [responseSubmitNosiForApproval])

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Submit NOSI For GM Approval</ModalHeader>

        {/* Info Alert with Spinner */}
        {loadingSubmitNosiForApproval ? (
          <Alert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2"></i> Sending Request
          </Alert>
        ) : null}

        {/* Error Alert */}
        {errorSubmitNosiForApproval ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSubmitNosiForApproval}
          />
        ) : null}

        {/* Success Alert */}
        {!isEmpty(responseSubmitNosiForApproval) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'NOSI sent to GM for approval'}
          />
        ) : null}

        <ConfirmationNosiIssuance
          isOpen={showConfirmationModal}
          toggle={toggleConfirmationModal}
          formData={formik.values}
        />

        <ModalBody>
          <Form
            id="modalForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <div className="outer">
              <Row>
                <Col sm={12}>
                  <p>
                    Pursuant to the Civil Service Commision and Department of
                    Budget and Management
                  </p>
                </Col>

                <Col sm={6}>
                  <FormGroup>
                    <Label for="jointCircularNo">Joint Circular No.</Label>
                    <Input
                      name="jointCircularNo"
                      type="text"
                      className="form-control"
                      id="jointCircularNo-Input"
                      value={formik.values.jointCircularNo || ''}
                      invalid={
                        formik.touched.jointCircularNo &&
                        formik.errors.jointCircularNo
                          ? true
                          : false
                      }
                      readOnly
                      disabled
                    />
                    {formik.touched.jointCircularNo &&
                    formik.errors.jointCircularNo ? (
                      <FormFeedback type="invalid">
                        {formik.errors.jointCircularNo}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={6}>
                  <FormGroup>
                    <Label for="dbmJcDated">Dated</Label>
                    <Input
                      name="dbmJcDated"
                      type="date"
                      className="form-control"
                      id="dbmJcDated-Input"
                      value={formik.values.dbmJcDated || ''}
                      invalid={
                        formik.touched.dbmJcDated && formik.errors.dbmJcDated
                          ? true
                          : false
                      }
                      readOnly
                      disabled
                    />
                    {formik.touched.dbmJcDated && formik.errors.dbmJcDated ? (
                      <FormFeedback type="invalid">
                        {formik.errors.dbmJcDated}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={12}>
                  <p>
                    Implementing item (4)(d) of the Senate and House of
                    Representatives Joint Resolution No. 4, s. 2009, approved on
                    June 17, 2009, your salary as{' '}
                    <span className="fw-bold">
                      <u>{modalData.positionTitle}</u>
                    </span>{' '}
                    is hereby adjusted effective{' '}
                    <span className="fw-bold">
                      <u>
                        {DateFormatter(
                          modalData.dateOfEffectivity,
                          'MMMM DD, YYYY'
                        )}
                      </u>
                    </span>
                    , as follows:
                  </p>
                </Col>
                <Row>
                  <Col sm={1}>
                    <p className="text-center">1.</p>
                  </Col>
                  <Col sm={7}>
                    <p>
                      Actual monthly basic salary as of{' '}
                      <span className="fw-bold">
                        {DateFormatter(dayjs(), 'MMMM DD, YYYY')}
                      </span>
                      <br />
                      <span className="fw-bold">({modalData.actualSgSi})</span>
                    </p>
                  </Col>

                  <Col sm={4}>
                    <p>
                      <span className="fw-bold">
                        ₱
                        <u>
                          &nbsp;&nbsp;&nbsp;&nbsp;INSERT DATA
                          HERE&nbsp;&nbsp;&nbsp;&nbsp;
                        </u>
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={1}>
                    <p className="text-center">2.</p>
                  </Col>
                  <Col sm={7}>
                    <p>
                      Add: one (1) Step Increment
                      <br />
                      Due to Length of Service
                    </p>
                  </Col>

                  <Col sm={4}>
                    <p>
                      <span className="fw-bold">
                        ₱
                        <u>
                          &nbsp;&nbsp;&nbsp;&nbsp;INSERT DATA
                          HERE&nbsp;&nbsp;&nbsp;&nbsp;
                        </u>
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={1}>
                    <p className="text-center">3.</p>
                  </Col>
                  <Col sm={7}>
                    <p>
                      Adjusted monthly basic salary effective{' '}
                      <span className="fw-bold">
                        {DateFormatter(
                          modalData.dateOfEffectivity,
                          'MMMM DD, YYYY'
                        )}
                      </span>
                    </p>
                  </Col>

                  <Col sm={4}>
                    <p>
                      <span className="fw-bold">
                        ₱
                        <u>
                          &nbsp;&nbsp;&nbsp;&nbsp;INSERT DATA
                          HERE&nbsp;&nbsp;&nbsp;&nbsp;
                        </u>
                      </span>
                    </p>
                  </Col>
                </Row>
                <Col sm={12}>
                  <p>
                    This salary adjustment is subject to review and post-audit,
                    and to appropriate re-adjustment and refund if found not in
                    order.
                  </p>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="modalForm" color="info">
            Submit for Approval
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

NosiIssuanceModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  modalData: PropTypes.object,
}

export default NosiIssuanceModal
