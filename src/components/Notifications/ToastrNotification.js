import React, { useState, useEffect } from "react"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import PropTypes from "prop-types"

// import scss
import "styles/custom_gscwd/components/toastr.scss"

const ToastrNotification = props => {
  const { toastType, notifMessage, options } = props

  const [positionClass, setPositionClass] = useState("toast-top-right")
  const [timeOut, settimeOut] = useState(5000)
  const [extendedTimeOut, setextendedTimeOut] = useState(1000)
  const [closeButton, setCloseButton] = useState(true)
  const [newestOnTop, setNewestOnTop] = useState(true)
  const [showEasing, setshowEasing] = useState("swing")
  const [hideEasing, sethideEasing] = useState("linear")
  const [showMethod, setshowMethod] = useState("fadeIn")
  const [hideMethod, sethideMethod] = useState("fadeOut")
  const [showDuration, setshowDuration] = useState(300)
  const [hideDuration, sethideDuration] = useState(1000)
  const [title, setTitle] = useState("")

  useEffect(() => {
    toastr.options = {
      positionClass: positionClass,
      timeOut: timeOut,
      extendedTimeOut: extendedTimeOut,
      closeButton: closeButton,
      newestOnTop: newestOnTop,
      showEasing: showEasing,
      hideEasing: hideEasing,
      showMethod: showMethod,
      hideMethod: hideMethod,
      showDuration: showDuration,
      hideDuration: hideDuration,
    }

    // setTimeout(() => toastr.success(notifMessage, title), 300)

    //Toaster Types
    if (toastType === "info") {
      toastr.info(notifMessage, title, options)
    } else if (toastType === "warning") {
      toastr.warning(notifMessage, title)
    } else if (toastType === "error") {
      toastr.error(notifMessage, title)
    } else if (toastType === "success") {
      toastr.success(notifMessage, title)
    } else {
      toastr.clear()
    }
  }, [])

  return <></>
}

ToastrNotification.propTypes = {
  toastType: PropTypes.string,
  notifMessage: PropTypes.any,
  options: PropTypes.object,
  clear: PropTypes.bool,
}

export default ToastrNotification
