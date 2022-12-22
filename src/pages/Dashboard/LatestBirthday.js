import React from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import avatar1 from "../../assets/images/users/avatar-1.jpg"
import avatar2 from "../../assets/images/users/avatar-2.jpg"
import avatar3 from "../../assets/images/users/avatar-3.jpg"

const LatestBirthday = () => {
  const employees = [
    {
      id: "1",
      name: "Employee 1",
      position: "Position Title",
      picture: avatar1,
    },
    {
      id: "2",
      name: "Employee 2",
      position: "Position Title",
      picture: avatar2,
    },
    // {
    //   id: "3",
    //   name: "Employee 3",
    //   position: "Community Relations Officer B",
    //   picture : avatar3,
    // },
  ]

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Birthdays</CardTitle>

          {employees.map((employee, key) => (
            <Row key={"_li_" + key} className="mb-2">
              <Col sm="4" className="my-auto">
                <div className="avatar-md">
                  <img
                    src={employee.picture}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
              </Col>
              <Col sm="8" className="my-auto">
                <h5 className="font-size-15">{employee.name}</h5>
                <p className="text-muted mb-0">{employee.position}</p>
              </Col>
            </Row>
          ))}

          <div className="text-right mt-4">
            <Link
              to=""
              className="btn btn-info waves-effect waves-light btn-sm"
            >
              View More <i className="mdi mdi-arrow-right ml-1" />
            </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LatestBirthday
