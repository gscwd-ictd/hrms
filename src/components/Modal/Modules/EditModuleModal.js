import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  updateModule,
  resetModuleResponse,
  fetchHrmsModules,
} from "store/actions"
import { isEmpty } from "lodash"

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

// Formik formik
import * as Yup from "yup"
import { useFormik } from "formik"

const EditModuleModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  // Redux state for user's roles and response on updating
  const { patchUpdateModule, loadingResponse, errorResponse } = useSelector(
    state => ({
      patchUpdateModule: state.modules.response.patchUpdateModule,
      loadingResponse: state.modules.loading.loadingResponse,
      errorResponse: state.modules.error.errorResponse,
    })
  )

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      module: modalData.module || "",
      slug: modalData.slug || "",
      url: modalData.url || "/",
    },
    validationSchema: Yup.object({
      module: Yup.string().required("Please input a module name"),
      slug: Yup.string().required("Please input a slug name"),
    }),
    onSubmit: values => {
      dispatch(updateModule(modalData._id, values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetModuleResponse())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(patchUpdateModule)) {
      dispatch(fetchHrmsModules())
      dispatch(resetModuleResponse())
      handleCloseEdt()
      formik.resetForm()
    }
  }, [patchUpdateModule])

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modules</Modal.Title>
        </Modal.Header>

        {/* Notifications */}
        {loadingResponse ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorResponse ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorResponse}
          />
        ) : null}

        {!isEmpty(patchUpdateModule) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Update Successful"}
          />
        ) : null}

        <Form
          onSubmit={e => {
            e.preventDefault()
            formik.handleSubmit()
            return false
          }}
        >
          <Modal.Body>
            <Row>
              <Col md={12}>
                <FormGroup row>
                  <Col>
                    <FormGroup>
                      <Label for="text-module-name">Module Name</Label>
                      <Input
                        name="module"
                        type="text"
                        id="text-module-name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.module || ""}
                        invalid={
                          formik.touched.module && formik.errors.module
                            ? true
                            : false
                        }
                      />
                      {formik.touched.module && formik.errors.module ? (
                        <FormFeedback type="invalid">
                          {formik.errors.module}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label for="text-slug">Slug</Label>
                      <Input
                        name="slug"
                        type="text"
                        id="text-slug"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.slug || ""}
                        invalid={
                          formik.touched.slug && formik.errors.slug
                            ? true
                            : false
                        }
                      />
                      {formik.touched.slug && formik.errors.slug ? (
                        <FormFeedback type="invalid">
                          {formik.errors.slug}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label for="text-url">URL</Label>
                      <Input
                        name="url"
                        type="text"
                        id="text-url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url || ""}
                        invalid={
                          formik.touched.url && formik.errors.url ? true : false
                        }
                      />
                      {formik.touched.url && formik.errors.url ? (
                        <FormFeedback type="invalid">
                          {formik.errors.url}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
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

EditModuleModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditModuleModal
