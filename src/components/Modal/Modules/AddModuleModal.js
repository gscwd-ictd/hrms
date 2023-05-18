import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addModule, resetModuleResponse, fetchHrmsModules } from 'store/actions'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import {
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// Formik formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddModuleModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  // Redux state for response on assigning an employee as HRMS user
  const { postAddModule, loadingResponse, errorResponse } = useSelector(
    state => ({
      postAddModule: state.modules.response.postAddModule,
      loadingResponse: state.modules.loading.loadingResponse,
      errorResponse: state.modules.error.errorResponse,
    })
  )

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      module: '',
      slug: '',
      url: '/',
    },
    validationSchema: Yup.object({
      module: Yup.string().required('Please input a module name'),
      slug: Yup.string().required('Please input a slug name'),
    }),
    onSubmit: values => {
      dispatch(addModule(values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetModuleResponse())
    }
  }, [showAdd])

  // Reload background table and close modal
  useEffect(() => {
    if (!isEmpty(postAddModule)) {
      formik.resetForm()
      dispatch(fetchHrmsModules())
      dispatch(resetModuleResponse())
      handleCloseAdd()
    }
  }, [postAddModule])

  return (
    <>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="md" centered>
        <ModalHeader toggle={handleCloseAdd}>Add New Module</ModalHeader>

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
            toastType={'error'}
            notifMessage={errorResponse}
          />
        ) : null}

        {!isEmpty(postAddModule) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'New module successfully added'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="addModuleForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col>
                <FormGroup>
                  <Label for="text-module-name">Module Name</Label>
                  <Input
                    name="module"
                    type="text"
                    id="text-module-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.module || ''}
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
                    value={formik.values.slug || ''}
                    invalid={
                      formik.touched.slug && formik.errors.slug ? true : false
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
                    value={formik.values.url || ''}
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
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="addModuleForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

AddModuleModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddModuleModal
