import React, { useEffect, useState } from "react"
import withRouter from "components/Common/withRouter"
import PropTypes from "prop-types"

import {
  changeTopbarTheme,
  changeLayout,
  changeLayoutWidth,
} from "../../store/actions"
import { useSelector, useDispatch } from "react-redux"

import Header from "./Header"

const ModuleDashboardLayout = props => {
  const dispatch = useDispatch()

  const { topbarTheme, layoutWidth } = useSelector(state => ({
    topbarTheme: state.Layout.topbarTheme,
    layoutWidth: state.Layout.layoutWidth,
  }))

  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"))
  }, [dispatch])

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme))
    }
  }, [dispatch, topbarTheme])

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth))
    }
  }, [dispatch, layoutWidth])

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened)
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          theme={topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
        />
        <div className="main-content">{props.children}</div>
      </div>
    </React.Fragment>
  )
}

ModuleDashboardLayout.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  topbarTheme: PropTypes.any,
}

export default withRouter(ModuleDashboardLayout)
