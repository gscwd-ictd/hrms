import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useEffect } from "react"
import { isEmpty } from "lodash"

import { useHistory, withRouter, Link } from "react-router-dom"
import Cookies from "universal-cookie"

//redux
import { useSelector, useDispatch } from "react-redux"
import { loginUser, resetLogin } from "store/actions"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/main_logo_transparent.png"

// style
import "styles/custom_gscwd/pages/login.scss"

const Login = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const cookies = new Cookies()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "hrms@gscwd.com" || "",
      password: "password" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.history))
    },
  })

  const { loginVerificationResponse, loadingVerifyCredentials, error } =
    useSelector(state => ({
      loginVerificationResponse: state.Login.loginVerificationResponse,
      loadingVerifyCredentials: state.Login.loadingVerifyCredentials,
      error: state.Login.error,
    }))

  useEffect(() => {
    if (!isEmpty(loginVerificationResponse)) {
      const accessToken = loginVerificationResponse.accessToken
      cookies.set("accessToken", accessToken)

      const userEmail = loginVerificationResponse.email
      localStorage.setItem("email", userEmail)

      const photoUrl = loginVerificationResponse.userDetails.photoUrl
      localStorage.setItem("photoUrl", photoUrl)

      dispatch(resetLogin())
    }
  }, [loginVerificationResponse])

  return (
    <React.Fragment>
      {/* <MetaTags>
        <title>Login | GSCWD HRIS</title>
      </MetaTags> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to HRMS.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {loadingVerifyCredentials ? (
                        <Alert
                          color="info"
                          className="alert-dismissible fade show mb-2"
                          role="alert"
                        >
                          <i className="mdi mdi-loading mdi-spin mr-2"></i>{" "}
                          Verifying Credentials
                        </Alert>
                      ) : null}

                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>© {new Date().getFullYear()} HRIS by GSCWD</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Login.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Login)
