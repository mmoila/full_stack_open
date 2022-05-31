const User = require("../models/user")
const jwt = require("jsonwebtoken")

const errorHandler = (error, req, res, next) => {
  console.log(error.name)

  if (error.name === "ValidationError") {
    return res.status(400).send({error: error.message})
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" })
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  let token = null
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7)
  } 
  req.token = token
 
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "invalid or missing token" })
  }
  
  req.user = await User.findById(decodedToken.id)
  
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }