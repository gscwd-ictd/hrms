import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { BreadcrumbItem, Col, Row } from "reactstrap"

const Breadcrumb = props => {
  const { positionTitle, breadcrumbItem, title, titleUrl } = props

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          { positionTitle 
            ? <h4 className="mb-0 font-size-18">{positionTitle}</h4>
            : <h4 className="mb-0 font-size-18">{breadcrumbItem}</h4>
          }
          {/* <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4> */}
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                { titleUrl  ? (
                    <Link to={ { pathname: titleUrl }}>{title}</Link>
                  )
                  : titleUrl ? (
                    <Link to={ titleUrl }>{title}</Link> 
                  )
                  : <Link to="#">{title}</Link>
                }
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {breadcrumbItem}
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  positionTitle: PropTypes.string,
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  titleUrl: PropTypes.string,
  state: PropTypes.object,
}

export default Breadcrumb
