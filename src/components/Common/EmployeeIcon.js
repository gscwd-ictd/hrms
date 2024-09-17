import React from 'react'
import PropTypes from 'prop-types'

const EmployeeIcon = props => {
  const { avatarUrl, name, width, height } = props

  const nameIcon = name.charAt(0)

  return (
    <>
      {avatarUrl ? (
        <img
          src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${avatarUrl}`}
          alt={name}
          className="img-thumbnail rounded-circle"
          width={width}
          height={height}
        />
      ) : (
        <div
          className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center fs-4 fw-bolder"
          style={{
            width: width,
            height: height,
          }}
        >
          {nameIcon}
        </div>
      )}
    </>
  )
}

EmployeeIcon.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default EmployeeIcon
