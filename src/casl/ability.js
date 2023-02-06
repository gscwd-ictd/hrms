import { defineAbility } from "@casl/ability"
import { isEmpty } from "lodash"
import Cookies from "universal-cookie"

export default defineAbility(can => {
  const cookies = new Cookies()
  const userAccessArr = JSON.parse(localStorage.getItem("userAccess"))

  if (cookies.get("isSuperUser")) {
    can("access", "all")
  } else {
    if (!isEmpty(userAccessArr)) {
      userAccessArr.map(permission => {
        can(permission.I, permission.this)
      })
    }
  }
})
