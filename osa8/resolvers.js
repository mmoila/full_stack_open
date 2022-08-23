const { UserInputError, AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")
const config = require("./utils/config")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
 
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}
      if (args.author) {
        query.author = args.author
      }
      if (args.genre) {
        query.genres = args.genre
      }
      return await Book.find(query).populate("author")
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({author: root.id})
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let authorList = await Author.find({name: args.author})
      console.log(authorList)
      let authorID = null

      if (authorList.length === 0) {
        const author = new Author({name: args.author})
        try {
          const savedAuthor = await author.save()
          authorID = savedAuthor.id
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      } else {
        authorID = authorList[0].id
      }

      const book = new Book({...args, author: authorID})

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author")})

      return book.populate("author")
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        {name: args.name}, 
        {born: args.setBornTo},
        {new: true}
      )
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User(args)
      await user.save()
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== "secret") {
        throw new UserInputError("incorrect credentials")
      } 
      const userForToken = {
        username: user.username,
        id: user._id
      }
      
      return {value: jwt.sign(userForToken, config.SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
}

module.exports = resolvers