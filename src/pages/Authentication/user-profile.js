import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Alert, CardBody } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar.png"
// actions
import { resetProfileFlag } from "../../store/actions"

// Import Cookies
import Cookies from "universal-cookie"

const UserProfile = props => {
  const dispatch = useDispatch()

  const cookies = new Cookies()

  const [email, setemail] = useState("")
  // const [name, setname] = useState("");
  const [idx, setidx] = useState(1)

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  useEffect(() => {
    if (cookies.get("employeeId") && localStorage.getItem("email")) {
      // setname(obj.username);
      setemail(localStorage.getItem("email"))
      setidx(cookies.get("employeeId"))

      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  return (
    <React.Fragment>
      <div className="page-content">
        <title>Profile | GSCWD HRIS</title>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="HRIS" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        {/* <h5>{name}</h5> */}
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">UUID no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
