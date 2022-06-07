import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"


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

const BlogList = ({ blogs, username }) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

  const createNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    }
    const updatedBlog = await blogService.addNew(blog)
    setBlogs(blogs.concat(updatedBlog))
    setNotification(`blog ${blogTitle} by ${blogAuthor} added`)
    setTimeout(() => {setNotification(null)}, 5000)
    setBlogTitle("")
    setBlogAuthor("")
    setBlogUrl("")
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input 
            type="text" 
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />

        </div>
        <div>
          author:
          <input
           type="text"
           value={blogAuthor}
           onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
            type="text"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Notification = ({ message, error }) => {
  const notificationStyle = {
    marginBottom: 20, 
    padding: 10,
    fontSize: 26,
    font: "italic", 
    color: error ? "red": "green",
    backgroundColor: "lightgrey",
    border: "solid",
    borderColor: error ? "red": "green"
  }

  if (!message) {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)
  
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
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
      />
      <BlogList blogs={blogs} username={user.name} />
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
