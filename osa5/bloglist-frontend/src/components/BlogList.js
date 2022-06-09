import Blog from "../components/Blog"
import blogService from "../services/blogs"

const BlogList = ({ blogs, user, setBlogs }) => {
  
  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id ))
    }
  }

  const blogList = blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => <Blog 
                        key={blog.id}
                        blog={blog} 
                        deleteBlog={deleteBlog}
                        user={user}
                      />)
                    
  return (
    <>
      {blogList}
    </>
  )
}

export default BlogList