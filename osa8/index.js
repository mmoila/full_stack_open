const config = require("./utils/config")
const mongoose = require("mongoose")
const startServer = require("./server")

const {initDatabase} = require("./utils/initDatabase")

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb")
  })
  .catch((error) => {
    console.log("error connecting:", error.message)
  })

initDatabase()
startServer(4000)

/*
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})
*/

