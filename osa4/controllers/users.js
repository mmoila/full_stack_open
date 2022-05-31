const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")


usersRouter.post("/", async (req, res) => {
  const {username, name, password} = req.body

  if (password == undefined || password.length < 3) {
    return res.status(400).json({ error: "invalid password" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(403).json({ error: "username already exists" })
  }

  const user = new User({
    username,
    name, 
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get("/", async (req, res) => {
  users = await User.find({})
    .populate("blogs", {url: 1, title: 1, author: 1, id: 1})
  res.json(users)
})

module.exports = usersRouter