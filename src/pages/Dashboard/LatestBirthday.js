import React from 'react'
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import avatar1 from '../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../assets/images/users/avatar-3.jpg'

const LatestBirthday = () => {
  const employees = [
    {
      id: '1',
      name: 'Employee 1',
      birthday: 'January 01, 1999',
      picture: avatar1,
    },
    {
      id: '2',
      name: 'Employee 2',
      birthday: 'January 02, 1999',
      picture: avatar2,
    },
    {
      id: '3',
      name: 'Employee 3',
      birthday: 'January 03, 1999',
      picture: avatar3,
    },
    {
      id: '4',
      name: 'Employee 4',
      birthday: 'January 02, 1999',
      picture: avatar2,
    },
    {
      id: '5',
      name: 'Employee 5',
      birthday: 'January 03, 1999',
      picture: avatar3,
    },
  ]

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">
            {new Date().toLocaleString('default', { month: 'long' })} Birthday
            Celebrants{' '}
          </CardTitle>

          {employees.map((employee, key) => (
            <Row key={'_li_' + key} className="mb-1">
              <Col sm="2" className="my-auto">
                <div className="avatar-sm">
                  <img
                    src={employee.picture}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
              </Col>
              <Col sm="10" className="my-auto">
                <h5 className="font-size-12 mb-0">{employee.name}</h5>
                <p className="font-size-11 text-muted mb-0">
                  {employee.birthday}
                </p>
              </Col>
            </Row>
          ))}

          <div className="text-right mt-4">
            <Button
              to=""
              className="btn btn-info waves-effect waves-light btn-sm"
            >
              View More <i className="mdi mdi-arrow-right ml-1" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LatestBirthday
