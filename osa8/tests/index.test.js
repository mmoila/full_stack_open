const mongoose = require("mongoose")
const startServer = require("../server")
const request = require("supertest")
const config = require("../utils/config")
const {initTestDatabase} = require("../utils/initDatabase")

const url = "http://localhost:4001"
startServer(4001)
let token = ""

const loginData = {
  query: `mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }`,
  variables: {username: "mikael", password: "secret"}
}

const newBook = {
  query: `mutation AddBook(
      $title: String!, 
      $author: String!, 
      $published: Int!, 
      $genres: [String]!
    ) {
    addBook(
      title: $title, 
      author: $author, 
      published: $published, 
      genres: $genres
    ) {
      title
      author {
        name
      }
    }
  }
  `,
  variables: { 
    title: "testbook", 
    author: "tolkien", 
    published: 1932, 
    genres: ["horror"] 
  }
}



beforeAll(async () => {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI)
    console.log("connected to mongodb")
  } catch (error) {
    console.log(error)
  }
  await initTestDatabase()
})

beforeEach(async () => {
  const response = await request(url)
    .post("/")
    .send(loginData)

  token = `bearer ${response.body.data.login.value}`
})

test("adding a new book", async () => {
  const response = await request(url)
    .post("/")
    .set("Authorization", token)
    .send(newBook)

  console.log(response.body)
  expect(response.body.data.addBook).not.toBe(null)
})

afterAll(async () => {
  await mongoose.connection.close()
})