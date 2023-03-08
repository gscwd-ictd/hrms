import axios from "axios"
import React, { useState } from "react"

const TestLogin = () => {
  const [username, setUsername] = useState("ericsison14@gmail.com")
  const [password, setPassword] = useState("password")
  axios.defaults.withCredentials = true

  // const handleProtected = async () => {
  //   try {
  //     const res = await axios.get('https://hrisbackend:5000/plantilla');
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleSubmit = async () => {
    const data = { username, password }
    // console.log(data)

    try {
      const res = await axios.post(
        "http://192.168.99.124:4003/api/auth/login",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      // console.log(res)
    } catch (error) {
      console.log(error)
    }

    //console.log(res)
  }

  return (
    <>
      <div>
        <input type="text" defaultValue={username}></input>
        <input type="password" defaultValue={password}></input>
        <button onClick={handleSubmit}>Login</button>
        {/* <button onClick={handleProtected}>protected route</button> */}
      </div>
    </>
  )
}

export default TestLogin
