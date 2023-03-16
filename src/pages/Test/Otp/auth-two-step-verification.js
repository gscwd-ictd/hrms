import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//Verification code package
import AuthCode from "react-auth-code-input"
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Button,
} from "reactstrap"
import { requestOtp, verifyOtp } from "../../../store/actions"

const TwostepVerification = () => {
  const dispatch = useDispatch()
  const [otpVerifyDetails, setOtpVerifyDetails] = useState({
    token: "",
    secret: process.env.REACT_APP_OTP_SECRET,
    otp: "",
  })
  const [otp, setOtp] = useState("")

  const { otpToken, verification, isLoading, error, verifyOtpResponse } =
    useSelector(state => ({
      otpToken: state.otpService.otpToken,
      verification: state.otpService.verification,
      isLoading: state.otpService.isLoading,
      error: state.otpService.error,
      verifyOtpResponse: state.otpService.verifyOtpResponse,
    }))

  const clickSendOtp = () => {
    // event.preventDefault()
    const uuid = { uuid: "6669af69-5138-4a5b-8a1c-e2c17c132da9" }

    dispatch(requestOtp(uuid))
  }

  const clickSubmitOtp = evt => {
    evt.preventDefault()

    const otpDetails = {
      token: otpToken.otpToken,
      secret: process.env.REACT_APP_OTP_SECRET,
      otp: otp,
    }

    dispatch(verifyOtp(otpDetails))
  }

  function otpInput(value) {
    setOtp(value)
  }

  useEffect(() => {
    if (error) {
      console.log(error)
    }

    if (verifyOtpResponse) {
    }
  }, [otpToken, error, verifyOtpResponse])

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={8}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your code</h4>
                        <p className="mb-5">
                          Please enter the 6 digit code sent to{" "}
                          <span className="font-weight-semibold">
                            Employee Mobile Number 09xxxxxxxx
                          </span>
                        </p>

                        <Form onSubmit={clickSubmitOtp}>
                          <Row>
                            <Col xs={12}>
                              <FormGroup className="verification">
                                <AuthCode
                                  characters={6}
                                  allowedCharacters="^[0-9]"
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  onChange={value => otpInput(value)}
                                  inputStyle={{
                                    width: "40px",
                                    height: "50px",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    marginRight: "15px",
                                    border: "1px solid #ced4da",
                                    textTransform: "uppercase",
                                  }}
                                />
                                <div className="mt-4">
                                  <Button
                                    type="submit"
                                    className="btn btn-success w-md"
                                  >
                                    {" "}
                                    Confirm{" "}
                                  </Button>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Didn&apos;t receive a code ?{" "}
                  <a
                    href="#"
                    className="font-weight-medium text-primary"
                    onClick={() => clickSendOtp()}
                  >
                    {" "}
                    Resend{" "}
                  </a>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default TwostepVerification
