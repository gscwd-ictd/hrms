import React from "react"
import { Modal } from "react-bootstrap"
import { Button, Row, Input, Table, Col } from "reactstrap"
import PropTypes from "prop-types"

const AssignPSBMember = props => {
  const { showPsb, handleCloseAdd } = props
  return (
    <>
      <Modal show={showPsb} onHide={handleCloseAdd} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>PSB Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <Input type="select">
                <option values="">Select...</option>
                <option values="1">Ash Ketchum</option>
                <option values="2">Brock Brocky</option>
              </Input>
            </Col>
            <Col md={1} className="ps-0">
              <Button className="btn btn-info">
                {" "}
                <i className="bx bx-user-plus"></i>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>PSB 1</td>
                      <td>
                        <Button type="button" className=" btn btn-danger">
                          <i className="bx bx-user-x"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mikasa Ackerman</td>
                      <td>PSB 2</td>
                      <td>
                        <Button type="button" className=" btn btn-danger">
                          <i className="bx bx-user-x"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Eren Jaeger</td>
                      <td>PSB 3</td>
                      <td>
                        <Button type="button" className=" btn btn-danger">
                          <i className="bx bx-user-x"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button color="danger" onClick={handleCloseView}>Cancel</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

AssignPSBMember.propTypes = {
  showPsb: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default AssignPSBMember
