import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    
  }, [])

  const loginForm = () => {
    return (
      <LoginForm username={username} password={password}
      setPassword={setPassword}
      setUsername={setUsername}
      setUser={setUser}
      setNotification={setNotification}
      setError={setError}
      />
    )
  }

  const blogForm = () => {
    return (
      <>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
            blogFormRef={blogFormRef}
          />
        </Togglable>
        <BlogList blogs={blogs} user={user} setBlogs={setBlogs} />
      </>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification  message={notification} error={error}/>
      {user === null ?
        loginForm() :
        <div>
          <p>user {user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div> 
      }
      
    </div>
    
  )
}



export default App
