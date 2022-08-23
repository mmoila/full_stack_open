import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setNotification, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification({
        message: error.graphQLErrors[0].message,
        error: true
      })
      setTimeout(() => {
        setNotification({message: null, error: false})
      }, 5000);
    },
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("user-token", token)
      console.log(localStorage.getItem("user-token"))
      setUsername("")
      setPassword("")
      setPage("authors")
    }
  }, [result.data]) // eslint-disable-line

  if (!show || result.loading) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm