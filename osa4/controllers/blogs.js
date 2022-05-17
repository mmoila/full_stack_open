const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)

  /*Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })*/
})

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
  
  /*blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })*/
})

blogRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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