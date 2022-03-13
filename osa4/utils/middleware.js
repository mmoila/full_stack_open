const errorHandler = (error, req, res, next) => {
  console.log(error.name)

  if (error.name === "ValidationError") {
    return res.status(400).send({error: "missing fields"})
  }

  next(error)
}

module.exports = { errorHandler }