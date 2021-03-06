const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const { MONGODB } = require('./config.js')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs.js')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongo db connected...')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`server running at ${res.url}`)
  })
