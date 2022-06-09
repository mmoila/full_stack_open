import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = props.username
    const password = props.password

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      props.setUser(user)
      blogService.setToken(user.token)
      props.setUsername("")
      props.setPassword("")
    } catch (error) {
      props.setError(true)
      props.setNotification("wrong username or password")
      setTimeout(() => {
        props.setNotification(null)
        props.setError(false)
    }, 5000)
    }
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={props.username}
              onChange={({ target }) => props.setUsername(target.value) }
            />
        </div>
        <div>
          password
            <input
              type="password"
              value={props.password}
              onChange={({ target }) => props.setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm