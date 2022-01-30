import { ApolloServer } from 'apollo-server-micro'
import { config as getEnv } from 'dotenv'
import dataSources from './datasources'
import formatError from './utils/formatError'
import context from './context/index'
import schema from './schema'

getEnv()

const key = process.env.APOLLO_KEY
const graphVariant = process.env.APOLLO_GRAPH_VARIANT
const apollo = { key, graphVariant }
// const playground = process.env.NODE_ENV !== 'production'
const plugins = [
]

const apolloServer = new ApolloServer({
  schema,
  dataSources,
  apollo,
  context,
  formatError,
  // playground,
  plugins,
})

export default apolloServer
