import { Link } from "react-router-dom"
import styled from "styled-components"


const BlogList = ({ blogs }) => {
  console.log("creating bloglist")

  const StyledLink = styled(Link)`
    display: block;
  `

  const blogList = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <StyledLink key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
    ))

  return <div id="blogList">{blogList}</div>
}

export default BlogList
