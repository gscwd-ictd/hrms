import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"

import { Col, Card, CardBody } from "reactstrap"

const CardModule = props => {
  return (
    <React.Fragment>
      <Col md="3">
        <Link
          to={{ pathname: props.moduleUrl }}
          target="_parent"
          className="card-module-box"
        >
          <Card className="mt-4">
            <CardBody>{props.children}</CardBody>
          </Card>
        </Link>
      </Col>
    </React.Fragment>
  )
}

CardModule.propTypes = {
  moduleUrl: PropTypes.string,
  children: PropTypes.any,
}

export default CardModule
