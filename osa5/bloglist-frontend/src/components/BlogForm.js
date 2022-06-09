import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
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
    blogFormRef.current.toggleVisibility()

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

export default BlogForm