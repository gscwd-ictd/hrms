import { defineAbility } from "@casl/ability"
import { isEmpty } from "lodash"
import Cookies from "universal-cookie"

export default defineAbility(can => {
  const cookies = new Cookies()

  if (cookies.get("isSuperUser") === "true") {
    can("access", "all")
  } else {
    if (
      localStorage.getItem("userAccess") &&
      localStorage.getItem("userAccess") !== "undefined"
    ) {
      const userAccess = JSON.parse(localStorage.getItem("userAccess"))
      userAccess.map(permission => {
        can(permission.I, permission.this)
      })
    }
  }
})
