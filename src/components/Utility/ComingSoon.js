import React from 'react'
import maintanence from 'assets/images/coming-soon.svg'
import { Container, Row, Col } from 'reactstrap'

const ComingSoon = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col lg="12">
            <div className="text-center">
              <Row className="justify-content-center mt-5">
                <Col sm="4">
                  <div className="maintenance-img">
                    <img
                      src={maintanence}
                      alt=""
                      className="img-fluid mx-auto d-block"
                    />
                  </div>
                </Col>
              </Row>
              <h4 className="mt-2">Coming Soon</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default ComingSoon
