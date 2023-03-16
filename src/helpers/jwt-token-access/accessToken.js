import Cookies from "universal-cookie"

const cookies = new Cookies()

const accessToken = cookies.get("accessToken")

export default accessToken
