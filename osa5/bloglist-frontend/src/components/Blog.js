import { useState } from "react"
import blogs from "../services/blogs"
import blogService from "../services/blogs"

const Blog = ({ blog, deleteBlog, user }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    width: "fit-content",
    padding: "2px 10px 2px 5px",
    marginTop: 5
  }

  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const addLike = async () => {
    
    const updatedBlog = {...blogs, likes: likes + 1}

    const response = await blogService.updateBlog(updatedBlog, blog.id)
    setLikes(response.likes)
  }

  const showDeleteButton = () => {
    return <button onClick={() => deleteBlog(blog)}>delete</button>
  }

  const showRest = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          likes {likes}
          <span style={{paddingLeft: 5}}>
            <button onClick={addLike}>like</button>
          </span>
        </p>
        <p>{blog.author}</p>
        {user.username === blog.user.username && showDeleteButton()}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <span style={{paddingLeft: 5}}>
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "hide": "view"}
          </button>
        </span>
      </p>
      {showDetails && showRest()}
    </div>
  )
}

export default Blog