const {ApolloServer} = require ('@apollo/server')
const {startStandaloneServer} = require ('@apollo/server/standalone')
const {v1:uuid} = require('uuid')
const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
//todo connect with mongodb
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/AuthorModel')
const Book = require('./models/BookModel')
const User = require('./models/UserModel')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.log('error to connection to mongodb', err.name, err.message)
    })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    { 
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']   
    },
    {   
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },  
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = `
    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int
        books: [Book]
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
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
        dummy: Int,
        bookCount: Int!
        authorCount:Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author!]!
        allBooksOfAuthor(author: String!): [Book]
        allBooksByGenre(genre: String!): [Book]
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ) : Book
        editAuthor(
            name: String!,
            setBornTo: Int!
        ) : Author

        createUser(
            username: String!
            favoriteGenre: String!
        ) : User
        login (
            username: String!
            password: String!
        ) : Token
    }
`


const resolvers = {
    Author: {
        bookCount: async (root) => await Book.countDocuments({ author: root._id }),
        books: async (root) => await Book.find({ author: root._id })
    },
    Book: {
        author: async (root) => await Author.findById(root.author)
    },
    Query: {
        dummy: async () => 0,
        bookCount: async () => await Book.countDocuments(),
        authorCount: async () => await Author.countDocuments(),
        allBooks: async (root, args) => {
            let filter = {};
            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                filter.author = author ? author._id : null;
            }
            if (args.genre) {
                filter.genres = args.genre;
            }
            return await Book.find(filter).populate('author');
        },
        allAuthors: async () => await Author.find({}),
        me: async (root, args, context) =>  {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            try{
                let author = await Author.findOne({ name: args.author });
                if (!author) {
                    author = new Author({ name: args.author });
                    await author.save();
                }
                const book = new Book({ ...args, author: author._id, id: uuid() });
                await book.save();
                return book.populate('author');
            } catch(err) {
                throw new GraphQLError('saving book failed')
            }
            
        },
        editAuthor: async (root, args) => {
            try{
                const author = await Author.findOneAndUpdate(
                    { name: args.name },
                    { born: args.setBornTo },
                    { new: true }
                );
                return author;
            }catch(err){
                throw new GraphQLError('editing author failed')
            }
        },
        createUser: async (root, args) => {
            const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

            return user.save()
                .catch(err => {
                    throw new GraphQLError('saving user failed', {
                        extensions:{
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            err
                        }
                    })
                })
        },
        login : async (root, args) => {
            const user = await User.findOne({username: args.username})
            if(!user || args.password !== 'secret'){
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return {value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
};



const server = new ApolloServer({
    typeDefs,
    resolvers,  
})

startStandaloneServer(server, {
    listen: {port:5000}, 
    context:async ({req, res}) => {
        const auth = req ? req.headers.authorization : null
        // console.log(req.headers.authorization)
        if( auth && auth.startsWith("Bearer ")){
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)

            return {currentUser}
        }
    }
})
    .then(({url})=> {
        console.log(`Server ready at ${url}`)
    })