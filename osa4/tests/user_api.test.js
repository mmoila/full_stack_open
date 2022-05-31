const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const User = require("../models/user")
const listHelper = require("../utils/list_helper")
const userHelper = require("../utils/user_test_helper")
const bcrypt = require("bcrypt")
const { contentType } = require("express/lib/response")

const api = supertest(app)


describe("when there is one user in the database", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("salasana", 10)
    const user = new User({username: "RocketMan", passwordHash})

    await user.save()
  })

  test("creation fails with existing username", async () => {

    const newUser = {
      username: "RocketMan",
      name: "Rocket Man",
      password: "toTheMoon"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(403)
      .expect("Content-Type", /application\/json/)
  })

  test("creation with unique username succeeds", async () => {
    const usersAtStart = await userHelper.userCountInDatabase()

    const newUser = {
      username: "validUser",
      name: "Mr Valid",
      password: "test123"
    }
   
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await userHelper.userCountInDatabase()
    expect(usersAtEnd).toEqual(usersAtStart + 1)
  })
})

test("user creation with invalid username fails", async () => {
  const user = {
    username: "us",
    name: "too short",
    password: "valid"
  }

  const result = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/)
    
  expect(result.body.error).toContain("Username must be at least 3 characters long")

})

test("user creation with invalid password fails", async () => {
  const user = {
    username: "valid_user",
    name: "valid user",
    password: "va"
  }

  const result = await api
    .post("/api/users")
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/)
    
  expect(result.body.error).toContain("invalid password")

})