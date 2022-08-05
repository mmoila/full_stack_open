import { useDispatch } from "react-redux"
import { useState } from "react"
import { login } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(login(username, password))
    setUsername("")
    setPassword("")
    navigate("/")
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
