const Author = require("../models/author")
const Book = require("../models/book")
const User = require("../models/user")

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
  },
  { 
    name: 'Sandi Metz', // birthyear not known
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
]

const initDatabase = async () => {
  let booksCollection = await Book.find({})
  let authorsCollection = await Author.find({})
  //console.log(booksCollection, authorsCollection)
  if (booksCollection.length === 0 && authorsCollection.length === 0) {
    await Author.insertMany(authors)
    authors = await Author.find({})
    books = books.map(b => {
      return {...b, author: (authors.find(a => a.name === b.author).id) }
    })
    Book.insertMany(books)
    const user = new User({ username: "mikael", favoriteGenre: "horror" })
    await user.save()
  }
}

const initTestDatabase = async () => {
  await Book.deleteMany({})
  await Author.deleteMany({})
  await User.deleteMany({})
  await Author.insertMany(authors)
    authors = await Author.find({})
    books = books.map(b => {
      return {...b, author: (authors.find(a => a.name === b.author).id) }
    })
    Book.insertMany(books)
    const user = new User({ username: "mikael", favoriteGenre: "horror" })
    await user.save()
}

module.exports = {initDatabase, initTestDatabase}