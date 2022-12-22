import React from "react"
import "../../styles/custom_gscwd/components/loadingindicator.scss"

const LoadingIndicator = () => {
  return (
    <div className="wd-spinner-container">
      <div className="spinner-border text-primary m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <br></br>
      <p>Loading Data...</p>
    </div>
    // )
  )
}

export default LoadingIndicator
