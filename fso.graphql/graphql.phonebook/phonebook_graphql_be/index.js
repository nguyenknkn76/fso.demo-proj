const { ApolloServer} = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {v1:uuid} = require('uuid')
const {GraphQLError} = require ('graphql')
const jwt = require('jsonwebtoken')
//!config mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Person = require('./models/PersonModel')
const User = require('./models/UserModel')
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((err) =>{
    console.log('error to connecting to mongodb', err.message)
  })

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

// let persons = [
//   {
//     name: "Arto Hellas",
//     phone: "040-123543",
//     address: {
//       street: "Tapiolankatu 5 A",
//       city: "Espoo",
//     },   
//     id: "3d594650-3436-11e9-bc57-8b80ba54c431"
//   },
//   {
//     name: "Matti Luukkainen",
//     phone: "040-432342",
//     address: {
//       street: "Malminkaari 10 A",
//       city: "Helsinki",
//     },   
    
//     id: '3d599470-3436-11e9-bc57-8b80ba54c431'
//   },
//   {
//     name: "Venla Ruuska",
//     address: {
//       street: "Nallemäentie 22 C",
//       city: "Helsinki",
//     },   
    
//     id: '3d599471-3436-11e9-bc57-8b80ba54c431'
//   },
// ]

const typeDefs = `
  enum YesNo {
    YES
    NO
  }
  type User {
    username: String!,
    friends: [Person!]!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    
    editNumber(
      name: String!
      phone:String!
    ) : Person

    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(
      name: String!
    ):User
  }
`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {      
      if(!args.phone){
        return await Person.find({})  
      }
      return await Person.find({ phone: { $exists: args.phone === 'YES' } })
      // if (!args.phone) {
      //   return persons
      // }
      // const byPhone = (person) =>
      //   args.phone === 'YES' ? person.phone : !person.phone
      // return persons.filter(byPhone)
    },
    findPerson: async (root, args) =>
      await Person.findOne({name: args.name}),
      // persons.find(p => p.name === args.name),
    
    me: (root, args, context) => {
      // console.log(context)
      return context.currentUser
    }
  },
  
  Person: {
    address: (root) => {
      return { 
        street: root.street,
        city: root.city
      }
    }
  },
  // todo solve error
  // Mutation: {
  //   addPerson: (root, args) => {
  //     const person = { ...args, id: uuid() }
  //     persons = persons.concat(person)
  //     return person
  //   }    
  // },
  // todo err handling with GraphQLError
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions:{
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try{
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return person
      // return person.save()
      // if (persons.find(p => p.name === args.name)) {
      //   throw new GraphQLError('Name must be unique', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //       invalidArgs: args.name
      //     }
      //   })
      // }
      // const person = { ...args, id: uuid() }
      // persons = persons.concat(person)
      // return person
    },

    editNumber:  async (root, args, context) => {
      if (!context.currentUser){ 
        throw new GraphQLError('have to login before dosmt')
      }
      const person = await Person.findOne({name: args.name})
      person.phone = args.phone
      
      try{
        return person.save()
      } catch(error){
        throw new GraphQLError('EDIT PERSON: saving person failed',{
          extensions:{
            code: "code ling tinh",
            invalidArgs: args.phone,
            error
          }
        })
      }
      // const person= persons.find(p => p.name === args.name)
      // if(!person){
      //   return null
      // }
      // const updatedPerson = {...person, phone: args.phone}
      // persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      // return updatedPerson
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'wrong credentials BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addAsFriend: async(root, args, {currentUser}) => {
      const isFriend = (person) => {
        currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
      }
      if(!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: "BAD USER INPUT"
          }
        })
      }
      const person = await Person.findOne({name: args.name})
      if(!isFriend(person)){ 
        currentUser.friends = currentUser.friends.concat(person)
      }
      await currentUser.save()

      return currentUser
    }
    // 
  }

  
  
  // Person: {
  //   street: (root) => "Manhattan",
  //   city: (root) => "New York"
  // }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')

      // console.log(currentUser)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})