import { useEffect, useRef } from "react"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import StyledMenuBar from "./components/styles/MenuBar.styled"
import UserList from "./components/UserList"
import User from "./components/User"
import Blog from "./components/Blog"
import { useDispatch, useSelector } from "react-redux"
import { addBlog, initializeBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import {
  setNotification,
  showNotification,
} from "./reducers/notificationReducer"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import { initializeUsers } from "./reducers/usersReducer"
import { GlobalFont } from "./components/styles/GlobalFont"
import StyledContainer from "./components/styles/Container.styled"


const App = ({ className }) => {
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(setNotification(null))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const notification = useSelector((state) => state.notification)
  const navigate = useNavigate()

  const createNewBlog = async (newBlog) => {
    const blog = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
    }
    blogFormRef.current.toggleVisibility()

    dispatch(addBlog(blog))
    dispatch(
      showNotification(`blog ${newBlog.title} by ${newBlog.author} added`, 5)
    )
  }

  const blogForm = () => {
    console.log("this is blogform")
    return (
      <>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createNewBlog={createNewBlog} />
        </Togglable>
        <BlogList blogs={blogs} user={user} />
      </>
    )
  }

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
    navigate("/login")
  }

  return (
    <div className={className}>
      <GlobalFont />
      <Notification message={notification.content} error={notification.error} />
      {user ? (
        <StyledMenuBar user={user} handleLogout={handleLogout} />
      ) : (
        <p>{console.log("no yet menubar")}</p>
      )}
      <StyledContainer>
        <Routes>
          <Route exact path="/" element={user ? blogForm() : <LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users/:id" element={<User users={users}/>}/>
          <Route
            path="/users"
            element={
              user ? <UserList users={users} /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/blogs/:id"
            element={<Blog user={user} blogs={blogs} />}
          />
        </Routes>
      </StyledContainer>
      
    </div>
  )
}

export default App
