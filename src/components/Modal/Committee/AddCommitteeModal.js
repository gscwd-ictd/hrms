import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import {
  addCommittee,
  fetchCommittees,
  resetCommitteeResponse,
} from "store/actions"
import { isEmpty } from "lodash"

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
import ToastrNotification from "components/Notifications/ToastrNotification"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const AddCommitteeModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const { postCommitteeRes, loadingCommittees, errorCommittees } = useSelector(
    state => ({
      postCommitteeRes: state.committee.response.committee.post,
      loadingCommittees: state.committee.loading.loadingCommittees,
      errorCommittees: state.committee.error.errorCommittees,
    })
  )

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter A Committee Name"),
      description: Yup.string().required(
        "Please Enter A Committee Description"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addCommittee(values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetCommitteeResponse())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postCommitteeRes)) {
      dispatch(fetchCommittees())
      dispatch(resetCommitteeResponse())
      handleCloseAdd()
    }
  }, [postCommitteeRes])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Committee Details</Modal.Title>
        </Modal.Header>
        {loadingCommittees ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorCommittees ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorCommittees}
          />
        ) : null}

        {!isEmpty(postCommitteeRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"New Committee Created"}
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
                  <Label for="name-Input">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md={12}>
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
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

AddCommitteeModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddCommitteeModal
