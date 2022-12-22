import Cookies from 'universal-cookie'

const cookies = new Cookies()

// console.log(cookies.get("accessToken"))
const accessToken = cookies.get("accessToken")

export default accessToken