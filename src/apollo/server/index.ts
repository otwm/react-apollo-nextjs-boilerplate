import { ApolloServer } from 'apollo-server-micro'
import schema from './schema'
import context from './context'
import dataSources from './dataSources'

const server = new ApolloServer({
  schema,
  context,
  dataSources,
})

export default server
