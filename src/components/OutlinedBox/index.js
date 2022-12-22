import React from "react"
import PropTypes from "prop-types"

// style
import "styles/custom_gscwd/components/outlinedbox.scss"

const OutlinedBox = props => {
  const { label, value } = props
  return (
    <>
      <div className="outlined-box">
        <label>{label}</label>
        <div className="value-wrapper">
          <div className="value-base">{value}</div>

          <fieldset className="value-outline">
            <legend className="fw-medium">
              <span>{label}</span>
            </legend>
          </fieldset>
        </div>
      </div>
    </>
  )
}

OutlinedBox.defaultProps = {
  value: "NA",
}

OutlinedBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
}

export default OutlinedBox
