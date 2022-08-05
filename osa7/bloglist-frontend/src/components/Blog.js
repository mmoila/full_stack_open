import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addLike, removeBlog, addComment } from "../reducers/blogReducer"

const Blog = ({ user, like, blogs }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    width: "fit-content",
    padding: "2px 10px 2px 5px",
    marginTop: 5,
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState("")
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const deleteBlog = (blog) => {
    const confirm = window.confirm(`remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      dispatch(removeBlog(blog))
      navigate("/")
    }
  }

  const newLike = async () => {
    dispatch(addLike(blog))
  }

  const showDeleteButton = () => {
    return <button onClick={() => deleteBlog(blog)}>delete</button>
  }

  const newComment = (event) => {
    event.preventDefault()
    dispatch(addComment(comment, blog.id))
    setComment("")
  }

  if (!user || !blog) {
    return null
  }

  return (
    <div id="blogDetails" style={blogStyle}>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p id="likes">
        likes {blog.likes}
        <span style={{ paddingLeft: 5 }}>
          <button id="likeButton" onClick={like ? like : newLike}>
            like
          </button>
        </span>
      </p>
      <p>{blog.author}</p>
      {user.username === blog.user.username && showDeleteButton()}
      <h3>comments</h3>
      <form onSubmit={newComment}>
        <input
          type="text" 
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      
      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      
    </div>
  )
}

export default Blog
