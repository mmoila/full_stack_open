const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const Blog = require("../models/blog")
const listHelper = require("../utils/list_helper")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.blogs)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
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
    .send(blog)
  
  expect(response.body.likes).toEqual(0)

})

test("blog without title/url gives an error", async () => {

  const blog = {
    author: "Testi Testimies"
  }

  const response = await api  
    .post("/api/blogs")
    .send(blog)
    .expect(400)
})

afterAll(() => mongoose.connection.close())