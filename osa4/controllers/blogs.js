const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const userExtractor = require("../utils/middleware").userExtractor


blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {username: 1, name: 1, id: 1})

  response.json(blogs)
})

blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog ({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: "invalid token" })
  }
})

blogRouter.put("/:id", async(request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updated_blog = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true })
  response.json(updated_blog)
})


module.exports = blogRouter