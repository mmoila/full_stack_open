const Users = require("../models/user")

const userCountInDatabase = async () => {
  const users = await Users.find({})
  return users.map(blog => blog.toJSON()).length
}


module.exports = {
  userCountInDatabase
}