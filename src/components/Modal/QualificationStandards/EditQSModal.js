import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import {
  updatePositionQualificationStandards,
  fetchQualificationStandardsList,
  resetQualificationStandards,
} from "store/actions"

import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  Alert,
  FormFeedback,
} from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const EditQSModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const { responsePut, isLoading, error } = useSelector(state => ({
    responsePut: state.qualificationStandards.position.put,
    isLoading:
      state.qualificationStandards.loading
        .loadingPositionQualificationStandards,
    error:
      state.qualificationStandards.error.errorPositionQualificationStandards,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      positionId: modalData.positionId,
      eligibility: modalData.eligibility || "",
      education: modalData.education || "",
      experience: modalData.experience || "",
      training: modalData.training || "",
    },
    validationSchema: Yup.object({
      eligibility: Yup.string().required("Please enter eligibility"),
      education: Yup.string().required("Please enter education"),
      experience: Yup.string().required("Please enter experience"),
      training: Yup.string().required("Please enter training"),
    }),
    onSubmit: values => {
      // console.log(values)
      dispatch(
        updatePositionQualificationStandards(modalData.positionId, values)
      )
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetQualificationStandards())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responsePut)) {
      dispatch(fetchQualificationStandardsList())
      dispatch(resetQualificationStandards())
      handleCloseEdt()
    }
  }, [responsePut])

  // const handleValidSubmit = (event, values) => {
  // const positionsRequested = document.getElementById("prf-positions-tbl").rows.length
  // props.positionRequest(values, props.history, positionsRequested)
  //   // console.log(values)
  // }

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.positionTitle}</Modal.Title>
        </Modal.Header>

        {isLoading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {error ? (
          <ToastrNotification toastType={"error"} notifMessage={error} />
        ) : null}

        {!isEmpty(responsePut) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Update Successful"}
          />
        ) : null}

        <Form
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Modal.Body>
            <Row>
              <Col lg={12}>
                <FormGroup>
                  <Label for="eligibility">Eligibility:</Label>
                  <Input
                    name="eligibility"
                    type="text"
                    className="form-control"
                    id="eligibility-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.eligibility || ""}
                    invalid={
                      validation.touched.eligibility &&
                      validation.errors.eligibility
                        ? true
                        : false
                    }
                  />
                  {validation.touched.eligibility &&
                  validation.errors.eligibility ? (
                    <FormFeedback type="invalid">
                      {validation.errors.eligibility}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="education">Education:</Label>
                  <Input
                    name="education"
                    type="text"
                    className="form-control"
                    id="education-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.education || ""}
                    invalid={
                      validation.touched.education &&
                      validation.errors.education
                        ? true
                        : false
                    }
                  />
                  {validation.touched.education &&
                  validation.errors.education ? (
                    <FormFeedback type="invalid">
                      {validation.errors.education}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="experience">Experience:</Label>
                  <Input
                    name="experience"
                    type="text"
                    className="form-control"
                    id="experience-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.experience || ""}
                    invalid={
                      validation.touched.experience &&
                      validation.errors.experience
                        ? true
                        : false
                    }
                  />
                  {validation.touched.experience &&
                  validation.errors.experience ? (
                    <FormFeedback type="invalid">
                      {validation.errors.experience}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="training">Training:</Label>
                  <Input
                    name="training"
                    type="text"
                    className="form-control"
                    id="training-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.training || ""}
                    invalid={
                      validation.touched.training && validation.errors.training
                        ? true
                        : false
                    }
                  />
                  {validation.touched.training && validation.errors.training ? (
                    <FormFeedback type="invalid">
                      {validation.errors.training}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" color="info">
              Update
            </Button>
            <Button color="danger" onClick={handleCloseEdt}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

EditQSModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditQSModal
