const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const blogsRouter = require("./controllers/blogs")
const blogSchema = require("./models/blog")
const middleware = require("./utils/middleware")



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use(middleware.errorHandler)


module.exports = app