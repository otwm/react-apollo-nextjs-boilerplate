import { loadFilesSync } from '@graphql-tools/load-files'
import { join } from 'path'
import graphQLLetConfig from '../../../.graphql-let.yml'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

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

export default schema
