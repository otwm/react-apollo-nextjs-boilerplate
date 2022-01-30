import { ApolloServer } from 'apollo-server-micro'

const apolloServer = new ApolloServer({})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
