const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const MONGODB_URI = 'mongodb+srv://phonebook_usr:Ph0n3b00k@cluster0.d4oax.mongodb.net/phonebook?retryWrites=true&w=majority'

console.log('connecting to MongoDB...')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const JWT_SECRET = 'jwtsecret'

const pubsub = new PubSub()

// begin
const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })

        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } }
          ]
        }).populate('author')

        return books
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
          $and: [
            { author: { $in: author._id } }
          ]
        }).populate('author')

        return books
      }

      if (args.genre) {
        const books = await Book.find({
          $and: [
            { genres: { $in: args.genre } }
          ]
        }).populate('author')

        return books
      }

      const books = await Book.find({}).populate('author')
      return books
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const count = await Book.find({ author: author._id })
      return count.length
    }
  },
  Book: {
    author: async (root) => {
      const id = root.author
      return await Author.findById(id)
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        // eslint-disable-next-line no-undef
        // throw new AuthenticationError('not authenticated')
        console.log(currentUser)
      }

      try {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          const author = new Author({
            name: args.author
          })
          const savedAuthor = await author.save()

          const book = new Book({ ...args, author: savedAuthor._id })
          const savedBook = await book.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return savedBook
        }

        const book = new Book({ ...args, author: author._id })
        const savedBook = await book.save()
        return savedBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        // eslint-disable-next-line no-undef
        // throw new AuthenticationError('not authenticated')
        console.log(currentUser)
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) return null

        const updatedAuthor = await Author.findByIdAndUpdate(
          author._id, { born: args.setBornTo }, { new: true }
        )
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })
        if (!user || args.password !== 'secred') {
          throw new UserInputError('wrong credentials')
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
