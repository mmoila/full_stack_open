import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    newBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const blog = state.find((blog) => blog.id === action.payload.id)
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      return state.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog))
    },
    comment(state, action) {
      const blog = state.find(blog => blog.id === action.payload.id)
      blog.comments.push(action.payload.comment)
    }
  },
})

export const { setBlogs, newBlog, like, comment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.addNew(content)
    console.log(blog)
    dispatch(newBlog(blog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch, getState) => {
    await blogService.remove(blog.id)
    const state = getState()
    dispatch(setBlogs(state.blogs.filter((b) => b.id !== blog.id)))
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.updateBlog(updatedBlog, blog.id)
    dispatch(like(blog))
  }
}

export const addComment = (content, id) => {
  return async dispatch => {
    await blogService.addComment(content, id)
    dispatch(comment({comment: content, id: id}))
  }
}

export default blogSlice.reducer
