const {ApolloServer} = require ('@apollo/server')
const {startStandaloneServer} = require ('@apollo/server/standalone')
const {v1:uuid} = require('uuid')
const {GraphQLError} = require('graphql')

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
        author: String!
        id: ID!
        genres: [String!]!
    }
    type Query {
        dummy: Int,
        bookCount: Int!
        authorCount:Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author!]!
        allBooksOfAuthor(author: String!): [Book]
        allBooksByGenre(genre: String!): [Book]
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
    }
`


const resolvers =  {
    Author: {
        bookCount: (root) => books.filter(book => book.author === root.name).length,
        books: (root) => books.filter(book => book.author === root.name)
    },

    Query:{
        dummy: () => 0,
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => books.filter(book => {
            let isGenre = false
            if(args.author){
                if(book.author !== args.author) return null
            }
            if(args.genre){
                book.genres.forEach(genre => {
                    if(args.genre === genre) isGenre = true
                })
                if(isGenre === false) return null
            }
            return book
        }),
        allAuthors: () => authors,

        // allBooksOfAuthor: (root, args) => {
        //     return books.filter(b => b.author === args.author)
        // },
        // allBooksByGenre: (root, args) => {
        //     return books.filter(b => {
        //         let isGenre = false
        //         b.genres.forEach(genre => {
        //             if (genre === args.genre){
        //                 isGenre = true
        //             }
        //         })
        //         return isGenre ? b : null
        //     })
        // }
    },
    
    Mutation: {
        addBook: (root, args) => {
            const book = {...args, id: uuid()}
            //! case: author isn't saved in database
            const author = authors.find(author => author.name === book.author)
            if (!author){
                const newAuthor = {
                    name: book.author,
                    born: null,
                    bookCount: 1,
                    books: [book]
                }
                authors = authors.concat(newAuthor)
            }
            books = books.concat(book)
            return book
        },

        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)
            if (!author){
                return null
            }
            const updatedAuthor = {...author, born: args.setBornTo}
            authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
            return updatedAuthor
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,  
})

startStandaloneServer(server, {listen: {port:5000}, })
    .then(({url})=> {
        console.log(`Server ready at ${url}`)
    })