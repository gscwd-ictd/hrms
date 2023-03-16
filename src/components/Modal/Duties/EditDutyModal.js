import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
} from "reactstrap"
import PropTypes from "prop-types"
import {
  updateDutyResponsibility,
  fetchDutyResponsibilities,
  resetDutiesResponse,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const EditDutyModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const {
    putDutiesRes,
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
  } = useSelector(state => ({
    putDutiesRes: state.dutiesResponsibilities.response.dutyResponsibility.put,
    loadingDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingDutyResponsibilities,
    errorDutyResponsibilities:
      state.dutiesResponsibilities.error.errorDutyResponsibilities,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      description: modalData.description || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(
        "Please enter a duty and responsibility description"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateDutyResponsibility(modalData._id, values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetDutiesResponse())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(putDutiesRes)) {
      handleCloseEdt()
      dispatch(fetchDutyResponsibilities())
      dispatch(resetDutiesResponse())
    }
  }, [putDutiesRes])

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        {loadingDutyResponsibilities ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorDutyResponsibilities ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorDutyResponsibilities}
          />
        ) : null}

        {!isEmpty(putDutiesRes) ? (
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
                  <Label for="desc-Input">Description</Label>
                  <Input
                    name="description"
                    type="textarea"
                    className="form-control"
                    id="desc-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
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

EditDutyModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditDutyModal
