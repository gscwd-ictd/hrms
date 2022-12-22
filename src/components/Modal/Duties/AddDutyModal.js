import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import {
  Col,
  Row,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
} from "reactstrap"
import PropTypes from "prop-types"
import {
  addDutyResponsibility,
  fetchDutyResponsibilities,
  resetDutiesResponse,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const AddDutyModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const {
    postDutiesRes,
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
  } = useSelector(state => ({
    postDutiesRes:
      state.dutiesResponsibilities.response.dutyResponsibility.post,
    loadingDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingDutyResponsibilities,
    errorDutyResponsibilities:
      state.dutiesResponsibilities.error.errorDutyResponsibilities,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(
        "Please enter duty and responsibility description"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addDutyResponsibility(values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetDutiesResponse())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postDutiesRes)) {
      dispatch(fetchDutyResponsibilities())
      dispatch(resetDutiesResponse())
      handleCloseAdd()
    }
  }, [postDutiesRes])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Duty and Responsibility Details</Modal.Title>
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

        {!isEmpty(postDutiesRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"New duty & responsibility created"}
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
                <Row>
                  <Col md={12}>
                    <FormGroup>
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
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" color="info">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

AddDutyModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddDutyModal
