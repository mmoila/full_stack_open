import { useState } from "react"

const BlogForm = ({ createNewBlog }) => {
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
      comments: []
    }

    await createNewBlog(blog)
    setBlogTitle("")
    setBlogAuthor("")
    setBlogUrl("")
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button id="newBlogButton" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
