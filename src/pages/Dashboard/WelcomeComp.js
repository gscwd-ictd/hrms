import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import userDefaultAvatar from 'assets/images/users/avatar.png'
import profileBg from 'assets/images/profile-img.png'
import 'styles/custom_gscwd/components/welcomecomp.scss'

const WelcomeComp = () => {
  const [photoBadge, setPhotoBadge] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (localStorage.getItem('photoUrl') !== 'undefined') {
      setPhotoBadge(
        `${process.env.REACT_APP_IMAGE_SERVER_URL}${localStorage.getItem(
          'photoUrl'
        )}`
      )
    } else {
      setPhotoBadge(userDefaultAvatar)
    }

    if (localStorage.getItem('fullName') !== 'undefined') {
      setFullName(localStorage.getItem('fullName'))
    } else {
      setFullName('')
    }

    if (localStorage.getItem('email') !== 'undefined') {
      setEmail(localStorage.getItem('email'))
    } else {
      setEmail('')
    }
  }, [])

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-soft-primary">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>HRMS Dashboard</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileBg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="12">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={photoBadge}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{fullName}</h5>
              <p className="text-muted mb-0 text-truncate">{email}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
