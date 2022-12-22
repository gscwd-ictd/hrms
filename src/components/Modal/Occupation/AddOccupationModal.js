import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import {
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
} from "reactstrap"
import PropTypes from "prop-types"
import {
  addOccupation,
  fetchOccupations,
  resetOccupationResponses,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const AddOccupationModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const { responsePost, isLoading, error } = useSelector(state => ({
    responsePost: state.Occupation.response.occupation.post,
    isLoading: state.Occupation.loading.occupationLoading,
    error: state.Occupation.error.occupationError,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      occupationName: "",
    },
    validationSchema: Yup.object({
      occupationName: Yup.string().required("Please enter a occupation name"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addOccupation(values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetOccupationResponses())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responsePost)) {
      dispatch(fetchOccupations())
      dispatch(resetOccupationResponses())
      handleCloseAdd()
    }
  }, [responsePost])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Occupation</Modal.Title>
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

        {!isEmpty(responsePost) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"New Occupation Created"}
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
              <Col md={12}>
                <FormGroup>
                  <Label for="name-Input">Name</Label>
                  <Input
                    name="occupationName"
                    type="text"
                    className="form-control"
                    id="occupationName-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.occupationName || ""}
                    invalid={
                      validation.touched.occupationName &&
                      validation.errors.occupationName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.occupationName &&
                  validation.errors.occupationName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.occupationName}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
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

AddOccupationModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddOccupationModal
