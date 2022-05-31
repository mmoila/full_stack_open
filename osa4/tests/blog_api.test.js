const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")
const listHelper = require("../utils/list_helper")

const api = supertest(app)

let token = ""

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("salasana", 10)
  const user = new User({
    username: "newguy",
    name: "nimi",
    passwordHash: passwordHash
  })
  const savedUser = await user.save()
  //console.log(savedUser)

  const blogs = await listHelper.addUserToBlogs(savedUser)
  //console.log(blogs)
  await Blog.insertMany(blogs)

  const response = await api
    .post("/api/login")
    .send({username: "newguy", password: "salasana"})
  token = "bearer " + response.body.token
  //console.log(token)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", token)
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("number of blogs is correct", async () => {
  const responseList = await api.get("/api/blogs")

  expect(responseList.body).toHaveLength(listHelper.blogs.length)
})

test("id field is named correctly", async () => {
  const blogs = (await api.get("/api/blogs")).body
  
  expect(blogs[0].id).toBeDefined()
})

test("new blog can be added", async () => {
  lengthBefore = listHelper.blogs.length

  const blog = {
    title: "test",
    author: "Test Testinen",
    url: "http://test.test.org",
    likes: 2
  }

  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(blog)

  const lengthAfter = await listHelper.blogsInDatabase()
  expect(lengthAfter).toHaveLength(lengthBefore + 1)

})

test("no likes equals zero", async () => {

  const blog = {
    title: "test2",
    author: "Testi Testimies",
    url: "http://test.test.com"
  }

  const response = await api 
    .post("/api/blogs")
    .set("Authorization", token)
    .send(blog)
  
  expect(response.body.likes).toEqual(0)

})

test("blog without title/url gives an error", async () => {

  const blog = {
    author: "Testi Testimies"
  }

  const response = await api  
    .post("/api/blogs")
    .set("Authorization", token)
    .send(blog)
    .expect(400)
})

test("blog can be deleted", async () => {
  const id = await listHelper.getFirstBlogId()
  blogsAtStart = await listHelper.blogsInDatabase()
  
  const response = await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", token)
    .expect(204)

  blogsAtEnd = await listHelper.blogsInDatabase()
  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length - 1
  )
})


test("blog likes can be modified", async () => {
  const blogsToModify = await api.get("/api/blogs")
  const id = blogsToModify.body[0].id
  const likes = blogsToModify.body[0].likes + 1

  const blog = {
    likes: likes
  }
  
  const response = await api
    .put(`/api/blogs/${id}`)
    .send(blog)
    .expect("Content-Type", /application\/json/)

  expect(response.body.likes).toEqual(likes)
})

afterAll(() => mongoose.connection.close())