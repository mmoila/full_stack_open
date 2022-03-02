const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const blogsRoutes = require("./controllers/blogs")
const blogSchema = require("./models/blog")


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRoutes)


module.exports = app