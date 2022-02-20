import { ApolloServer } from 'apollo-server-micro'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { join } from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import graphQLLetConfig from '../../../.graphql-let.yml'

const loadedFiles = loadFilesSync(join(process.cwd(), graphQLLetConfig.schema))
const typeDefs = mergeTypeDefs(loadedFiles)

const resolvers = {
  Query: {
    viewer() {
      return {
        id: 1,
        name: 'kdo',
        status: 'ok'
      }
    }
  }
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({ schema })
const startServer = server.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'access-control-allow-methods',
    'POST'
  )
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api:  {
    bodyParser:  false
  }
}


